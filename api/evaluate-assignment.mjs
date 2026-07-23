import { triggerAssignmentWorkspaceAgent } from "./assignment-evaluation-core.mjs";

const MAX_BODY_BYTES = 24 * 1024;

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
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function validateCandidate(candidate) {
  if (!candidate || typeof candidate !== "object") {
    return "Candidate payload is required.";
  }
  const answer = String(candidate.assignmentAnswer || candidate.notes || "").trim();
  if (!answer) {
    return "Assignment answer is required.";
  }
  if (answer.length > 5000) {
    return "Assignment answer is too long for the demo endpoint.";
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, { error: "Use POST for assignment evaluation." });
    return;
  }

  try {
    const rawBody = req.body
      ? Buffer.isBuffer(req.body)
        ? req.body.toString("utf8")
        : typeof req.body === "string"
          ? req.body
          : JSON.stringify(req.body)
      : await readBody(req);
    const body = typeof req.body === "object" && req.body !== null && !Buffer.isBuffer(req.body)
      ? req.body
      : JSON.parse(rawBody || "{}");
    const validationError = validateCandidate(body.candidate);
    if (validationError) {
      sendJson(res, 400, { error: validationError });
      return;
    }

    const trigger = await triggerAssignmentWorkspaceAgent(body.candidate, {
      idempotencyKey: req.headers["idempotency-key"] || req.headers["x-client-request-id"]
    });
    sendJson(res, 202, { trigger });
  } catch (error) {
    const statusCode = Number(error.statusCode) || 500;
    sendJson(res, statusCode, {
      error: error.message || "Assignment evaluation failed."
    });
  }
}
