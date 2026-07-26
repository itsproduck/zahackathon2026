const commonRules = `
You are part of the AI Talent student portal.
Use only evidence present in the request. Never invent education, employment, skills,
course activity, rubric evidence, scores, or hiring outcomes.
Keep recommendations educational and reversible. Do not make hiring decisions.
When evidence is missing or conflicting, lower confidence and say what is missing.
Write every student-facing string in Vietnamese.
Return only the requested structured output.
`.trim();

const contracts = {
  "cv-review": {
    schemaName: "student_cv_review_v2",
    instructions: `${commonRules}

Role: CV Data Extraction Agent.
Extract the student's full name and neutrally summarize profile data from the attached CV, optional CV text,
onboarding answers, and explicit student corrections. Do not score, rank, evaluate
role fit, assess employability, recommend hiring actions, or identify skill gaps.
The student must be able to review and correct every extracted field. verified=true
means the value appears directly in a supplied source, not external verification.
For fullName, copy the name from the CV exactly when present. If the CV does not
contain a readable name, use the uploaded filename without file extensions or generic
tokens such as CV and Resume; never invent a person's name.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "schemaVersion", "fullName", "summary", "experiences", "skills", "education", "gaps",
        "confidence", "confidenceReason", "needsHumanReview"
      ],
      properties: {
        schemaVersion: { type: "string", enum: ["student.cv_review.v2"] },
        fullName: { type: "string", minLength: 1, maxLength: 160 },
        summary: { type: "string", minLength: 1, maxLength: 500 },
        experiences: {
          type: "array",
          maxItems: 8,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["title", "organization", "timeframe", "evidence", "sourceType", "verified"],
            properties: {
              title: { type: "string", minLength: 1, maxLength: 120 },
              organization: { type: "string", maxLength: 120 },
              timeframe: { type: "string", maxLength: 80 },
              evidence: { type: "string", minLength: 1, maxLength: 400 },
              sourceType: { type: "string", enum: ["cv", "onboarding", "student_correction", "inference"] },
              verified: { type: "boolean" }
            }
          }
        },
        skills: {
          type: "array",
          maxItems: 16,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "evidence", "sourceType", "verified"],
            properties: {
              name: { type: "string", minLength: 1, maxLength: 80 },
              evidence: { type: "string", minLength: 1, maxLength: 300 },
              sourceType: { type: "string", enum: ["cv", "onboarding", "student_correction", "inference"] },
              verified: { type: "boolean" }
            }
          }
        },
        education: {
          type: "array",
          maxItems: 6,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["institution", "field", "timeframe", "evidence", "sourceType", "verified"],
            properties: {
              institution: { type: "string", minLength: 1, maxLength: 160 },
              field: { type: "string", maxLength: 120 },
              timeframe: { type: "string", maxLength: 80 },
              evidence: { type: "string", minLength: 1, maxLength: 300 },
              sourceType: { type: "string", enum: ["cv", "onboarding", "student_correction", "inference"] },
              verified: { type: "boolean" }
            }
          }
        },
        gaps: { type: "array", maxItems: 10, items: { type: "string", minLength: 1, maxLength: 240 } },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        confidenceReason: { type: "string", minLength: 1, maxLength: 300 },
        needsHumanReview: { type: "boolean" }
      }
    }
  },
  "journey-designer": {
    schemaName: "student_journey_v2",
    instructions: `${commonRules}

Role: Journey Designer Agent.
Design a short learning journey from the verified profile, career target, available
course catalog, and readiness rules. Use only catalog course IDs. Explain why each
course is placed in the sequence. Do not promise employment.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "schemaVersion", "title", "target", "courses", "criteriaTotal", "pointsTotal",
        "rationale", "nextMilestone", "confidence", "confidenceReason", "needsHumanReview"
      ],
      properties: {
        schemaVersion: { type: "string", enum: ["student.journey.v2"] },
        title: { type: "string", minLength: 1, maxLength: 180 },
        target: { type: "string", minLength: 1, maxLength: 140 },
        courses: {
          type: "array",
          minItems: 1,
          maxItems: 12,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["id", "title", "order", "reason", "competencyTargets", "prerequisitesMet"],
            properties: {
              id: { type: "string", minLength: 1, maxLength: 80 },
              title: { type: "string", minLength: 1, maxLength: 160 },
              order: { type: "integer", minimum: 1 },
              reason: { type: "string", minLength: 1, maxLength: 360 },
              competencyTargets: {
                type: "array",
                maxItems: 8,
                items: { type: "string", minLength: 1, maxLength: 100 }
              },
              prerequisitesMet: { type: "boolean" }
            }
          }
        },
        criteriaTotal: { type: "integer", minimum: 0 },
        pointsTotal: { type: "integer", minimum: 0 },
        rationale: { type: "string", minLength: 1, maxLength: 600 },
        nextMilestone: { type: "string", minLength: 1, maxLength: 240 },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        confidenceReason: { type: "string", minLength: 1, maxLength: 300 },
        needsHumanReview: { type: "boolean" }
      }
    }
  },
  "assignment-evaluator": {
    schemaName: "student_assignment_evaluation_v2",
    instructions: `${commonRules}

Role: Assignment Evaluator Agent.
Score the answer only against the rubric supplied in the request. Cite short evidence
from the answer for every awarded criterion. A passing result requires the published
threshold. Low-confidence evaluations must request human review and must not award
points automatically.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "schemaVersion", "score", "maxScore", "passThreshold", "status", "rubricLevel",
        "summary", "evidenceHighlights", "structureResults", "strengths", "gaps",
        "confidence", "confidenceReason", "needsHumanReview"
      ],
      properties: {
        schemaVersion: { type: "string", enum: ["student.assignment_evaluation.v2"] },
        score: { type: "integer", minimum: 0 },
        maxScore: { type: "integer", minimum: 1 },
        passThreshold: { type: "integer", minimum: 1 },
        status: { type: "string", enum: ["pass", "not_pass", "human_review"] },
        rubricLevel: { type: "string", minLength: 1, maxLength: 360 },
        summary: { type: "string", minLength: 1, maxLength: 600 },
        evidenceHighlights: {
          type: "array",
          maxItems: 6,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["quote", "whyItMatters"],
            properties: {
              quote: { type: "string", minLength: 1, maxLength: 320 },
              whyItMatters: { type: "string", minLength: 1, maxLength: 320 }
            }
          }
        },
        structureResults: {
          type: "array",
          minItems: 1,
          maxItems: 10,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["section", "status", "evidence", "feedback"],
            properties: {
              section: { type: "string", minLength: 1, maxLength: 100 },
              status: { type: "string", enum: ["met", "partial", "missing"] },
              evidence: { type: "string", maxLength: 320 },
              feedback: { type: "string", minLength: 1, maxLength: 320 }
            }
          }
        },
        strengths: { type: "array", maxItems: 8, items: { type: "string", minLength: 1, maxLength: 240 } },
        gaps: { type: "array", maxItems: 8, items: { type: "string", minLength: 1, maxLength: 240 } },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        confidenceReason: { type: "string", minLength: 1, maxLength: 300 },
        needsHumanReview: { type: "boolean" }
      }
    }
  },
  "improvement-coach": {
    schemaName: "student_improvement_plan_v2",
    instructions: `${commonRules}

Role: Improvement Coach.
Turn assignment gaps into a small, encouraging, actionable retry plan. Every action
must connect to a supplied gap and use available learning resources. Do not change
the evaluator's score.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "schemaVersion", "headline", "gapSummary", "actions", "estimatedMinutes",
        "retryAdvice", "confidence", "confidenceReason", "needsHumanReview"
      ],
      properties: {
        schemaVersion: { type: "string", enum: ["student.improvement_plan.v2"] },
        headline: { type: "string", minLength: 1, maxLength: 180 },
        gapSummary: { type: "string", minLength: 1, maxLength: 420 },
        actions: {
          type: "array",
          maxItems: 4,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["actionId", "resourceId", "title", "reason", "minutes"],
            properties: {
              actionId: { type: "string", minLength: 1, maxLength: 100 },
              resourceId: { type: "string", minLength: 1, maxLength: 100 },
              title: { type: "string", minLength: 1, maxLength: 180 },
              reason: { type: "string", minLength: 1, maxLength: 320 },
              minutes: { type: "integer", minimum: 1, maximum: 180 }
            }
          }
        },
        estimatedMinutes: { type: "integer", minimum: 0, maximum: 720 },
        retryAdvice: { type: "string", minLength: 1, maxLength: 420 },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        confidenceReason: { type: "string", minLength: 1, maxLength: 300 },
        needsHumanReview: { type: "boolean" }
      }
    }
  },
  "next-action": {
    schemaName: "student_next_action_v2",
    instructions: `${commonRules}

Role: Next Action Recommender.
Recommend the single smallest useful next action that moves the student toward the
selected target. Rank supplied alternatives by prerequisite fit, expected readiness
gain, and effort. Never recommend a locked action.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "schemaVersion", "actionId", "title", "reason", "expectedGain",
        "estimatedMinutes", "alternatives", "confidence", "confidenceReason",
        "needsHumanReview"
      ],
      properties: {
        schemaVersion: { type: "string", enum: ["student.next_action.v2"] },
        actionId: { type: "string", maxLength: 100 },
        title: { type: "string", minLength: 1, maxLength: 180 },
        reason: { type: "string", minLength: 1, maxLength: 420 },
        expectedGain: { type: "string", minLength: 1, maxLength: 240 },
        estimatedMinutes: { type: "integer", minimum: 0, maximum: 720 },
        alternatives: {
          type: "array",
          maxItems: 3,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["actionId", "title", "reason", "estimatedMinutes"],
            properties: {
              actionId: { type: "string", minLength: 1, maxLength: 100 },
              title: { type: "string", minLength: 1, maxLength: 180 },
              reason: { type: "string", minLength: 1, maxLength: 320 },
              estimatedMinutes: { type: "integer", minimum: 0, maximum: 720 }
            }
          }
        },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        confidenceReason: { type: "string", minLength: 1, maxLength: 300 },
        needsHumanReview: { type: "boolean" }
      }
    }
  }
};

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasText(value, minimum = 1) {
  return typeof value === "string" && value.trim().length >= minimum;
}

function validateAgentInput(agent, payload = {}) {
  if (!isObject(payload)) return "Payload must be an object.";

  if (agent === "cv-review") {
    if (!["student", "working"].includes(payload.persona)) return "persona must be student or working.";
    if (!isObject(payload.onboarding)) return "onboarding context is required.";
    if (!hasText(payload.onboarding.currentGoal)) return "onboarding.currentGoal is required.";
    if (payload.cvFile !== undefined) {
      if (
        !isObject(payload.cvFile) ||
        !hasText(payload.cvFile.filename) ||
        !hasText(payload.cvFile.mimeType) ||
        !Number.isInteger(payload.cvFile.size) ||
        payload.cvFile.size < 1 ||
        payload.cvFile.size > 10 * 1024 * 1024 ||
        !hasText(payload.cvFile.data, 16)
      ) {
        return "cvFile must include filename, mimeType, size, and base64 data up to 10MB.";
      }
      if (!/\.(pdf|doc|docx)$/i.test(payload.cvFile.filename)) {
        return "cvFile must be PDF, DOC, or DOCX.";
      }
      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(payload.cvFile.data)) {
        return "cvFile.data must be base64 encoded.";
      }
    }
    return null;
  }

  if (agent === "journey-designer") {
    if (!hasText(payload.target)) return "target is required.";
    if (!Array.isArray(payload.courseCatalog) || payload.courseCatalog.length === 0) return "courseCatalog is required.";
    if (payload.courseCatalog.some((course) => !isObject(course) || !hasText(course.id) || !hasText(course.title))) {
      return "Every course must include id and title.";
    }
    if (!isObject(payload.readinessRules)) return "readinessRules are required.";
    return null;
  }

  if (agent === "assignment-evaluator") {
    if (!hasText(payload.answer, 20)) return "answer must contain at least 20 characters.";
    if (!hasText(payload.casePrompt)) return "casePrompt is required.";
    if (!Array.isArray(payload.rubricLevels) || payload.rubricLevels.length === 0) return "rubricLevels are required.";
    if (!Array.isArray(payload.requiredStructure) || payload.requiredStructure.length === 0) return "requiredStructure is required.";
    if (!Number.isInteger(payload.passThreshold)) return "passThreshold must be an integer.";
    return null;
  }

  if (agent === "improvement-coach") {
    if (!isObject(payload.evaluation)) return "evaluation is required.";
    if (!["not_pass", "human_review"].includes(payload.evaluation.status)) {
      return "Improvement coaching requires a not_pass or human_review evaluation.";
    }
    if (!Array.isArray(payload.evaluation.gaps) || payload.evaluation.gaps.length === 0) return "evaluation gaps are required.";
    if (!Array.isArray(payload.availableResources) || payload.availableResources.length === 0) return "availableResources are required.";
    return null;
  }

  if (agent === "next-action") {
    if (!hasText(payload.target)) return "target is required.";
    if (!Array.isArray(payload.availableActions) || payload.availableActions.length === 0) return "availableActions are required.";
    if (!payload.availableActions.some((action) => isObject(action) && action.locked === false)) {
      return "At least one unlocked action is required.";
    }
    return null;
  }

  return "Unknown student agent.";
}

function validateAgentOutput(agent, output, payload = {}) {
  if (!isObject(output)) return "Agent output must be an object.";

  if (agent === "cv-review") {
    if (!hasText(output.fullName)) return "CV review must include the student's fullName.";
    const evidenceItems = [...(output.experiences || []), ...(output.skills || []), ...(output.education || [])];
    const invalidInference = evidenceItems
      .some((item) => item?.sourceType === "inference" && item?.verified === true);
    if (invalidInference) return "Inferred profile evidence cannot be verified.";
    if (
      !hasText(payload.cvText) &&
      !hasText(payload.cvFile?.data) &&
      evidenceItems.some((item) => item?.sourceType === "cv")
    ) {
      return "CV evidence requires an attached CV or extracted CV text.";
    }
    if (!isObject(payload.corrections) && evidenceItems.some((item) => item?.sourceType === "student_correction")) {
      return "Student-correction evidence requires supplied corrections.";
    }
  }

  if (agent === "journey-designer") {
    const catalog = new Map((payload.courseCatalog || []).map((course) => [course.id, course.title]));
    const catalogDetails = new Map((payload.courseCatalog || []).map((course) => [course.id, course]));
    const ids = (output.courses || []).map((course) => course.id);
    if (new Set(ids).size !== ids.length) return "Journey contains duplicate course IDs.";
    if ((output.courses || []).some((course) => !catalog.has(course.id) || catalog.get(course.id) !== course.title)) {
      return "Journey contains a course outside the supplied catalog.";
    }
    const ordered = [...(output.courses || [])].sort((a, b) => a.order - b.order);
    if (ordered.some((course, index) => course.order !== index + 1)) return "Journey order must be contiguous and start at 1.";
    const completed = new Set();
    for (const course of ordered) {
      const prerequisites = catalogDetails.get(course.id)?.prerequisites || [];
      const prerequisitesMet = prerequisites.every((id) => completed.has(id));
      if (course.prerequisitesMet !== prerequisitesMet) return "Journey prerequisite status is inconsistent.";
      completed.add(course.id);
    }
    if (output.criteriaTotal !== payload.readinessRules?.criteriaTotal || output.pointsTotal !== payload.readinessRules?.pointsTotal) {
      return "Journey changed the supplied readiness totals.";
    }
  }

  if (agent === "assignment-evaluator") {
    const levels = payload.rubricLevels || [];
    const scores = levels.map((level) => level.score);
    const maxScore = Math.max(...scores);
    if (!scores.includes(output.score) || output.maxScore !== maxScore || output.passThreshold !== payload.passThreshold) {
      return "Assignment score is inconsistent with the supplied rubric.";
    }
    if (output.rubricLevel !== levels.find((level) => level.score === output.score)?.description) {
      return "Assignment rubric level does not match the selected score.";
    }
    if (output.status === "pass" && output.score < payload.passThreshold) return "Pass status is below the threshold.";
    if (output.status === "not_pass" && output.score >= payload.passThreshold) return "Not-pass status meets the threshold.";
    if (output.status === "human_review" && output.needsHumanReview !== true) return "Human review status must request review.";
    if ((output.evidenceHighlights || []).some((item) => !payload.answer.includes(item.quote))) {
      return "Assignment evidence must be quoted verbatim from the answer.";
    }
    const requiredLabels = (payload.requiredStructure || []).map((section) => section.label);
    const returnedLabels = (output.structureResults || []).map((section) => section.section);
    if (
      requiredLabels.length !== returnedLabels.length ||
      new Set(returnedLabels).size !== returnedLabels.length ||
      requiredLabels.some((label) => !returnedLabels.includes(label))
    ) {
      return "Assignment structure results must cover every required section exactly once.";
    }
    if ((output.structureResults || []).some((section) => section.evidence && !payload.answer.includes(section.evidence))) {
      return "Assignment structure evidence must be quoted verbatim from the answer.";
    }
  }

  if (agent === "improvement-coach") {
    const resources = new Map((payload.availableResources || []).map((resource) => [resource.resourceId, resource]));
    if ((output.actions || []).some((action) => {
      const resource = resources.get(action.resourceId);
      return !resource ||
        action.actionId !== resource.actionId ||
        action.title !== resource.title ||
        action.minutes !== resource.minutes;
    })) {
      return "Improvement plan referenced an unavailable resource.";
    }
    const minutes = (output.actions || []).reduce((total, action) => total + action.minutes, 0);
    if (minutes !== output.estimatedMinutes) return "Improvement plan time does not match its actions.";
  }

  if (agent === "next-action") {
    const actions = new Map((payload.availableActions || []).map((action) => [action.id, action]));
    const selected = actions.get(output.actionId);
    if (
      !selected ||
      selected.locked !== false ||
      selected.title !== output.title ||
      selected.estimatedMinutes !== output.estimatedMinutes ||
      selected.expectedGain !== output.expectedGain
    ) {
      return "Next action is not an unlocked supplied action.";
    }
    const alternativeIds = (output.alternatives || []).map((item) => item.actionId);
    if (new Set(alternativeIds).size !== alternativeIds.length || alternativeIds.includes(output.actionId)) {
      return "Next-action alternatives contain duplicates.";
    }
    if ((output.alternatives || []).some((item) => {
      const action = actions.get(item.actionId);
      return !action ||
        action.locked !== false ||
        action.title !== item.title ||
        action.estimatedMinutes !== item.estimatedMinutes;
    })) {
      return "Next-action alternatives contain an invalid action.";
    }
  }

  return null;
}

export { contracts, validateAgentInput, validateAgentOutput };
