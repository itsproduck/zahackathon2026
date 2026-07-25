const commonRules = `
You are part of the AI Talent student portal.
Use only evidence present in the request. Never invent education, employment, skills,
course activity, rubric evidence, scores, or hiring outcomes.
Keep recommendations educational and reversible. Do not make hiring decisions.
When evidence is missing or conflicting, lower confidence and say what is missing.
Return only the requested structured output.
`.trim();

const contracts = {
  "cv-review": {
    schemaName: "student_cv_review",
    instructions: `${commonRules}

Role: CV Review Agent.
Extract a student-controlled profile from the supplied CV metadata and onboarding
answers. Distinguish verified evidence from inference. The student must be able to
review and correct every extracted field.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["summary", "experiences", "skills", "education", "gaps", "confidence", "needsHumanReview"],
      properties: {
        summary: { type: "string" },
        experiences: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["title", "organization", "evidence"],
            properties: {
              title: { type: "string" },
              organization: { type: "string" },
              evidence: { type: "string" }
            }
          }
        },
        skills: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "evidence", "verified"],
            properties: {
              name: { type: "string" },
              evidence: { type: "string" },
              verified: { type: "boolean" }
            }
          }
        },
        education: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["institution", "field", "evidence"],
            properties: {
              institution: { type: "string" },
              field: { type: "string" },
              evidence: { type: "string" }
            }
          }
        },
        gaps: { type: "array", items: { type: "string" } },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        needsHumanReview: { type: "boolean" }
      }
    }
  },
  "journey-designer": {
    schemaName: "student_journey",
    instructions: `${commonRules}

Role: Journey Designer Agent.
Design a short learning journey from the verified profile, career target, available
course catalog, and readiness rules. Use only catalog course IDs. Explain why each
course is placed in the sequence. Do not promise employment.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["title", "target", "courses", "criteriaTotal", "pointsTotal", "rationale", "confidence", "needsHumanReview"],
      properties: {
        title: { type: "string" },
        target: { type: "string" },
        courses: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["id", "title", "order", "reason"],
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              order: { type: "integer" },
              reason: { type: "string" }
            }
          }
        },
        criteriaTotal: { type: "integer" },
        pointsTotal: { type: "integer" },
        rationale: { type: "string" },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        needsHumanReview: { type: "boolean" }
      }
    }
  },
  "assignment-evaluator": {
    schemaName: "student_assignment_evaluation",
    instructions: `${commonRules}

Role: Assignment Evaluator Agent.
Score the answer only against the rubric supplied in the request. Cite short evidence
from the answer for every awarded criterion. A passing result requires the published
threshold. Low-confidence evaluations must request human review and must not award
points automatically.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["score", "maxScore", "status", "summary", "criterionResults", "strengths", "gaps", "confidence", "needsHumanReview"],
      properties: {
        score: { type: "integer" },
        maxScore: { type: "integer" },
        status: { type: "string", enum: ["pass", "not_pass", "human_review"] },
        summary: { type: "string" },
        criterionResults: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["criterion", "met", "evidence", "feedback"],
            properties: {
              criterion: { type: "string" },
              met: { type: "boolean" },
              evidence: { type: "string" },
              feedback: { type: "string" }
            }
          }
        },
        strengths: { type: "array", items: { type: "string" } },
        gaps: { type: "array", items: { type: "string" } },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        needsHumanReview: { type: "boolean" }
      }
    }
  },
  "improvement-coach": {
    schemaName: "student_improvement_plan",
    instructions: `${commonRules}

Role: Improvement Coach.
Turn assignment gaps into a small, encouraging, actionable retry plan. Every action
must connect to a supplied gap and use available learning resources. Do not change
the evaluator's score.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["headline", "actions", "estimatedMinutes", "retryAdvice"],
      properties: {
        headline: { type: "string" },
        actions: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["title", "reason", "minutes"],
            properties: {
              title: { type: "string" },
              reason: { type: "string" },
              minutes: { type: "integer" }
            }
          }
        },
        estimatedMinutes: { type: "integer" },
        retryAdvice: { type: "string" }
      }
    }
  },
  "next-action": {
    schemaName: "student_next_action",
    instructions: `${commonRules}

Role: Next Action Recommender.
Recommend the single smallest useful next action that moves the student toward the
selected target. Rank supplied alternatives by prerequisite fit, expected readiness
gain, and effort. Never recommend a locked action.`,
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["actionId", "title", "reason", "expectedGain", "estimatedMinutes", "alternatives", "confidence"],
      properties: {
        actionId: { type: "string" },
        title: { type: "string" },
        reason: { type: "string" },
        expectedGain: { type: "string" },
        estimatedMinutes: { type: "integer" },
        alternatives: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["actionId", "title", "reason"],
            properties: {
              actionId: { type: "string" },
              title: { type: "string" },
              reason: { type: "string" }
            }
          }
        },
        confidence: { type: "string", enum: ["high", "medium", "low"] }
      }
    }
  }
};

const defaultCourses = [
  { id: "course-1", title: "Product Fundamentals", criteria: 3, points: 15 },
  { id: "course-2", title: "Structured & Critical Thinking", criteria: 3, points: 15 },
  { id: "course-3", title: "User & Data Sense", criteria: 3, points: 15 },
  { id: "course-4", title: "Ownership & Execution", criteria: 4, points: 20 }
];

function deterministicFallback(agent, payload = {}) {
  if (agent === "cv-review") {
    const isStudent = payload.persona !== "working";
    return {
      summary: isStudent
        ? "Hồ sơ sinh viên có tín hiệu ban đầu về nghiên cứu người dùng, phối hợp nhóm và giải quyết vấn đề."
        : "Hồ sơ có kinh nghiệm Business Analysis và phối hợp liên chức năng có thể chuyển đổi sang Product.",
      experiences: [{
        title: isStudent ? "Product Lead" : "Business Analyst",
        organization: isStudent ? "CLB Khởi nghiệp" : "ZaloPay",
        evidence: isStudent
          ? "Thông tin onboarding: nghiên cứu người dùng và điều phối nhóm 5 thành viên."
          : "Thông tin onboarding: phân tích yêu cầu và phối hợp Product, Design, Engineering."
      }],
      skills: ["Problem Solving", "Communication", "User Research", "Data Analysis"].map((name) => ({
        name,
        evidence: "Tín hiệu từ thông tin onboarding; cần sinh viên xác nhận.",
        verified: false
      })),
      education: [{
        institution: isStudent ? "Đại học Ngoại thương" : "",
        field: isStudent ? "Kinh doanh quốc tế" : "",
        evidence: isStudent ? "Thông tin do sinh viên nhập trong onboarding." : "Chưa có đủ dữ liệu học vấn."
      }],
      gaps: payload.cvUploaded ? ["Cần xác nhận nội dung trích xuất từ CV."] : ["Chưa có nội dung CV để đối chiếu."],
      confidence: payload.cvUploaded ? "medium" : "low",
      needsHumanReview: false
    };
  }

  if (agent === "journey-designer") {
    const courses = Array.isArray(payload.courseCatalog) && payload.courseCatalog.length
      ? payload.courseCatalog
      : defaultCourses;
    return {
      title: "Lộ trình 4 khóa học để đạt PMT Ready",
      target: payload.target || "Product Management Trainee",
      courses: courses.map((course, index) => ({
        id: course.id,
        title: course.title,
        order: index + 1,
        reason: index === 0
          ? "Thiết lập nền tảng chung trước khi làm bài đánh giá."
          : "Mở rộng năng lực theo thứ tự tiên quyết của chương trình."
      })),
      criteriaTotal: 13,
      pointsTotal: 65,
      rationale: "Bắt đầu từ nền tảng Product, sau đó phát triển tư duy, dữ liệu và năng lực thực thi.",
      confidence: "medium",
      needsHumanReview: false
    };
  }

  if (agent === "assignment-evaluator") {
    const answer = String(payload.answer || "");
    const lower = answer.toLocaleLowerCase("vi");
    const criteria = ["vấn đề", "lựa chọn", "đánh đổi", "đề xuất"];
    const metCount = criteria.filter((term) => lower.includes(term)).length;
    const score = answer.length >= 180 && metCount >= 3 ? 4 : 3;
    const status = score >= Number(payload.passThreshold || 4) ? "pass" : "not_pass";
    return {
      score,
      maxScore: 5,
      status,
      summary: status === "pass"
        ? "Bài làm có cấu trúc và cân nhắc đánh đổi đủ để đạt ngưỡng."
        : "Bài làm có nền tảng nhưng chưa làm rõ đánh đổi và phương án dự phòng.",
      criterionResults: criteria.map((criterion) => ({
        criterion,
        met: lower.includes(criterion),
        evidence: lower.includes(criterion) ? `Bài làm có đề cập “${criterion}”.` : "",
        feedback: lower.includes(criterion) ? "Đã thể hiện trong cấu trúc trả lời." : `Bổ sung phần ${criterion}.`
      })),
      strengths: ["Có nêu bối cảnh quyết định."],
      gaps: status === "pass" ? ["Có thể định lượng rủi ro rõ hơn."] : ["Thiếu phương án dự phòng.", "Đánh đổi chưa được định lượng."],
      confidence: "medium",
      needsHumanReview: false
    };
  }

  if (agent === "improvement-coach") {
    return {
      headline: "Tập trung làm rõ đánh đổi và phương án dự phòng",
      actions: [
        { title: "Đọc lại khung phân tích đánh đổi", reason: "Giúp định lượng lợi ích, chi phí và rủi ro.", minutes: 8 },
        { title: "Luyện một case ngắn", reason: "Thực hành nêu giả định và điều kiện đổi quyết định.", minutes: 10 },
        { title: "Làm lại case", reason: "Áp dụng cấu trúc bốn phần với phương án dự phòng.", minutes: 7 }
      ],
      estimatedMinutes: 25,
      retryAdvice: "Giữ cấu trúc hiện tại, bổ sung số liệu và nói rõ bạn sẽ làm gì nếu giả định chính không đúng."
    };
  }

  return {
    actionId: payload.result === "not_pass" ? "retry-logical-thinking" : "continue-system-thinking",
    title: payload.result === "not_pass" ? "Hoàn thành kế hoạch cải thiện và làm lại case" : "Tiếp tục: System Thinking",
    reason: payload.result === "not_pass"
      ? "Đây là bước ngắn nhất để đạt ngưỡng rubric hiện tại."
      : "Module tiếp theo đã mở và tiếp tục tăng năng lực Problem Solving.",
    expectedGain: payload.result === "not_pass" ? "Đủ điều kiện nhận điểm rubric khi đạt 4/5." : "Mở thêm một tiêu chí Problem Solving.",
    estimatedMinutes: payload.result === "not_pass" ? 25 : 30,
    alternatives: [],
    confidence: "high"
  };
}

export { contracts, defaultCourses, deterministicFallback };
