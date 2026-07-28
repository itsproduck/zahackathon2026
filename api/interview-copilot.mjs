import {
  INTERVIEW_SCORING_GUIDE,
  buildInterviewInput,
  calculateCategoryScores,
  calculateOverallScore,
  contracts,
  validateInterviewInput,
  validateInterviewOutput
} from "./interview-copilot-contracts.mjs";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const MAX_BODY_BYTES = 1024 * 1024;

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bytes = 0;
    req.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > MAX_BODY_BYTES) {
        const error = new Error("Interview transcript request is too large.");
        error.statusCode = 413;
        reject(error);
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function extractOutputText(responseBody) {
  if (typeof responseBody?.output_text === "string") return responseBody.output_text;
  for (const item of responseBody?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === "string") return content.text;
    }
  }
  return "";
}

async function runInterviewCopilot(action, payload) {
  const contract = contracts[action];
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error("OPENAI_API_KEY is not configured.");
    error.statusCode = 503;
    error.publicCode = "OPENAI_NOT_CONFIGURED";
    throw error;
  }

  const model = process.env.OPENAI_INTERVIEW_COPILOT_MODEL || "gpt-5.6";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 28000);
  let response;
  try {
    response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        store: false,
        reasoning: { effort: "low" },
        instructions: contract.instructions,
        input: buildInterviewInput(action, payload),
        text: {
          verbosity: "low",
          format: {
            type: "json_schema",
            name: contract.schemaName,
            strict: true,
            schema: contract.schema
          }
        }
      }),
      signal: controller.signal
    });
  } catch (error) {
    const wrapped = new Error(
      error?.name === "AbortError"
        ? "Interview Copilot timed out."
        : "Interview Copilot could not reach OpenAI."
    );
    wrapped.statusCode = 502;
    wrapped.publicCode = error?.name === "AbortError" ? "AGENT_TIMEOUT" : "OPENAI_UNAVAILABLE";
    throw wrapped;
  } finally {
    clearTimeout(timeout);
  }

  const responseBody = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(responseBody?.error?.message || "OpenAI request failed.");
    error.statusCode = response.status === 429 ? 429 : 502;
    error.publicCode = response.status === 429 ? "AGENT_RATE_LIMITED" : "OPENAI_REQUEST_FAILED";
    throw error;
  }

  const outputText = extractOutputText(responseBody);
  let output;
  try {
    output = JSON.parse(outputText);
  } catch {
    const error = new Error("Interview Copilot returned invalid JSON.");
    error.statusCode = 502;
    error.publicCode = "AGENT_INVALID_OUTPUT";
    throw error;
  }

  const outputError = validateInterviewOutput(action, output, payload);
  if (outputError) {
    const error = new Error(outputError);
    error.statusCode = 502;
    error.publicCode = "AGENT_INVALID_OUTPUT";
    throw error;
  }

  if (action === "finalize") {
    output.categoryScores = calculateCategoryScores(output.criteria);
    output.overallDraftScore = calculateOverallScore(output.criteria);
    output.rubricPoints = output.overallDraftScore;
  }

  return {
    action,
    source: "openai_responses_api",
    model,
    responseId: responseBody.id,
    generatedAt: new Date().toISOString(),
    rubric: INTERVIEW_SCORING_GUIDE,
    output
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, { error: "Use POST for Interview Copilot requests." });
    return;
  }

  try {
    const rawBody = await readBody(req);
    const body = JSON.parse(rawBody || "{}");
    const action = body?.action;
    const payload = body?.payload;
    const inputError = validateInterviewInput(action, payload);
    if (inputError) {
      sendJson(res, 400, {
        error: inputError,
        code: "INVALID_INTERVIEW_INPUT",
        action
      });
      return;
    }

    const result = await runInterviewCopilot(action, payload);
    sendJson(res, 200, result);
  } catch (error) {
    sendJson(res, Number(error.statusCode) || 500, {
      error: error.publicCode
        ? "Interview Copilot is unavailable. The local demo fallback can still be used."
        : (error.message || "Interview Copilot request failed."),
      code: error.publicCode || "INTERVIEW_COPILOT_FAILED"
    });
  }
}

export {
  extractOutputText,
  runInterviewCopilot
};
