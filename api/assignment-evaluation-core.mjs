const WORKSPACE_AGENT_TRIGGER_BASE = "https://api.chatgpt.com/v1/workspace_agents";
const DEFAULT_ASSIGNMENT_TRIGGER_ID = "agtch_6a61da53bdac819194ef01956125331e";

function getWorkspaceAgentConfig() {
  const endpoint = process.env.WORKSPACE_AGENT_ASSIGNMENT_ENDPOINT;
  const triggerId = process.env.WORKSPACE_AGENT_ASSIGNMENT_TRIGGER_ID || DEFAULT_ASSIGNMENT_TRIGGER_ID;
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

  const error = new Error("PM CV Evaluator Workspace Agent trigger is not configured.");
  error.statusCode = 503;
  throw error;
}

function buildAssignmentAgentInput(candidate) {
  return [
    "Run the PM CV Evaluator for this Produck HR Room application.",
    "",
    "The app needs the agent to evaluate the candidate's CV and application evidence using the attached ZA Competency 2026 Product Management pack.",
    "Use the PM CV Evaluator's configured Agent Studio instructions and treat this as an HR-readable CV screening action.",
    "Return exactly one JSON object with no Markdown fences or surrounding prose. The HR Room inserts these fields directly as a new candidate row and evidence package.",
    "Required JSON contract:",
    JSON.stringify({
      schemaVersion: "produck.candidate_assessment.v1",
      candidateId: "string",
      candidateName: "string",
      targetRole: "string",
      cvScore: 0,
      addOnScore: 0,
      overallScore: 0,
      readiness: "READY | BORDERLINE | NOT_MATCH | INSUFFICIENT_EVIDENCE",
      confidence: "HIGH | MEDIUM | LOW",
      stage: "AI reviewed",
      nextAction: "string",
      summary: "string",
      levelFit: "string",
      competencyHighlights: [{ competency: "string", score: 0, evidence: "string" }],
      risks: ["string"],
      missingEvidence: ["string"],
      interviewProbes: ["string"],
      evaluatedAt: "ISO-8601 timestamp"
    }, null, 2),
    "",
    "Scoring policy:",
    "- CV and application evidence are the core evaluation inputs.",
    "- Learning, exam, and certificate signals are optional add-ons only. Never reject, block, or mark a candidate incomplete solely because they lack them.",
    "- addOnScore is 0-10 and must use the supplied learningAddOn value without inventing extra points.",
    "- overallScore combines CV/application evidence with the add-on; explain low-confidence or missing CV evidence explicitly.",
    "",
    "Candidate package:",
    JSON.stringify({
      id: candidate.id,
      roleId: candidate.roleId,
      targetRole: candidate.targetRole || "Product role",
      name: candidate.name,
      school: candidate.school,
      source: candidate.source,
      completion: candidate.completion,
      quiz: candidate.quiz,
      engagement: candidate.engagement,
      motivation: candidate.motivation,
      certificateEarned: candidate.certificateEarned || false,
      learningAddOn: candidate.learningAddOn || { score: 0, maxScore: 10 },
      cvFileName: candidate.cvFileName || candidate.uploadedCvFileName || "",
      cvEvidence: candidate.cvEvidence || candidate.notes || "",
      cvCompetencyScores: candidate.cvCompetencyScores || [],
      cvRiskFlags: candidate.cvRiskFlags || [],
      assignmentAnswer: candidate.assignmentAnswer || candidate.notes || ""
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
  return `Workspace Agent trigger failed with ${status}.`;
}

async function triggerAssignmentWorkspaceAgent(candidate, options = {}) {
  const { endpoint, token } = getWorkspaceAgentConfig();
  const conversationKey = options.conversationKey || `produck-assignment-${candidate.id || "candidate"}`;
  const idempotencyKey = options.idempotencyKey || `produck-assignment-${candidate.id || "candidate"}-${Date.now()}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey
    },
    body: JSON.stringify({
      conversation_key: conversationKey,
      input: buildAssignmentAgentInput(candidate)
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
  buildAssignmentAgentInput,
  triggerAssignmentWorkspaceAgent
};
