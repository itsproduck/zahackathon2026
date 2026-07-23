const WORKSPACE_AGENT_TRIGGER_BASE = "https://api.chatgpt.com/v1/workspace_agents";

function getInterviewAgentConfig() {
  const endpoint = process.env.WORKSPACE_AGENT_INTERVIEW_ENDPOINT;
  const triggerId = process.env.WORKSPACE_AGENT_INTERVIEW_TRIGGER_ID;
  const token = process.env.WORKSPACE_AGENT_ACCESS_TOKEN;

  if (!token) {
    const error = new Error("WORKSPACE_AGENT_ACCESS_TOKEN is not configured.");
    error.statusCode = 503;
    throw error;
  }

  if (endpoint) {
    return { endpoint, token };
  }

  if (triggerId) {
    return {
      endpoint: `${WORKSPACE_AGENT_TRIGGER_BASE}/${triggerId}/trigger`,
      token
    };
  }

  const error = new Error("Interview Evidence Probe Agent trigger is not configured.");
  error.statusCode = 503;
  throw error;
}

function buildInterviewQuestionAgentInput(candidate) {
  return [
    "Prepare the interviewer question pack for this Produck candidate.",
    "Run only because the candidate accepted the interview invitation.",
    "The pack is for direct delivery to the assigned interviewer. It must not be displayed in HR Candidate Review.",
    "",
    "Return exactly one JSON object matching produck.interview_question_pack.v1 with no Markdown or surrounding prose.",
    "Build 4-6 non-duplicative questions from the supplied evidence gaps, risks, competency highlights, and interview probes.",
    "Each question must include a follow-up, strong-evidence indicators, warning signs, and a 1/3/5 score guide.",
    "Do not re-score the candidate or make a hiring decision.",
    "",
    "Accepted interview event:",
    JSON.stringify({
      eventType: "INTERVIEW_ACCEPTED",
      candidateId: candidate.id,
      candidateName: candidate.name,
      targetRole: candidate.targetRole,
      interviewDurationMinutes: 45,
      readiness: candidate.readiness,
      confidence: candidate.confidence,
      summary: candidate.summary,
      levelFit: candidate.levelFit,
      competencyHighlights: candidate.competencyHighlights || [],
      risks: candidate.risks || [],
      missingEvidence: candidate.missingEvidence || [],
      interviewProbes: candidate.interviewProbes || [],
      cvEvidence: candidate.cvEvidence || "",
      assignmentEvidence: candidate.assignmentEvidence || ""
    }, null, 2)
  ].join("\n");
}

function getErrorMessage(responseBody, status) {
  if (responseBody?.error?.message) {
    return responseBody.error.message;
  }
  if (responseBody?.message) {
    return responseBody.message;
  }
  return `Interview question agent trigger failed with ${status}.`;
}

async function triggerInterviewQuestionAgent(candidate, options = {}) {
  const { endpoint, token } = getInterviewAgentConfig();
  const conversationKey = options.conversationKey || `produck-interview-${candidate.id || "candidate"}`;
  const idempotencyKey = options.idempotencyKey || `produck-interview-${candidate.id || "candidate"}-${Date.now()}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey
    },
    body: JSON.stringify({
      conversation_key: conversationKey,
      input: buildInterviewQuestionAgentInput(candidate)
    })
  });

  if (response.status !== 202) {
    const responseBody = await response.json().catch(() => ({}));
    const error = new Error(getErrorMessage(responseBody, response.status));
    error.statusCode = response.status || 502;
    throw error;
  }

  return {
    source: "workspace_agent",
    status: "accepted",
    statusCode: response.status,
    endpoint,
    conversationKey,
    idempotencyKey,
    acceptedAt: new Date().toISOString()
  };
}

export {
  buildInterviewQuestionAgentInput,
  triggerInterviewQuestionAgent
};
