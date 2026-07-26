import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync(new URL("../student-portal.html", import.meta.url), "utf8");
const taHtml = fs.readFileSync(new URL("../ta-portal.html", import.meta.url), "utf8");
const iconography = fs.readFileSync(new URL("../iconography.css", import.meta.url), "utf8");
const vercelConfig = JSON.parse(fs.readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];
assert.ok(script, "student portal script should exist");
assert.match(html, /href="\.\/iconography\.css"/, "student portal must load the shared icon system");
assert.match(taHtml, /href="\.\/iconography\.css"/, "TA portal must load the shared icon system");
assert.match(html, /class="portal-role-switch" href="\/ta-portal"/, "student portal switch must use the deployed TA route");
assert.match(taHtml, /class="student-link" href="\/student-portal"/, "TA portal switch must use the deployed student route");
assert.ok(vercelConfig.rewrites.some(({source,destination})=>source==="/student-portal"&&destination==="/student-portal.html"), "Vercel must serve the student portal route");
assert.ok(vercelConfig.rewrites.some(({source,destination})=>source==="/ta-portal"&&destination==="/ta-portal.html"), "Vercel must serve the TA portal route");
assert.match(iconography, /--icon-glyph-md:/, "icon system must expose a glyph scale");
assert.match(iconography, /--icon-box-md:/, "icon system must expose a container scale");
assert.match(iconography, /\.ui-icon,[\s\S]*display: inline-grid;[\s\S]*place-items: center;/, "shared icon primitive must center every mapped icon");
assert.match(iconography, /\.sh-guide-icon/, "home journey icons must use the shared icon primitive");
assert.match(iconography, /\.nav-icon/, "TA navigation icons must use the shared icon primitive");
assert.match(html, /\.pmt-badge \.pmt-badge-icon\{[^}]*display:grid;place-items:center/, "verified badge icon must stay centered");
assert.match(html, /\.application-step \.application-step-dot\{[^}]*display:grid;place-items:center/, "interview status icon must stay centered");
assert.doesNotMatch(html, /\.pmt-badge span\{/, "broad badge span rules must not override the icon container");
assert.doesNotMatch(html, /\.application-step span\{/, "broad timeline span rules must not override the icon container");
assert.doesNotMatch(html, /\.sh-guide-copy span\{/, "guide copy must not broadly override its icon wrapper");
assert.match(html, /\.sh-guide-copy>span:not\(\.sh-guide-icon\)\{/, "guide typography must target descriptions only");
assert.doesNotMatch(html, /\.persona-card span\{/, "persona copy must not override persona icons");
assert.doesNotMatch(html, /\.persona-card span(?!:not\(\.persona-icon\))/, "all persona typography bindings must exclude icons");
assert.doesNotMatch(html, /\.module-tile span\{/, "module copy must not override module state icons");
assert.doesNotMatch(html, /\.track-step span\{/, "tracking copy must not override tracking icons");

const app = { innerHTML: "" };
const toast = { textContent: "", className: "toast" };
const caseAnswer = { value: "" };
const demoStorage = new Map();

globalThis.document = {
  querySelector(selector) {
    if (selector === "#app") return app;
    if (selector === "#toast") return toast;
    if (selector === "#caseAnswer") return caseAnswer;
    return null;
  }
};
globalThis.window = { scrollTo() {}, addEventListener() {} };
Object.defineProperty(globalThis, "navigator", { value: {}, configurable: true });
globalThis.location = { href: "http://localhost/student-portal.html" };
globalThis.localStorage = {
  getItem(key) {
    return demoStorage.has(key) ? demoStorage.get(key) : null;
  },
  setItem(key, value) {
    demoStorage.set(key, String(value));
  },
  removeItem(key) {
    demoStorage.delete(key);
  }
};

new Function(`${script}
globalThis.__studentPortalTest = {
  state,
  submitCase,
  runAnalysis,
  nextOnboarding,
  uploadCv,
  render,
  syncLearningProgress,
  openLearningCourse,
  courseStatus,
  competencyScores,
  topCompetencies,
  applyPmt,
  createCertificate,
  persistStudentState,
  stopToast: () => clearTimeout(notify.timer)
};`)();

const portal = globalThis.__studentPortalTest;
portal.state.view = "onboarding";
portal.state.onboardingIndex = 2;
await portal.uploadCv({
  files: [{
    name: "Linh Nguyen - Product CV.pdf",
    size: 512_000,
    type: "application/pdf",
    async arrayBuffer() {
      return new TextEncoder().encode("synthetic cv file bytes").buffer;
    }
  }],
  value: "selected"
});
assert.equal(portal.state.cvFileName, "Linh Nguyen - Product CV.pdf");
assert.match(app.innerHTML, /Linh Nguyen - Product CV\.pdf/);
assert.doesNotMatch(app.innerHTML, /CV_Linh_Nguyen\.pdf/);
assert.ok(portal.state.cvFileData, "uploaded CV bytes must be retained for extraction");

const cvExtraction = {
  schemaVersion: "student.cv_review.v2",
  fullName: "Trần Minh Anh",
  summary: "Minh Anh có kinh nghiệm nghiên cứu người dùng trong một dự án sản phẩm.",
  experiences: [{
    title: "Product Research Project",
    organization: "Student Project",
    timeframe: "2025",
    evidence: "Thực hiện phỏng vấn người dùng và tổng hợp insight.",
    sourceType: "cv",
    verified: true
  }],
  skills: [{
    name: "User Research",
    evidence: "Thực hiện phỏng vấn người dùng.",
    sourceType: "cv",
    verified: true
  }],
  education: [{
    institution: "Đại học Ngoại thương",
    field: "Kinh doanh quốc tế",
    timeframe: "2022–2026",
    evidence: "Thông tin học vấn trong CV.",
    sourceType: "cv",
    verified: true
  }],
  gaps: [],
  confidence: "high",
  confidenceReason: "CV có nội dung đọc được.",
  needsHumanReview: false
};
let extractionRequest;
let resolveExtraction;
globalThis.fetch = async (_url, options) => {
  extractionRequest = JSON.parse(options.body);
  return new Promise((resolve) => {
    resolveExtraction = () => resolve({
      ok: true,
      async json() {
        return { source: "openai_responses_api", output: cvExtraction };
      }
    });
  });
};
portal.state.onboardingIndex = 3;
portal.state.analysisProgress = 0;
portal.state.cvReview = null;
const extractionPending = portal.runAnalysis();
assert.match(app.innerHTML, /btn btn-primary" disabled/, "Continue must stay disabled while extraction runs");
resolveExtraction();
await extractionPending;
assert.equal(extractionRequest.payload.cvFile.filename, "Linh Nguyen - Product CV.pdf");
assert.ok(extractionRequest.payload.cvFile.data);
portal.state.onboardingIndex = 4;
portal.render();
assert.match(app.innerHTML, /Tóm tắt do AI trích xuất/);
assert.match(app.innerHTML, /Trần Minh Anh/);
assert.match(app.innerHTML, /Product Research Project/);
assert.match(app.innerHTML, /User Research/);
assert.doesNotMatch(app.innerHTML, /Độ tin cậy|Cần bạn kiểm tra|Thông tin cần bổ sung/);

let journeyApiCalled = false;
globalThis.fetch = async () => {
  journeyApiCalled = true;
  throw new Error("Journey Designer should not be called during demo onboarding.");
};
portal.state.view = "onboarding";
portal.state.persona = "student";
portal.state.onboardingIndex = 5;
portal.state.career = "Product Management Trainee";
portal.state.journey = null;
await portal.nextOnboarding();
assert.equal(journeyApiCalled, false, "demo onboarding must not call Journey Designer");
assert.equal(portal.state.onboardingIndex, 6);
assert.equal(portal.state.journey.courses.length, 4);
assert.deepEqual(
  portal.state.journey.courses.map((course) => course.id),
  ["course-1", "course-2", "course-3", "course-4"]
);
assert.match(app.innerHTML, /Lộ trình 4 khóa học Product/);

portal.state.persona = "working";
portal.state.onboardingIndex = 4;
portal.state.journey = null;
await portal.nextOnboarding();
assert.equal(portal.state.onboardingIndex, 5);
assert.equal(portal.state.journey.courses.length, 4, "working branch must use the same demo journey");

portal.state.coursesCompleted = 1;
portal.syncLearningProgress();
portal.state.activeCourse = 2;
portal.state.view = "course";
portal.render();

let assignmentApiCalled = false;
globalThis.fetch = async () => {
  assignmentApiCalled = true;
  throw new Error("Assignment demo must not call an AI Agent.");
};
const originalRandom = Math.random;
caseAnswer.value = "Tôi nêu vấn đề, so sánh hai lựa chọn, cân nhắc đánh đổi và đề xuất thử nghiệm nhỏ.";

Math.random = () => 0.1;
await portal.submitCase();
assert.equal(assignmentApiCalled, false, "local demo scorer must not call fetch");
assert.equal(portal.state.view, "result");
assert.equal(portal.state.result, "fail");
assert.equal(portal.state.assignmentEvaluation.score, 3);
assert.equal(portal.state.coursesCompleted, 1, "3-star result must not complete the course");
assert.equal(portal.state.points, 15, "3-star result must not award course points");
assert.equal(portal.courseStatus(3), "locked", "next course stays locked after 3 stars");
assert.equal(portal.competencyScores().find(({ name }) => name === "Product Thinking").percent, 80);
assert.equal(portal.competencyScores().find(({ name }) => name === "Problem Solving").percent, 60, "3 stars must equal 60% competency");
assert.deepEqual(portal.topCompetencies().map(({ name }) => name), ["Product Thinking", "Problem Solving"]);
assert.match(app.innerHTML, /3\/5★/);
assert.match(app.innerHTML, /Demo Review/);

portal.state.view = "course";
portal.render();
Math.random = () => 0.9;
await portal.submitCase();
assert.equal(portal.state.result, "pass");
assert.equal(portal.state.assignmentEvaluation.score, 4);
assert.equal(portal.state.coursesCompleted, 2);
assert.equal(portal.state.criteriaCompleted, 6);
assert.equal(portal.state.points, 30);
assert.equal(portal.courseStatus(3), "current", "4-star result unlocks Course 3");
assert.equal(portal.competencyScores().find(({ name }) => name === "Problem Solving").percent, 80, "4 stars must equal 80% competency");
assert.match(app.innerHTML, /Mở Course 3/);

portal.state.view = "learning";
portal.render();
assert.match(app.innerHTML, /Course 2 · Hoàn thành/);
assert.match(app.innerHTML, /Course 3 · Đang học/);
assert.match(app.innerHTML, /6\/13 tiêu chí/);
assert.match(app.innerHTML, /30\/65 điểm/);

portal.state.view = "home";
portal.render();
assert.match(app.innerHTML, /2\/4/);
assert.match(app.innerHTML, /6\/13/);
assert.match(app.innerHTML, /30\/65/);
assert.match(app.innerHTML, /Course 3/);

portal.state.view = "profile";
portal.render();
assert.match(app.innerHTML, />30<\/strong><span>điểm rubric/);
assert.match(app.innerHTML, />6\/13<\/strong><span>rubric xong/);

portal.openLearningCourse(3);
caseAnswer.value = "Tôi xác định chỉ số, phân tích dữ liệu, cân nhắc đánh đổi và đề xuất thử nghiệm có kiểm soát.";
Math.random = () => 0.9;
await portal.submitCase();
assert.equal(portal.state.coursesCompleted, 3);
assert.equal(portal.courseStatus(4), "current", "Course 3 pass unlocks Course 4");

portal.state.view = "learning";
portal.render();
assert.match(app.innerHTML, /Course 4 · Đang học/);

portal.openLearningCourse(4);
caseAnswer.value = "Tôi ưu tiên phạm vi, lập kế hoạch thực thi, quản lý rủi ro và thống nhất với stakeholder.";
Math.random = () => 0.9;
await portal.submitCase();
assert.equal(portal.state.coursesCompleted, 4);
assert.equal(portal.state.criteriaCompleted, 13);
assert.equal(portal.state.points, 65);
assert.equal(portal.state.nextAction.actionId, "view-pmt-ready");

portal.state.view = "home";
portal.render();
assert.match(app.innerHTML, /PMT Ready/);
assert.match(app.innerHTML, /style="--value:100"/);
assert.match(app.innerHTML, /PMT Ready — toàn bộ lộ trình đã hoàn thành/);
portal.state.view = "profile";
portal.state.profileTab = "overview";
portal.render();
assert.match(app.innerHTML, />100\/100<\/strong><span>readiness/);
assert.match(app.innerHTML, /Trần Minh Anh/);
assert.match(app.innerHTML, /style="--value:100"/, "Talent Profile ring must use the current readiness score");
assert.match(app.innerHTML, /Product Thinking/);
assert.match(app.innerHTML, /Problem Solving/);
assert.equal((app.innerHTML.match(/>80%<\/strong>/g) || []).length, 2, "Overview must render only the top two competency scores");

portal.state.profileTab = "competency";
portal.render();
assert.equal((app.innerHTML.match(/>80%<\/strong>/g) || []).length, 6, "all six competencies must reflect their 4-star course results");

portal.state.view = "ready";
portal.render();
assert.match(app.innerHTML, /Bạn đã đạt PMT Ready/);
assert.match(app.innerHTML, /Chào Anh/);
assert.match(app.innerHTML, /Trần Minh Anh/);
assert.match(app.innerHTML, /PMT-2026-0A47-TMA/);
assert.match(app.innerHTML, /Verified competencies/);
assert.match(app.innerHTML, /Chứng nhận PMT Ready/);
assert.match(app.innerHTML, /Cơ hội dành cho bạn/);
portal.createCertificate();
assert.equal(portal.state.certificate, true);
assert.match(app.innerHTML, /Đã tạo chứng nhận/);

portal.applyPmt();
assert.equal(portal.state.applicationStatus, "submitted");
assert.equal(portal.state.view, "home", "applying should move to the submitted Home state");
assert.match(app.innerHTML, /Đơn ứng tuyển của bạn đang được xử lý/);
assert.match(app.innerHTML, /Chào Anh/);
assert.match(app.innerHTML, /TA đã xem hồ sơ/);
assert.match(app.innerHTML, /Đang chờ lên lịch/);
assert.match(app.innerHTML, /Trong khi chờ, đây là vài gợi ý cho bạn/);
assert.match(app.innerHTML, /Luyện phỏng vấn cá nhân hoá/);

const persistedDemo = JSON.parse(demoStorage.get("ai-talent-student-demo-v1"));
assert.equal(persistedDemo.version, 1);
assert.equal(persistedDemo.state.view, "home");
assert.equal(persistedDemo.state.applicationStatus, "submitted");
assert.equal(persistedDemo.state.coursesCompleted, 4);
assert.equal(persistedDemo.state.cvReview.fullName, "Trần Minh Anh");
assert.equal(persistedDemo.state.cvFileData, "", "raw uploaded file bytes must not be written to localStorage");

new Function(`${script}
globalThis.__restoredStudentPortalTest = {
  state,
  stopToast: () => clearTimeout(notify.timer)
};`)();
const restoredPortal = globalThis.__restoredStudentPortalTest;
assert.equal(restoredPortal.state.view, "home", "returning from TA must restore the last student view");
assert.equal(restoredPortal.state.applicationStatus, "submitted");
assert.equal(restoredPortal.state.coursesCompleted, 4);
assert.equal(restoredPortal.state.cvReview.fullName, "Trần Minh Anh");
assert.match(app.innerHTML, /Đơn ứng tuyển của bạn đang được xử lý/, "restored session must skip login and onboarding");

Math.random = originalRandom;

portal.stopToast();
restoredPortal.stopToast();
delete globalThis.__studentPortalTest;
delete globalThis.__restoredStudentPortalTest;
console.log("Student portal demo learning-flow tests passed.");
