import assert from "node:assert/strict";

import {
  INTERVIEW_CRITERIA,
  calculateCategoryScores,
  calculateOverallScore,
  validateInterviewInput,
  validateInterviewOutput
} from "./interview-copilot-contracts.mjs";

const transcript = [
  { turnId: "turn-001", speaker: "interviewer", startedAt: 0, endedAt: 30, text: "Tell me about the product problem.", final: true },
  { turnId: "turn-002", speaker: "candidate", startedAt: 31, endedAt: 95, text: "I interviewed users, reframed activation, and tested guided setup.", final: true }
];

const payload = {
  sessionId: "session-mai-001",
  candidate: {
    id: "mai",
    name: "Mai Anh",
    targetRole: "Product Management Trainee",
    profileSummary: "Early-career candidate.",
    knownEvidenceGaps: ["Impact measurement"]
  },
  transcript,
  interviewerNotes: [{ noteId: "note-15", minute: 15, text: "Strong product curiosity; verify impact." }]
};

assert.equal(validateInterviewInput("checkpoint", payload), null);
assert.equal(validateInterviewInput("finalize", payload), null);

const coverage = INTERVIEW_CRITERIA.map((criterion, index) => ({
  criterionId: criterion.id,
  score: index === 0 ? 4 : null,
  summaryNote: index === 0 ? "Specific candidate example is present." : "No evidence yet.",
  evidenceTurnIds: index === 0 ? ["turn-002"] : [],
  confidence: index === 0 ? "medium" : "low"
}));
const checkpoint = {
  schemaVersion: "interview.checkpoint.v3",
  checkpointSummary: "The interview has one product-learning example.",
  coverage,
  followUps: [{
    id: "follow-up-1",
    criterionId: "data_driven",
    question: "How did you measure the outcome?",
    reason: "No data evidence is present.",
    priority: "high"
  }],
  pacingNote: "Use the next section for measurement evidence.",
  humanReviewRequired: true
};
assert.equal(validateInterviewOutput("checkpoint", checkpoint, payload), null);

const scoredWithoutEvidence = structuredClone(checkpoint);
scoredWithoutEvidence.coverage[1].score = 4;
assert.match(
  validateInterviewOutput("checkpoint", scoredWithoutEvidence, payload),
  /score without candidate evidence/
);

const halfPointCheckpoint = structuredClone(checkpoint);
halfPointCheckpoint.coverage[0].score = 3.5;
assert.equal(validateInterviewOutput("checkpoint", halfPointCheckpoint, payload), null);

const tooManyFollowUps = structuredClone(checkpoint);
tooManyFollowUps.followUps = Array.from({ length: 6 }, (_, index) => ({
  id: `follow-up-${index + 1}`,
  criterionId: "data_driven",
  question: `Clarifying question ${index + 1}?`,
  reason: "Evaluate the remaining evidence gap.",
  priority: "medium"
}));
assert.match(validateInterviewOutput("checkpoint", tooManyFollowUps, payload), /followUps are invalid/);

const criteria = INTERVIEW_CRITERIA.map((criterion, index) => ({
  criterionId: criterion.id,
  score: index === 0 ? 4 : null,
  confidence: index === 0 ? "medium" : "low",
  rationale: index === 0 ? "The candidate described a concrete learning decision." : "No evidence.",
  evidenceTurnIds: index === 0 ? ["turn-002"] : [],
  remainingGap: index === 0 ? "Validate repeatability." : "Ask for a behavioral example."
}));
const finalScorecard = {
  schemaVersion: "interview.scorecard.v3",
  interviewSummary: "One strong signal; other criteria remain untested.",
  criteria,
  strengths: ["Structured learning example."],
  concerns: ["Most criteria remain untested."],
  unansweredGaps: ["Measurement", "Delivery"],
  reviewNote: "Interviewer review is required.",
  humanReviewRequired: true
};
assert.equal(validateInterviewOutput("finalize", finalScorecard, payload), null);

const halfPointFinal = structuredClone(finalScorecard);
halfPointFinal.criteria[0].score = 4.5;
assert.equal(validateInterviewOutput("finalize", halfPointFinal, payload), null);

const maximumCriteria = INTERVIEW_CRITERIA.map((criterion) => ({ criterionId: criterion.id, score: 5 }));
assert.equal(calculateOverallScore(maximumCriteria), 100);
assert.deepEqual(
  calculateCategoryScores(maximumCriteria).map((category) => category.points),
  [30, 15, 35, 15, 5]
);
const bonusAverage = maximumCriteria.map((criterion) => (
  criterion.criterionId === "influence_people" ? { ...criterion, score: 3 } : criterion
));
assert.equal(calculateCategoryScores(bonusAverage).find((category) => category.categoryId === "bonus").points, 4);

const unknownCitation = structuredClone(finalScorecard);
unknownCitation.criteria[0].evidenceTurnIds = ["turn-999"];
assert.match(validateInterviewOutput("finalize", unknownCitation, payload), /unknown transcript turn/);

const unsupportedDecision = { ...finalScorecard, hireRecommendation: "hire" };
assert.match(validateInterviewOutput("finalize", unsupportedDecision, payload), /unsupported fields/);

const unsupportedCandidateAttribute = { ...payload, candidate: { ...payload.candidate, age: 22 } };
assert.match(validateInterviewInput("checkpoint", unsupportedCandidateAttribute), /unsupported fields/);

const interviewerOnlyEvidence = structuredClone(finalScorecard);
interviewerOnlyEvidence.criteria[0].evidenceTurnIds = ["turn-001"];
assert.match(validateInterviewOutput("finalize", interviewerOnlyEvidence, payload), /score without candidate evidence/);

const malformedNote = { ...payload, interviewerNotes: [{ noteId: "bad", minute: 99, text: "Outside interview." }] };
assert.match(validateInterviewInput("checkpoint", malformedNote), /invalid minute/);

console.log("Interview Copilot contract tests passed.");
