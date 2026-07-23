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
    "Run the PM CV Evaluator for this Produck HR Room candidate.",
    "",
    "The app needs the agent to evaluate the candidate's CV and application evidence using the attached ZA Competency 2026 Product Management pack.",
    "Use the PM CV Evaluator's configured Agent Studio instructions and treat this as an HR-readable CV screening action.",
    "Recommended output contract for your agent response:",
    "- score: 0-100",
    "- recommendation: Strong pass, Pass, Borderline, Do not pass, or Insufficient evidence",
    "- levelFit: strongest evidenced ZA PM level band and gaps to the next plausible level",
    "- pmSkillBreakdown: product execution, feature specification, delivery, quality, strategy, discovery, prioritization, analytics, stakeholder leadership, technical fluency, commercial judgment, communication",
    "- risks: CV risks, vague claims, contradictions, or weak evidence",
    "- missingEvidence: evidence gaps HR should request or review",
    "- interviewProbes: targeted questions tied to competency gaps",
    "- summary: short HR-readable explanation",
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
