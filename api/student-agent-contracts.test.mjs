import assert from "node:assert/strict";

import {
  validateAgentInput,
  validateAgentOutput
} from "./student-agent-contracts.mjs";
import { agentFromUrl, buildAgentInput } from "./student-agents.mjs";

assert.equal(agentFromUrl("/api/student-agents/cv-review"), "cv-review");
assert.equal(
  agentFromUrl("/api/student-agents?agent=cv-review"),
  "cv-review",
  "Vercel rewrite query must resolve the requested student agent"
);

const cvInput = {
  persona: "student",
  onboarding: { currentGoal: "Product Management Trainee" }
};
const cvOutput = {
  schemaVersion: "student.cv_review.v2",
  fullName: "Nguyễn Thị Linh",
  summary: "Hồ sơ hiện chỉ có thông tin tự khai từ onboarding.",
  experiences: [],
  skills: [],
  education: [{
    institution: "Đại học Ngoại thương",
    field: "Kinh doanh quốc tế",
    timeframe: "",
    evidence: "Thông tin do sinh viên nhập khi onboarding.",
    sourceType: "onboarding",
    verified: false
  }],
  gaps: ["Chưa có nội dung CV để xác minh."],
  confidence: "low",
  confidenceReason: "Chỉ có dữ liệu onboarding.",
  needsHumanReview: true
};

const journeyInput = {
  target: "Product Management Trainee",
  readinessRules: { criteriaTotal: 13, pointsTotal: 65 },
  courseCatalog: [
    { id: "course-1", title: "Product Fundamentals" },
    { id: "course-2", title: "Structured & Critical Thinking" }
  ]
};
const journeyOutput = {
  schemaVersion: "student.journey.v2",
  title: "Lộ trình nền tảng Product Management",
  target: "Product Management Trainee",
  courses: [{
    id: "course-1",
    title: "Product Fundamentals",
    order: 1,
    reason: "Xây dựng nền tảng trước khi học tư duy phản biện.",
    competencyTargets: ["Product Thinking"],
    prerequisitesMet: true
  }],
  criteriaTotal: 13,
  pointsTotal: 65,
  rationale: "Bắt đầu từ kiến thức nền tảng trong catalog.",
  nextMilestone: "Hoàn thành Course 1.",
  confidence: "medium",
  confidenceReason: "Catalog hợp lệ nhưng hồ sơ còn ít bằng chứng.",
  needsHumanReview: false
};

const evaluationInput = {
  casePrompt: "Một case Product cần được phân tích.",
  answer: "Vấn đề cần quyết định là phạm vi MVP. Tôi chọn thử nghiệm nhỏ và đo rủi ro trước khi mở rộng.",
  passThreshold: 4,
  rubricLevels: [
    { score: 3, description: "Có cấu trúc cơ bản." },
    { score: 4, description: "Lập luận chặt chẽ." },
    { score: 5, description: "Tự phản biện giả định." }
  ],
  requiredStructure: [{ id: "problem", label: "Vấn đề" }]
};
const evaluationOutput = {
  schemaVersion: "student.assignment_evaluation.v2",
  score: 4,
  maxScore: 5,
  passThreshold: 4,
  status: "pass",
  rubricLevel: "Lập luận chặt chẽ.",
  summary: "Bài làm đạt ngưỡng và có đề xuất rõ.",
  evidenceHighlights: [{
    quote: "Tôi chọn thử nghiệm nhỏ",
    whyItMatters: "Thể hiện lựa chọn có giới hạn."
  }],
  structureResults: [{
    section: "Vấn đề",
    status: "met",
    evidence: "Vấn đề cần quyết định là phạm vi MVP.",
    feedback: "Đã nêu rõ quyết định."
  }],
  strengths: ["Đề xuất rõ ràng."],
  gaps: ["Chưa định lượng chỉ số."],
  confidence: "high",
  confidenceReason: "Bài làm bám rubric.",
  needsHumanReview: false
};

const improvementInput = {
  evaluation: {
    ...evaluationOutput,
    score: 3,
    status: "not_pass",
    gaps: ["Chưa định lượng chỉ số."]
  },
  availableResources: [{
    actionId: "review-tradeoffs",
    resourceId: "lesson-tradeoffs",
    title: "Xem lại đánh đổi",
    minutes: 8
  }]
};
const improvementOutput = {
  schemaVersion: "student.improvement_plan.v2",
  headline: "Bổ sung cách định lượng đánh đổi",
  gapSummary: "Bài làm chưa nêu chỉ số để kiểm tra quyết định.",
  actions: [{
    actionId: "review-tradeoffs",
    resourceId: "lesson-tradeoffs",
    title: "Xem lại đánh đổi",
    reason: "Tập gắn chỉ số với giả định.",
    minutes: 8
  }],
  estimatedMinutes: 8,
  retryAdvice: "Nêu một chỉ số thành công và một điều kiện dừng.",
  confidence: "high",
  confidenceReason: "Kế hoạch bám đúng khoảng trống.",
  needsHumanReview: false
};

const nextInput = {
  target: "Product Management Trainee",
  availableActions: [
    {
      id: "review-tradeoffs",
      title: "Xem lại khung phân tích đánh đổi",
      locked: false,
      estimatedMinutes: 8,
      expectedGain: "Củng cố đánh đổi"
    }
  ]
};
const nextOutput = {
  schemaVersion: "student.next_action.v2",
  actionId: "review-tradeoffs",
  title: "Xem lại khung phân tích đánh đổi",
  reason: "Đây là bước nhỏ nhất đang mở khóa.",
  expectedGain: "Củng cố đánh đổi",
  estimatedMinutes: 8,
  alternatives: [],
  confidence: "high",
  confidenceReason: "Chỉ có một hành động đang mở khóa.",
  needsHumanReview: false
};

const cases = [
  ["cv-review", cvInput, cvOutput],
  ["journey-designer", journeyInput, journeyOutput],
  ["assignment-evaluator", evaluationInput, evaluationOutput],
  ["improvement-coach", improvementInput, improvementOutput],
  ["next-action", nextInput, nextOutput]
];

for (const [agent, input, output] of cases) {
  assert.equal(validateAgentInput(agent, input), null, `${agent} input should be valid`);
  assert.equal(validateAgentOutput(agent, output, input), null, `${agent} output should be valid`);
}

const cvFileInput = {
  ...cvInput,
  cvUploaded: true,
  cvFileName: "Linh Nguyen.pdf",
  cvFile: {
    filename: "Linh Nguyen.pdf",
    mimeType: "application/pdf",
    size: 24,
    data: Buffer.from("synthetic pdf bytes").toString("base64")
  }
};
assert.equal(validateAgentInput("cv-review", cvFileInput), null);
assert.equal(validateAgentOutput("cv-review", {
  ...cvOutput,
  experiences: [{
    title: "Product Research Project",
    organization: "Student Project",
    timeframe: "2025",
    evidence: "Trích xuất trực tiếp từ CV.",
    sourceType: "cv",
    verified: true
  }]
}, cvFileInput), null);
const fileInput = buildAgentInput("cv-review", cvFileInput);
assert.ok(Array.isArray(fileInput));
assert.equal(fileInput[0].content[1].type, "input_file");
assert.equal(fileInput[0].content[1].filename, "Linh Nguyen.pdf");
assert.equal(
  fileInput[0].content[1].file_data,
  `data:application/pdf;base64,${cvFileInput.cvFile.data}`
);
assert.equal(JSON.parse(fileInput[0].content[0].text).cvFile.attached, true);
assert.equal("data" in JSON.parse(fileInput[0].content[0].text).cvFile, false);

assert.match(
  validateAgentInput("assignment-evaluator", { ...evaluationInput, answer: "short" }),
  /20 characters/
);
assert.match(
  validateAgentOutput("assignment-evaluator", { ...evaluationOutput, status: "not_pass" }, evaluationInput),
  /meets the threshold/
);
assert.match(
  validateAgentOutput("journey-designer", { ...journeyOutput, pointsTotal: 99 }, journeyInput),
  /readiness totals/
);
assert.match(
  validateAgentOutput("next-action", { ...nextOutput, actionId: "locked" }, nextInput),
  /unlocked supplied action/
);

console.log("Student agent contract tests passed.");
