import crypto from "node:crypto";

import { contracts, validateAgentInput, validateAgentOutput } from "./student-agent-contracts.mjs";

const MAX_BODY_BYTES = 15 * 1024 * 1024;
const OPENAI_RESPONSES_ENDPOINT = "https://api.openai.com/v1/responses";
const AGENT_TIMEOUT_MS = 28_000;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Request body is too large."), { statusCode: 413 }));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function safeStudentIdentifier(value) {
  const source = String(value || "anonymous-student");
  return `student_${crypto.createHash("sha256").update(source).digest("hex").slice(0, 24)}`;
}

function extractOutputText(response) {
  if (typeof response?.output_text === "string") {
    return response.output_text;
  }
  return (response?.output || [])
    .filter((item) => item?.type === "message")
    .flatMap((item) => item.content || [])
    .filter((item) => item?.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("");
}

function buildAgentInput(agent, payload) {
  if (agent !== "cv-review" || !payload.cvFile?.data) {
    return JSON.stringify(payload);
  }

  const { data, ...fileMetadata } = payload.cvFile;
  const textPayload = {
    ...payload,
    cvFile: {
      ...fileMetadata,
      attached: true
    }
  };
  return [{
    role: "user",
    content: [
      {
        type: "input_text",
        text: JSON.stringify(textPayload)
      },
      {
        type: "input_file",
        filename: fileMetadata.filename,
        file_data: data.startsWith("data:")
          ? data
          : `data:${fileMetadata.mimeType};base64,${data}`
      }
    ]
  }];
}

async function runOpenAIStudentAgent(agent, payload) {
  const contract = contracts[agent];
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error("The AI Agent service is not configured.");
    error.statusCode = 503;
    error.publicCode = "AGENT_UNAVAILABLE";
    throw error;
  }

  const model = process.env.OPENAI_STUDENT_AGENT_MODEL || "gpt-5.6-terra";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AGENT_TIMEOUT_MS);
  let response;
  try {
    response = await fetch(OPENAI_RESPONSES_ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        store: false,
        safety_identifier: safeStudentIdentifier(payload.studentId || payload.email),
        reasoning: { effort: "low" },
        instructions: contract.instructions,
        input: buildAgentInput(agent, payload),
        text: {
          verbosity: "low",
          format: {
            type: "json_schema",
            name: contract.schemaName,
            strict: true,
            schema: contract.schema
          }
        }
      })
    });
  } catch (error) {
    const requestError = new Error(error.name === "AbortError"
      ? "The AI Agent request timed out."
      : "The AI Agent request could not be completed.");
    requestError.statusCode = 503;
    requestError.publicCode = "AGENT_UNAVAILABLE";
    throw requestError;
  } finally {
    clearTimeout(timeout);
  }

  const responseBody = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(responseBody?.error?.message || `OpenAI request failed with ${response.status}.`);
    error.statusCode = response.status || 502;
    error.publicCode = "AGENT_UNAVAILABLE";
    throw error;
  }

  const outputText = extractOutputText(responseBody);
  if (!outputText) {
    const error = new Error("The agent returned no structured output.");
    error.statusCode = 502;
    error.publicCode = "AGENT_INVALID_OUTPUT";
    throw error;
  }

  let output;
  try {
    output = JSON.parse(outputText);
  } catch {
    const error = new Error("The agent returned invalid JSON.");
    error.statusCode = 502;
    error.publicCode = "AGENT_INVALID_OUTPUT";
    throw error;
  }
  const outputError = validateAgentOutput(agent, output, payload);
  if (outputError) {
    const error = new Error(outputError);
    error.statusCode = 502;
    error.publicCode = "AGENT_INVALID_OUTPUT";
    throw error;
  }

  return {
    source: "openai_responses_api",
    model,
    responseId: responseBody.id,
    output
  };
}

function agentFromUrl(url = "") {
  const requestUrl = new URL(url, "http://localhost");
  const rewrittenAgent = requestUrl.searchParams.get("agent");
  if (rewrittenAgent) {
    return rewrittenAgent;
  }
  const pathname = requestUrl.pathname;
  return pathname.split("/").filter(Boolean).at(-1);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, { error: "Use POST for student agent requests." });
    return;
  }

  const agent = agentFromUrl(req.url);
  if (!contracts[agent]) {
    sendJson(res, 404, { error: "Unknown student agent." });
    return;
  }

  try {
    const rawBody = await readBody(req);
    const body = JSON.parse(rawBody || "{}");
    const payload = body?.payload;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      sendJson(res, 400, { error: "A payload object is required." });
      return;
    }
    const inputError = validateAgentInput(agent, payload);
    if (inputError) {
      sendJson(res, 400, { error: inputError, code: "INVALID_AGENT_INPUT", agent });
      return;
    }

    const result = await runOpenAIStudentAgent(agent, payload);
    sendJson(res, 200, { agent, ...result });
  } catch (error) {
    sendJson(res, Number(error.statusCode) || 500, {
      error: error.publicCode
        ? "AI Agent is not working. Please try again."
        : (error.message || "Student agent request failed."),
      code: error.publicCode || "AGENT_REQUEST_FAILED",
      agent
    });
  }
}

export {
  agentFromUrl,
  buildAgentInput,
  extractOutputText,
  runOpenAIStudentAgent,
  safeStudentIdentifier
};
