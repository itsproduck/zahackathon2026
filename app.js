const lessons = courseContent.modules;

const talentPoolSnapshot = {
  totalStudents: 30000,
  certificateEarned: 8600,
  activeLearners: 12400,
  updatedToday: 734
};

const activeHiringPositions = [
  {
    id: "pmt",
    title: "Product Management Trainee 2026",
    shortTitle: "PMT Program",
    type: "Trainee",
    applicants: 4000,
    targetHires: 60,
    screened: 3320,
    ready: 420,
    borderline: 1880,
    notMatch: 1020,
    humanReview: 260,
    interviewInvited: 300,
    interview: 80,
    offer: 12,
    slaHours: 48,
    studentDescription: "Best for students and fresh graduates proving readiness through learning, assignments, and potential.",
    motivationLabel: "Why Product Trainee?",
    motivationDefault: "I like turning messy customer problems into clear product decisions. I want to learn by joining a real trainee program.",
    assignmentLabel: "Mini assignment answer",
    assignmentDefault: "I would first find where new users drop in the journey, interview a few students who signed up but did not complete the first action, then test one onboarding improvement with a clear activation metric.",
    sourceMix: [
      { source: "Campus workshop", applicants: 1450, ready: 160, avgScore: 82 },
      { source: "Learning funnel", applicants: 1220, ready: 140, avgScore: 84 },
      { source: "Student community", applicants: 760, ready: 82, avgScore: 79 },
      { source: "Social campaign", applicants: 570, ready: 38, avgScore: 73 }
    ]
  },
  {
    id: "pm",
    title: "Product Manager",
    shortTitle: "Product Manager",
    type: "Full-time",
    applicants: 20,
    targetHires: 2,
    screened: 18,
    ready: 5,
    borderline: 8,
    notMatch: 5,
    humanReview: 3,
    interviewInvited: 4,
    interview: 3,
    offer: 1,
    slaHours: 72,
    studentDescription: "For experienced candidates ready to own product discovery, prioritization, and cross-functional delivery.",
    motivationLabel: "Why this Product Manager role?",
    motivationDefault: "I want to own product outcomes end to end, connect customer discovery with business priorities, and help a product squad make sharper roadmap decisions.",
    assignmentLabel: "Product strategy case answer",
    assignmentDefault: "I would define the target segment, identify the highest-friction journey, compare opportunities by impact and confidence, then run a focused experiment before scaling the roadmap change.",
    sourceMix: [
      { source: "Internal referral", applicants: 7, ready: 3, avgScore: 88 },
      { source: "LinkedIn campaign", applicants: 8, ready: 1, avgScore: 78 },
      { source: "Talent community", applicants: 5, ready: 1, avgScore: 81 }
    ]
  },
  {
    id: "apm",
    title: "Associate Product Manager",
    shortTitle: "APM",
    type: "Full-time",
    applicants: 180,
    targetHires: 8,
    screened: 136,
    ready: 32,
    borderline: 74,
    notMatch: 30,
    humanReview: 18,
    interviewInvited: 26,
    interview: 12,
    offer: 3,
    slaHours: 72,
    studentDescription: "For early-career candidates with some product exposure who can step into an associate PM path.",
    motivationLabel: "Why Associate Product Manager?",
    motivationDefault: "I have built product fundamentals through projects and want to grow into an APM role where I can support discovery, prioritization, and experiments with a senior PM.",
    assignmentLabel: "APM case answer",
    assignmentDefault: "I would clarify the user segment, write the problem statement, list two possible solutions, and recommend the one with the highest learning value and lowest delivery risk.",
    sourceMix: [
      { source: "Certificate wallet", applicants: 84, ready: 18, avgScore: 80 },
      { source: "Campus campaign", applicants: 56, ready: 9, avgScore: 76 },
      { source: "Referral", applicants: 40, ready: 5, avgScore: 79 }
    ]
  },
  {
    id: "growth-pm",
    title: "Growth Product Specialist",
    shortTitle: "Growth PM",
    type: "Specialist",
    applicants: 95,
    targetHires: 4,
    screened: 72,
    ready: 18,
    borderline: 37,
    notMatch: 17,
    humanReview: 9,
    interviewInvited: 14,
    interview: 6,
    offer: 1,
    slaHours: 72,
    studentDescription: "For candidates who can connect acquisition, activation, retention, and product experimentation.",
    motivationLabel: "Why Growth Product?",
    motivationDefault: "I enjoy using data and experiments to improve activation and retention, and I want to turn growth opportunities into product decisions.",
    assignmentLabel: "Growth experiment answer",
    assignmentDefault: "I would choose the activation metric, inspect the drop-off by segment, form a hypothesis, test one onboarding change, and compare conversion before and after the experiment.",
    sourceMix: [
      { source: "Product webinar", applicants: 38, ready: 8, avgScore: 81 },
      { source: "LinkedIn campaign", applicants: 32, ready: 6, avgScore: 77 },
      { source: "Talent community", applicants: 25, ready: 4, avgScore: 78 }
    ]
  },
  {
    id: "product-ops",
    title: "Product Operations Analyst",
    shortTitle: "Product Ops",
    type: "Operations",
    applicants: 65,
    targetHires: 3,
    screened: 58,
    ready: 11,
    borderline: 31,
    notMatch: 16,
    humanReview: 7,
    interviewInvited: 9,
    interview: 4,
    offer: 1,
    slaHours: 72,
    studentDescription: "For candidates who can improve product processes, dashboards, launch operations, and stakeholder routines.",
    motivationLabel: "Why Product Operations?",
    motivationDefault: "I want to help product teams work with better dashboards, clearer routines, and smoother launch operations.",
    assignmentLabel: "Product ops case answer",
    assignmentDefault: "I would map the workflow, identify the slowest handoff, create a simple dashboard for visibility, and set a weekly operating rhythm to keep stakeholders aligned.",
    sourceMix: [
      { source: "Course completion", applicants: 28, ready: 5, avgScore: 80 },
      { source: "Operations community", applicants: 21, ready: 4, avgScore: 76 },
      { source: "Referral", applicants: 16, ready: 2, avgScore: 78 }
    ]
  }
];

const baseCandidates = [
  {
    id: "mai",
    roleId: "pmt",
    name: "Mai Tran",
    source: "Free course + referral",
    school: "RMIT Vietnam",
    completion: 100,
    quiz: 92,
    engagement: 88,
    cv: 84,
    motivation: 90,
    stage: "Interview",
    notes: "Built a student marketplace prototype and completed all lessons in one day."
  },
  {
    id: "quan",
    roleId: "pmt",
    name: "Quan Pham",
    source: "Product webinar",
    school: "University of Economics",
    completion: 100,
    quiz: 86,
    engagement: 91,
    cv: 78,
    motivation: 85,
    stage: "Case test",
    notes: "Strong participation history and clear product thinking in application answer."
  },
  {
    id: "an",
    roleId: "pmt",
    name: "An Le",
    source: "Campus campaign",
    school: "Hanoi University",
    completion: 67,
    quiz: 76,
    engagement: 70,
    cv: 88,
    motivation: 80,
    stage: "Nurture",
    notes: "Good CV but has not finished the certificate yet."
  },
  {
    id: "minh",
    roleId: "pmt",
    name: "Minh Do",
    source: "LinkedIn campaign",
    school: "FPT University",
    completion: 100,
    quiz: 81,
    engagement: 77,
    cv: 72,
    motivation: 82,
    stage: "Case test",
    notes: "Finished the course and shows practical product curiosity."
  },
  {
    id: "thao",
    roleId: "pmt",
    name: "Thao Bui",
    source: "Career fair",
    school: "UEH",
    completion: 33,
    quiz: 61,
    engagement: 45,
    cv: 82,
    motivation: 66,
    stage: "Nurture",
    notes: "Good background but limited interaction data so far."
  },
  {
    id: "duc",
    roleId: "pmt",
    name: "Duc Hoang",
    source: "Organic signup",
    school: "National Economics University",
    completion: 100,
    quiz: 94,
    engagement: 73,
    cv: 68,
    motivation: 78,
    stage: "Case test",
    notes: "High assessment score despite a lighter CV."
  },
  {
    id: "vy",
    roleId: "pmt",
    name: "Vy Nguyen",
    source: "Student community",
    school: "Ton Duc Thang University",
    completion: 100,
    quiz: 89,
    engagement: 94,
    cv: 91,
    motivation: 88,
    stage: "Interview",
    notes: "Consistently strong across course, CV, and application motivation."
  },
  {
    id: "khoa",
    roleId: "pmt",
    name: "Khoa Vo",
    source: "TikTok campaign",
    school: "Can Tho University",
    completion: 67,
    quiz: 72,
    engagement: 82,
    cv: 65,
    motivation: 76,
    stage: "Nurture",
    notes: "Engaged learner who may become stronger after finishing the course."
  },
  {
    id: "nhi",
    roleId: "pm",
    name: "Nhi Pham",
    source: "Internal referral",
    school: "Product Owner at fintech startup",
    completion: 100,
    quiz: 90,
    engagement: 84,
    cv: 92,
    motivation: 88,
    assignmentScore: 88,
    stage: "Interview",
    notes: "Owns activation roadmap and has strong discovery, experiment, and stakeholder evidence."
  },
  {
    id: "long",
    roleId: "pm",
    name: "Long Nguyen",
    source: "LinkedIn campaign",
    school: "Senior Business Analyst",
    completion: 100,
    quiz: 82,
    engagement: 72,
    cv: 83,
    motivation: 80,
    assignmentScore: 75,
    stage: "Case review",
    notes: "Good stakeholder and analytics background, but needs more direct product discovery evidence."
  },
  {
    id: "huyen",
    roleId: "pm",
    name: "Huyen Tran",
    source: "Talent community",
    school: "Product Executive",
    completion: 67,
    quiz: 78,
    engagement: 81,
    cv: 86,
    motivation: 84,
    assignmentScore: 82,
    stage: "Nurture",
    notes: "Strong CV for Product Manager, but profile is missing complete learning and assessment evidence."
  },
  {
    id: "bao",
    roleId: "apm",
    name: "Bao Le",
    source: "Certificate wallet",
    school: "Associate PM Intern",
    completion: 100,
    quiz: 87,
    engagement: 86,
    cv: 80,
    motivation: 84,
    assignmentScore: 83,
    stage: "Interview invited",
    notes: "Good readiness for Associate PM with strong learning completion and solid case framing."
  },
  {
    id: "trang",
    roleId: "growth-pm",
    name: "Trang Ho",
    source: "Product webinar",
    school: "Growth Marketing Analyst",
    completion: 100,
    quiz: 84,
    engagement: 89,
    cv: 82,
    motivation: 86,
    assignmentScore: 85,
    stage: "Case review",
    notes: "Strong experiment mindset and conversion analysis evidence for Growth Product work."
  },
  {
    id: "son",
    roleId: "product-ops",
    name: "Son Dang",
    source: "Operations community",
    school: "Business Operations Analyst",
    completion: 100,
    quiz: 80,
    engagement: 76,
    cv: 79,
    motivation: 82,
    assignmentScore: 78,
    stage: "Case review",
    notes: "Good process and dashboard experience; needs more product stakeholder examples."
  },
  {
    id: "lan",
    roleId: "pm",
    name: "Lan Vu",
    source: "Executive referral",
    school: "Senior Product Manager, B2B SaaS",
    completion: 0,
    quiz: 0,
    engagement: 0,
    cv: 96,
    motivation: 92,
    assignmentScore: 93,
    stage: "Interview accepted",
    notes: "Led discovery, roadmap prioritization, enterprise stakeholder alignment, experiments, and retention metrics across two product squads."
  },
  {
    id: "tuan",
    roleId: "pmt",
    name: "Tuan Pham",
    source: "Open application",
    school: "Da Nang University",
    completion: 0,
    quiz: 0,
    engagement: 18,
    cv: 61,
    motivation: 73,
    assignmentScore: 48,
    stage: "Needs evidence",
    notes: "Early interest in product but the CV and assignment contain few concrete examples, metrics, or personal decisions."
  },
  {
    id: "yen",
    roleId: "apm",
    name: "Yen Nguyen",
    source: "Campus campaign",
    school: "UX Research Intern",
    completion: 67,
    quiz: 88,
    engagement: 94,
    cv: 89,
    motivation: 91,
    assignmentScore: 86,
    stage: "Interview invited",
    notes: "Strong user interview, synthesis, prototype, experiment, and cross-functional collaboration evidence; limited roadmap ownership."
  },
  {
    id: "khanh",
    roleId: "growth-pm",
    name: "Khanh Tran",
    source: "LinkedIn campaign",
    school: "Performance Marketing Lead",
    completion: 0,
    quiz: 0,
    engagement: 36,
    cv: 87,
    motivation: 84,
    assignmentScore: 91,
    stage: "Case review",
    notes: "Strong acquisition, funnel, conversion, experiment, and analytics evidence; needs proof of retention and product delivery ownership."
  },
  {
    id: "phuong",
    roleId: "product-ops",
    name: "Phuong Dao",
    source: "Operations community",
    school: "Project Coordinator",
    completion: 100,
    quiz: 76,
    engagement: 82,
    cv: 74,
    motivation: 79,
    assignmentScore: 88,
    stage: "TA review",
    notes: "Excellent workflow mapping, dashboard, launch checklist, and stakeholder cadence; limited customer discovery evidence."
  },
  {
    id: "nam",
    roleId: "pmt",
    name: "Nam Bui",
    source: "Certificate wallet",
    school: "HCMC University of Technology",
    completion: 100,
    quiz: 97,
    engagement: 98,
    cv: 58,
    motivation: 86,
    assignmentScore: 72,
    stage: "Nurture",
    notes: "Outstanding learning activity and motivation, but CV evidence is limited to classroom projects without measurable outcomes."
  }
];

const state = {
  completedLessons: new Set(JSON.parse(localStorage.getItem("produckLessons") || "[]")),
  moduleQuizResults: JSON.parse(localStorage.getItem("produckModuleQuizResults") || "{}"),
  quizScore: Number(localStorage.getItem("produckQuizScore") || 0),
  selectedLessonId: localStorage.getItem("produckSelectedLesson") || lessons[0].id,
  activeStudentTab: localStorage.getItem("produckStudentTab") || "learningTab",
  cvUpload: JSON.parse(localStorage.getItem("produckCvUpload") || "null"),
  activePositionId: localStorage.getItem("produckActivePosition") || "pmt",
  selectedApplicationRoleId: localStorage.getItem("produckSelectedApplicationRole") || "pmt",
  activeHrTab: localStorage.getItem("produckHrTab") || "hrOverviewTab",
  selectedCandidateId: "mai",
  assignmentEvaluations: JSON.parse(localStorage.getItem("produckAssignmentEvaluations") || "{}"),
  positionSearch: "",
  positionTypeFilter: "ALL",
  positionSort: "applicants-desc",
  candidateSearch: "",
  candidateJobFilter: "ALL",
  candidateStatusFilter: "ALL",
  candidateSort: "score-desc",
  campaignConfig: JSON.parse(localStorage.getItem("produckCampaignConfig") || "{}"),
  agentConfigs: JSON.parse(localStorage.getItem("produckAgentConfigs") || "{}"),
  interviewAcceptedIds: new Set(JSON.parse(localStorage.getItem("produckInterviewAccepted") || "[]")),
  interviewQuestionPacks: JSON.parse(localStorage.getItem("produckInterviewQuestionPacks") || "{}"),
  allCandidates: [],
  candidates: []
};

const courseTitle = document.querySelector("#courseTitle");
const lessonList = document.querySelector("#lessonList");
const moduleTitle = document.querySelector("#moduleTitle");
const moduleDuration = document.querySelector("#moduleDuration");
const modulePreview = document.querySelector("#modulePreview");
const certificateList = document.querySelector("#certificateList");
const hiringProgramList = document.querySelector("#hiringProgramList");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const certificateBadge = document.querySelector("#certificateBadge");
const quizBox = document.querySelector("#quizBox");
const applyButton = document.querySelector("#applyButton");
const applicationForm = document.querySelector("#applicationForm");
const applicationTitle = document.querySelector("#applicationTitle");
const applicationRoleSummary = document.querySelector("#applicationRoleSummary");
const candidateMotivationLabel = document.querySelector("#candidateMotivationLabel");
const candidateAssignmentLabel = document.querySelector("#candidateAssignmentLabel");
const candidateMotivation = document.querySelector("#candidateMotivation");
const candidateAssignment = document.querySelector("#candidateAssignment");
const cvInput = document.querySelector("#candidateCv");
const cvStatus = document.querySelector("#cvStatus");
const useSampleCv = document.querySelector("#useSampleCv");
const applicationMessage = document.querySelector("#applicationMessage");
const candidateList = document.querySelector("#candidateList");
const candidateDetail = document.querySelector("#candidateDetail");
const agentMode = document.querySelector("#agentMode");
const dashboardHealth = document.querySelector("#dashboardHealth");
const growthSummary = document.querySelector("#growthSummary");
const growthRate = document.querySelector("#growthRate");
const potentialList = document.querySelector("#potentialList");
const sourceQualityList = document.querySelector("#sourceQualityList");
const pipelineInsights = document.querySelector("#pipelineInsights");
const decisionLanes = document.querySelector("#decisionLanes");
const agentRegistry = document.querySelector("#agentRegistry");
const campaignManager = document.querySelector("#campaignManager");
const positionTabs = document.querySelector("#positionTabs");
const selectedPositionTitle = document.querySelector("#selectedPositionTitle");
const selectedPositionSummary = document.querySelector("#selectedPositionSummary");
const positionVolumeList = document.querySelector("#positionVolumeList");
const workloadList = document.querySelector("#workloadList");
const positionSearch = document.querySelector("#positionSearch");
const positionTypeFilter = document.querySelector("#positionTypeFilter");
const positionSort = document.querySelector("#positionSort");
const positionResultCount = document.querySelector("#positionResultCount");
const candidateSearch = document.querySelector("#candidateSearch");
const candidateJobFilter = document.querySelector("#candidateJobFilter");
const candidateStatusFilter = document.querySelector("#candidateStatusFilter");
const candidateSort = document.querySelector("#candidateSort");
const candidateResultCount = document.querySelector("#candidateResultCount");
const hrTabIds = ["hrOverviewTab", "hrPipelineTab", "hrReviewTab", "hrWorkflowTab"];

const cvScreeningAgent = {
  name: "Produck PM Screening Agent",
  rubric: productManagerCompetency,
  analyze(candidate) {
    const cvText = buildCvEvidenceText(candidate);
    const competencyScores = this.rubric.competencies.map((competency) => {
      const matchedKeywords = competency.keywords.filter((keyword) => cvText.includes(keyword.toLowerCase()));
      const keywordScore = Math.min(95, 52 + matchedKeywords.length * 12);
      const profileScore = clampScore(candidate.cv || keywordScore);
      const score = clampScore(keywordScore * 0.55 + profileScore * 0.45);
      return {
        ...competency,
        score,
        matchedKeywords
      };
    });
    const weightedScore = Math.round(
      competencyScores.reduce((sum, competency) => sum + competency.score * competency.weight, 0)
    );
    return {
      agentName: this.name,
      fileName: candidate.cvFileName || "Sample CV profile",
      extractedSummary: summarizeCvEvidence(candidate, competencyScores),
      competencyScores,
      overall: weightedScore,
      riskFlags: getCvRiskFlags(candidate, competencyScores)
    };
  }
};

const assignmentEvaluationAgent = {
  name: "PM CV Evaluator",
  dimensions: [
    {
      label: "Problem framing",
      keywords: ["problem", "drop", "friction", "journey", "root cause", "segment"]
    },
    {
      label: "User evidence",
      keywords: ["user", "customer", "interview", "feedback", "research", "student"]
    },
    {
      label: "Prioritization",
      keywords: ["priority", "prioritize", "impact", "confidence", "trade-off", "highest"]
    },
    {
      label: "Measurement",
      keywords: ["metric", "measure", "activation", "conversion", "retention", "dashboard"]
    },
    {
      label: "Experiment plan",
      keywords: ["test", "experiment", "prototype", "mvp", "validate", "before scaling"]
    }
  ],
  analyze(candidate) {
    const answer = String(candidate.assignmentAnswer || candidate.notes || "").toLowerCase();
    const baseScore = scoreAssignmentAnswer(answer, candidate);
    const dimensions = this.dimensions.map((dimension) => {
      const matchedKeywords = dimension.keywords.filter((keyword) => answer.includes(keyword));
      return {
        ...dimension,
        score: clampScore(58 + matchedKeywords.length * 11 + Math.max(0, baseScore - 76) * 0.35, 52, 96),
        matchedKeywords
      };
    });
    const strongest = [...dimensions].sort((a, b) => b.score - a.score)[0];
    const weakest = [...dimensions].sort((a, b) => a.score - b.score)[0];
    const missingEvidence = dimensions
      .filter((dimension) => dimension.matchedKeywords.length === 0)
      .map((dimension) => dimension.label);
    return {
      agentName: this.name,
      score: baseScore,
      dimensions,
      summary: `${strongest.label} is the strongest assignment signal; ${weakest.label} needs the most calibration.`,
      missingEvidence
    };
  }
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function getPositionById(positionId) {
  return activeHiringPositions.find((position) => position.id === positionId) || activeHiringPositions[0];
}

function getSelectedPosition() {
  return getPositionById(state.activePositionId);
}

function getSelectedApplicationPosition() {
  return getPositionById(state.selectedApplicationRoleId);
}

function getTotalActiveApplicants() {
  return activeHiringPositions.reduce((sum, position) => sum + position.applicants, 0);
}

function getCampaignConfig(position) {
  return {
    status: "OPEN",
    channels: position.sourceMix.slice(0, 3).map((item) => item.source),
    ...(state.campaignConfig[position.id] || {})
  };
}

function getFilteredCandidates() {
  return state.allCandidates.filter((candidate) => candidate.roleId === state.activePositionId);
}

function getLearningAddOn(candidate) {
  const completion = clampScore(candidate.completion || 0);
  const quiz = clampScore(candidate.quiz || 0);
  const certificateEarned = Boolean(candidate.certificateEarned || (completion === 100 && quiz >= 80));
  const coursePoints = Math.round((completion / 100) * 4);
  const examPoints = Math.round((quiz / 100) * 4);
  const certificatePoints = certificateEarned ? 2 : 0;
  return {
    score: coursePoints + examPoints + certificatePoints,
    maxScore: 10,
    coursePoints,
    examPoints,
    certificatePoints,
    certificateEarned
  };
}

function shouldReplaceRoleDefault(textarea) {
  const current = textarea.value.trim();
  return !current || activeHiringPositions.some((position) => (
    current === position.motivationDefault || current === position.assignmentDefault
  ));
}

function clampScore(score, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(score)));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatShortDateTime(value) {
  if (!value) {
    return "Just now";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getAssignmentTriggerReceipt(assignmentAnalysis) {
  const trigger = assignmentAnalysis?.trigger;
  if (!trigger || assignmentAnalysis.source !== "workspace_agent_triggered") {
    return "";
  }

  const triggerId = String(trigger.endpoint || "").match(/workspace_agents\/([^/]+)\/trigger/)?.[1] || "published agent";

  return `
    <div class="assignment-trigger-receipt">
      <div>
        <span>Live trigger</span>
        <strong>Accepted by Workspace Agent</strong>
      </div>
      <dl>
        <div>
          <dt>Status</dt>
          <dd>${escapeHtml(trigger.statusCode || trigger.status || 202)}</dd>
        </div>
        <div>
          <dt>Trigger ID</dt>
          <dd>${escapeHtml(triggerId)}</dd>
        </div>
        <div>
          <dt>Conversation</dt>
          <dd>${escapeHtml(trigger.conversationKey)}</dd>
        </div>
        <div>
          <dt>Accepted</dt>
          <dd>${escapeHtml(formatShortDateTime(trigger.acceptedAt))}</dd>
        </div>
      </dl>
    </div>
  `;
}

function scoreAssignmentAnswer(answer, candidate = {}) {
  if (Number.isFinite(candidate.assignmentScore)) {
    return candidate.assignmentScore;
  }
  const text = String(answer || "").toLowerCase();
  if (!text.trim()) {
    return clampScore((candidate.quiz || 70) * 0.55 + (candidate.motivation || 70) * 0.45);
  }
  const keywords = [
    "user",
    "customer",
    "problem",
    "drop",
    "interview",
    "metric",
    "measure",
    "test",
    "experiment",
    "activation",
    "priority",
    "evidence"
  ];
  const keywordHits = keywords.filter((keyword) => text.includes(keyword)).length;
  const lengthSignal = Math.min(18, text.split(/\s+/).filter(Boolean).length / 4);
  return clampScore(56 + keywordHits * 4 + lengthSignal, 54, 96);
}

function getAssignmentSignature(candidate) {
  return [
    candidate.roleId || "",
    candidate.targetRole || "",
    candidate.assignmentAnswer || candidate.notes || ""
  ].join("|");
}

function getCachedAssignmentEvaluation(candidate) {
  const cached = state.assignmentEvaluations[candidate.id];
  if (!cached || cached.signature !== getAssignmentSignature(candidate)) {
    return null;
  }
  return cached;
}

function buildLeadProfile(candidate, cvAnalysis, assignmentAnalysis = null) {
  const assignmentScore = assignmentAnalysis?.score || scoreAssignmentAnswer(candidate.assignmentAnswer, candidate);
  const targetPosition = candidate.targetRole || getPositionById(candidate.roleId).title;
  const learningAddOn = getLearningAddOn(candidate);
  return {
    source: candidate.source,
    targetRole: targetPosition,
    completion: candidate.completion,
    quizScore: candidate.quiz,
    engagementScore: candidate.engagement,
    assignmentScore,
    assignmentSummary: assignmentAnalysis?.summary || "Assignment evidence is scored from the candidate case response.",
    cvCompetencyScore: cvAnalysis.overall,
    motivationScore: candidate.motivation,
    learningAddOn,
    signals: [
      { label: "Target role", value: targetPosition, description: "Hiring position selected for this application." },
      { label: "Lead source", value: candidate.source, description: "Where this profile entered the funnel." },
      { label: "Learning add-on", value: `+${learningAddOn.score}/${learningAddOn.maxScore}`, description: "Optional bonus from course, exam, and certificate signals." },
      { label: "Course completion", value: `${candidate.completion}%`, description: "Optional learning progress; it is not an application gate." },
      { label: "Quiz score", value: candidate.quiz, description: "Optional readiness exam result." },
      { label: "Assignment", value: assignmentScore, description: "Problem framing and action clarity." },
      { label: "CV match", value: cvAnalysis.overall, description: "Competency match against the PM rubric." },
      { label: "Motivation", value: candidate.motivation, description: "Signal from application answer." }
    ]
  };
}

function scoreCandidate(candidate) {
  const cvScore = candidate.cvAnalysis?.overall || candidate.cv || 70;
  const assignmentScore = candidate.leadProfile?.assignmentScore || scoreAssignmentAnswer(candidate.assignmentAnswer, candidate);
  const learningAddOn = candidate.leadProfile?.learningAddOn || getLearningAddOn(candidate);
  return clampScore(
    cvScore * 0.6 +
      assignmentScore * 0.18 +
      candidate.motivation * 0.12 +
      learningAddOn.score
  );
}

function getReadinessStatus(candidate) {
  const score = candidate.score || scoreCandidate(candidate);
  const leadProfile = candidate.leadProfile || buildLeadProfile(candidate, candidate.cvAnalysis);
  const missingEvidence = [];
  const riskFlags = candidate.cvAnalysis.riskFlags.filter((risk) => risk !== "No major screening risk detected in demo mode.");
  const hasMajorCvRisk = riskFlags.some((risk) => risk !== "No uploaded PDF CV yet.");
  const hasUploadedCvGap = candidate.cvFileName === "No uploaded CV";

  if (hasUploadedCvGap) {
    missingEvidence.push("Upload PDF CV for stronger competency evidence.");
  }
  if (leadProfile.assignmentScore < 72) {
    missingEvidence.push("Improve assignment with clearer problem, evidence, and metric.");
  }
  if (hasMajorCvRisk) {
    missingEvidence.push("Resolve CV competency evidence gaps.");
  }

  const status = score >= 80
    ? "READY"
    : score >= 65
      ? "BORDERLINE"
      : "NOT_MATCH";

  const confidence = missingEvidence.length === 0 && score >= 85
    ? "high"
    : missingEvidence.length <= 2 && score >= 72
      ? "medium"
      : "low";

  if (status === "READY") {
    const normalizedStage = String(candidate.stage || "").toLowerCase();
    const nextAction = normalizedStage.includes("accepted")
      ? "Prepare interviewer pack"
      : normalizedStage === "interview"
        ? "Continue interview process"
        : normalizedStage.includes("invited")
          ? "Await interview response"
          : "Invite to interview";
    return {
      status,
      label: "Ready",
      tone: "green",
      confidence,
      nextAction,
      summary: "Strong CV and application evidence, with any learning activity counted only as an optional bonus. Candidate is ready for the next selection round.",
      missingEvidence,
      humanReviewRequired: false,
      oaMessageTitle: "Interview invitation",
      oaMessage: "Your profile meets the current requirements. Choose an interview time to continue with the hiring team.",
      tasks: ["Send interview invitation", "Offer available time slots", "Wait for candidate acceptance"]
    };
  }

  if (status === "NOT_MATCH") {
    return {
      status,
      label: "Not match",
      tone: "red",
      confidence,
      nextAction: "Flag for HR review",
      summary: "Current evidence is below the hiring threshold. HR review is required before any outcome is sent.",
      missingEvidence: missingEvidence.length ? missingEvidence : ["Validate fit manually before closing this round."],
      humanReviewRequired: true,
      oaMessageTitle: "Outcome plus feedback",
      oaMessage: "Thank you for completing the process. We are not moving forward for this round, but here is feedback and a recommended learning path.",
      tasks: ["Flag for human review", "Draft feedback message", "Move certified candidate to talent community"]
    };
  }

  return {
    status,
    label: "Borderline",
    tone: "yellow",
    confidence,
      nextAction: "Review evidence gaps",
      summary: "Candidate is close, but the CV or application evidence needs calibration. Optional learning can strengthen ranking but is not required.",
    missingEvidence: missingEvidence.length ? missingEvidence : ["Ask for one more case response or HR calibration."],
    humanReviewRequired: confidence === "low",
      oaMessageTitle: "Evidence follow-up",
      oaMessage: "You are close. We may ask for one additional work sample or clarification before confirming the next round.",
      tasks: ["Review evidence gaps", "Request one targeted clarification", "Rescore after profile update"]
  };
}

function getHiringProcessStatus(candidate) {
  const status = candidate.readinessDecision.status;
  const currentStage = String(candidate.stage || "");
  const normalizedStage = currentStage.toLowerCase();
  if (status === "READY") {
    if (normalizedStage.includes("accepted")) return "Interview accepted";
    if (normalizedStage === "interview") return "Interview";
    if (normalizedStage.includes("invited")) return "Interview invited";
    return "Ready for interview";
  }
  if (status === "BORDERLINE") {
    return normalizedStage.includes("case") ? "Case evidence review" : "Evidence review";
  }
  return "TA outcome review";
}

function buildAgentTimeline(candidate) {
  const decision = candidate.readinessDecision;
  const reviewStep = decision.humanReviewRequired ? "HR review required before message is sent" : "Next OA action ready to send";
  return [
    { label: "Lead profile created", actor: "System" },
    { label: "CV and assignment evidence scored", actor: "Agent" },
    { label: `${decision.label} status assigned`, actor: "Agent" },
    { label: `${decision.oaMessageTitle} drafted`, actor: "Agent" },
    { label: reviewStep, actor: "HR" }
  ];
}

function getRecommendation(candidate) {
  const decision = candidate.readinessDecision || getReadinessStatus(candidate);
  return {
    action: decision.nextAction,
    tone: decision.tone,
    message: decision.summary,
    tasks: decision.tasks
  };
}

function buildAgentPipeline(candidate) {
  const decision = candidate.readinessDecision;
  return [
    {
      name: "Student Signals",
      owner: "System",
      tone: "blue",
      status: "Optional add-on",
      input: "Course, quiz, engagement, source, motivation",
      output: `+${candidate.leadProfile.learningAddOn.score}/10 ranking bonus from learning, exam, and certificate`
    },
    {
      name: "Lead Profile Agent",
      owner: "Agent",
      tone: "green",
      status: "Profile built",
      input: "Student signals plus target role",
      output: `${candidate.leadProfile.targetRole} profile from ${candidate.leadProfile.source}`
    },
    {
      name: "CV Screening Agent",
      owner: "Agent",
      tone: "blue",
      status: "CV scored",
      input: "PDF state plus PM competency rubric",
      output: `${candidate.cvAnalysis.overall}/100 competency match`
    },
    {
      name: "Assignment Agent",
      owner: "Agent",
      tone: "yellow",
      status: "Case scored",
      input: "Mini assignment response",
      output: `${candidate.assignmentAnalysis.score}/100 assignment evidence`
    },
    {
      name: "Talent Readiness Agent",
      owner: "Agent",
      tone: decision.tone,
      status: decision.label,
      input: "Lead profile, CV score, assignment score",
      output: `${decision.nextAction} with ${decision.confidence} confidence`
    },
    {
      name: "OA Workflow Agent",
      owner: "Agent",
      tone: decision.humanReviewRequired ? "red" : "green",
      status: decision.humanReviewRequired ? "Draft held" : "Draft ready",
      input: "Readiness status and guardrails",
      output: decision.oaMessageTitle
    },
    {
      name: "HR Approval",
      owner: "Human",
      tone: decision.humanReviewRequired ? "red" : "green",
      status: decision.humanReviewRequired ? "Review needed" : "Approve next step",
      input: "Agent package and candidate evidence",
      output: decision.humanReviewRequired ? "HR checks decision before message" : "Interview invitation can be sent automatically"
    }
  ];
}

function enrichCandidates(candidates) {
  return candidates
    .map((candidate) => {
      const cvAnalysis = candidate.cvAnalysis || cvScreeningAgent.analyze(candidate);
      const assignmentAnalysis = candidate.assignmentAnalysis || getCachedAssignmentEvaluation(candidate) || assignmentEvaluationAgent.analyze(candidate);
      const leadProfile = buildLeadProfile(candidate, cvAnalysis, assignmentAnalysis);
      const score = scoreCandidate({ ...candidate, cvAnalysis, leadProfile });
      const readinessDecision = getReadinessStatus({ ...candidate, cvAnalysis, leadProfile, score });
      const timeline = buildAgentTimeline({ ...candidate, readinessDecision });
      const recommendation = getRecommendation({ ...candidate, cvAnalysis, leadProfile, score, readinessDecision });
      const agentPipeline = buildAgentPipeline({ ...candidate, cvAnalysis, assignmentAnalysis, leadProfile, score, readinessDecision });
      const reasons = [
        `CV and application evidence form the core hiring score.`,
        `Optional learning signals add ${leadProfile.learningAddOn.score}/10 bonus points without gating the application.`,
        `${leadProfile.assignmentScore}/100 assignment score shows problem framing and action clarity.`,
        `${candidate.engagement}/100 engagement score shows consistency inside the funnel.`,
        `${cvAnalysis.overall}/100 CV competency match based on the PM rubric.`
      ];
      return { ...candidate, cvAnalysis, assignmentAnalysis, leadProfile, score, readinessDecision, timeline, recommendation, agentPipeline, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

function buildCandidateFromForm(formData) {
  const completion = Math.round((state.completedLessons.size / lessons.length) * 100);
  const motivationText = String(formData.get("candidateMotivation") || "");
  const motivation = Math.min(96, 70 + Math.floor(motivationText.length / 12));
  const position = getSelectedApplicationPosition();
  return {
    id: `applicant-${Date.now()}`,
    roleId: position.id,
    targetRole: position.title,
    name: String(formData.get("candidateName")),
    source: String(formData.get("candidateLeadSource")),
    school: String(formData.get("candidateSchool")),
    completion,
    quiz: state.quizScore,
    certificateEarned: completion === 100 && state.quizScore >= 80,
    engagement: 87,
    cv: state.cvUpload ? 82 : 74,
    cvFileName: state.cvUpload?.name || "No uploaded CV",
    cvUploadedAt: state.cvUpload?.uploadedAt || null,
    motivation,
    assignmentAnswer: String(formData.get("candidateAssignment")),
    stage: "AI review",
    aiAssessmentStatus: "Queued",
    appliedAt: new Date().toISOString(),
    notes: `Live demo applicant created from the student journey for ${position.title}.`
  };
}

function buildCvEvidenceText(candidate) {
  const uploadedName = String(candidate.cvFileName || "").replace(/[-_.]/g, " ").toLowerCase();
  const notes = String(candidate.notes || "").toLowerCase();
  const source = String(candidate.source || "").toLowerCase();
  const assignment = String(candidate.assignmentAnswer || "").toLowerCase();
  const baseProfile = [
    uploadedName,
    notes,
    source,
    assignment,
    "customer user research interview problem insight prioritize roadmap impact metric experiment prototype mvp stakeholder collaborate data analysis conversion"
  ];
  return baseProfile.join(" ");
}

function summarizeCvEvidence(candidate, competencyScores) {
  const strongest = [...competencyScores].sort((a, b) => b.score - a.score).slice(0, 2);
  const fileLabel = candidate.cvFileName && candidate.cvFileName !== "No uploaded CV"
    ? `Read uploaded PDF: ${candidate.cvFileName}.`
    : "Used sample CV evidence because no PDF was uploaded.";
  return `${fileLabel} Strongest signals: ${strongest.map((item) => item.label).join(" and ")}.`;
}

function getCvRiskFlags(candidate, competencyScores) {
  const weak = competencyScores.filter((competency) => competency.score < 68).map((competency) => competency.label);
  const flags = [];
  if (candidate.cvFileName === "No uploaded CV") {
    flags.push("No uploaded PDF CV yet.");
  }
  if (weak.length > 0) {
    flags.push(`Needs more evidence for ${weak.join(", ")}.`);
  }
  return flags.length ? flags : ["No major screening risk detected in demo mode."];
}

function loadCandidates() {
  const savedApplicants = JSON.parse(localStorage.getItem("produckApplicants") || "[]");
  const legacyApplicant = localStorage.getItem("produckApplicant");
  const legacyCandidates = legacyApplicant ? [JSON.parse(legacyApplicant)] : [];
  const liveCandidates = [...savedApplicants, ...legacyCandidates];
  state.allCandidates = enrichCandidates([...liveCandidates, ...baseCandidates]);
  state.candidates = getFilteredCandidates();
  if (!state.allCandidates.some((candidate) => candidate.id === state.selectedCandidateId)) {
    state.selectedCandidateId = state.allCandidates[0]?.id;
  }
}

function buildAssignmentEvaluationPayload(candidate) {
  return {
    id: candidate.id,
    roleId: candidate.roleId,
    targetRole: candidate.targetRole || getPositionById(candidate.roleId).title,
    name: candidate.name,
    school: candidate.school,
    completion: candidate.completion,
    quiz: candidate.quiz,
    engagement: candidate.engagement,
    motivation: candidate.motivation,
    certificateEarned: candidate.leadProfile?.learningAddOn?.certificateEarned || candidate.certificateEarned || false,
    learningAddOn: candidate.leadProfile?.learningAddOn || getLearningAddOn(candidate),
    source: candidate.source,
    cvFileName: candidate.cvAnalysis?.fileName || candidate.cvFileName || "",
    cvEvidence: candidate.cvAnalysis?.extractedSummary || candidate.notes || "",
    cvCompetencyScores: candidate.cvAnalysis?.competencyScores || [],
    cvRiskFlags: candidate.cvAnalysis?.riskFlags || [],
    assignmentAnswer: candidate.assignmentAnswer || candidate.notes || ""
  };
}

function getInterviewEvidencePayload(candidate) {
  const structuredOutput = candidate.assignmentAnalysis?.structuredOutput || {};
  return {
    eventType: "INTERVIEW_ACCEPTED",
    id: candidate.id,
    name: candidate.name,
    targetRole: candidate.leadProfile.targetRole,
    readiness: candidate.readinessDecision.status,
    confidence: candidate.readinessDecision.confidence,
    summary: structuredOutput.summary || candidate.readinessDecision.summary,
    levelFit: structuredOutput.levelFit || "Validate against the target role during interview.",
    competencyHighlights: structuredOutput.competencyHighlights || candidate.cvAnalysis.competencyScores
      .slice(0, 4)
      .map((item) => ({
        competency: item.label,
        score: item.score,
        evidence: item.matchedKeywords.join(", ") || "Limited explicit evidence"
      })),
    risks: structuredOutput.risks || candidate.cvAnalysis.riskFlags,
    missingEvidence: structuredOutput.missingEvidence || [
      ...candidate.readinessDecision.missingEvidence,
      ...candidate.assignmentAnalysis.missingEvidence
    ],
    interviewProbes: structuredOutput.interviewProbes || [],
    cvEvidence: candidate.cvAnalysis.extractedSummary,
    assignmentEvidence: candidate.assignmentAnalysis.summary
  };
}

function buildFallbackInterviewQuestionPack(candidate, source = "demo_fallback") {
  const evidence = getInterviewEvidencePayload(candidate);
  const rawGaps = [
    ...evidence.missingEvidence,
    ...evidence.risks.filter((risk) => !risk.toLowerCase().includes("no major"))
  ];
  const claimChecks = evidence.competencyHighlights.map((item) => (
    `Validate ${item.competency} evidence: ${item.evidence}`
  ));
  const gaps = [...new Set([...rawGaps, ...claimChecks])].filter(Boolean);
  const fallbackGaps = gaps.length ? gaps : [
    "Validate the candidate's personal contribution to the strongest product outcome.",
    "Validate decision quality when priorities or stakeholder needs conflict.",
    "Validate how the candidate measures product impact.",
    "Validate learning from a product decision that did not work as expected."
  ];
  const questions = fallbackGaps.slice(0, 5).map((gap, index) => {
    const competency = evidence.competencyHighlights[index]?.competency || "Product judgment";
    return {
      id: `Q${index + 1}`,
      competency,
      evidenceGap: gap,
      question: `Tell us about a specific example that demonstrates ${gap.replace(/[.]$/, "").toLowerCase()}. What was your personal role?`,
      followUp: "What trade-off did you make, what changed because of your decision, and how did you measure the result?",
      strongEvidence: ["Specific context and personal ownership", "Clear trade-off or decision", "Measurable outcome or learning"],
      warningSigns: ["Only describes the team's work", "No concrete decision or evidence", "Cannot explain the outcome"],
      scoreGuide: {
        1: "Vague or unsupported answer with unclear ownership.",
        3: "Relevant example with reasonable ownership but limited outcome evidence.",
        5: "Specific, high-ownership example with sound judgment and measurable impact."
      }
    };
  });
  return {
    schemaVersion: "produck.interview_question_pack.v1",
    candidateId: candidate.id,
    candidateName: candidate.name,
    targetRole: candidate.leadProfile.targetRole,
    triggerEvent: "INTERVIEW_ACCEPTED",
    status: "READY",
    interviewDurationMinutes: 45,
    openingPrompt: "Set expectations, confirm the candidate's role in the examples, and ask for specific evidence.",
    questions,
    closingPrompt: "Ask what the candidate learned and what they would do differently with the same problem today.",
    interviewerNotes: ["Score the evidence, not presentation style.", "Record direct evidence and unresolved follow-ups."],
    source,
    delivery: {
      audience: "INTERVIEWER",
      visibility: "NOT_IN_HR_CANDIDATE_REVIEW",
      status: source === "workspace_agent_triggered" ? "QUEUED" : "PREPARED"
    },
    generatedAt: new Date().toISOString()
  };
}

async function acceptInterviewAndPrepareQuestions(candidate) {
  state.interviewAcceptedIds.add(candidate.id);
  localStorage.setItem("produckInterviewAccepted", JSON.stringify([...state.interviewAcceptedIds]));
  state.interviewQuestionPacks[candidate.id] = buildFallbackInterviewQuestionPack(candidate);
  localStorage.setItem("produckInterviewQuestionPacks", JSON.stringify(state.interviewQuestionPacks));
  renderCandidateDetail();

  try {
    const response = await fetch("/api/prepare-interview-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": `produck-interview-${candidate.id}-${Date.now()}`
      },
      body: JSON.stringify({
        candidate: getInterviewEvidencePayload(candidate)
      })
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body.error || "Interview question agent trigger failed.");
    }
    state.interviewQuestionPacks[candidate.id] = {
      ...state.interviewQuestionPacks[candidate.id],
      source: "workspace_agent_triggered",
      trigger: body.trigger || null
    };
  } catch (error) {
    state.interviewQuestionPacks[candidate.id] = {
      ...state.interviewQuestionPacks[candidate.id],
      source: "demo_fallback"
    };
  }

  localStorage.setItem("produckInterviewQuestionPacks", JSON.stringify(state.interviewQuestionPacks));
  renderCandidateDetail();
}

function renderInterviewHandoff(candidate) {
  if (candidate.readinessDecision.status !== "READY") {
    return "";
  }
  const accepted = state.interviewAcceptedIds.has(candidate.id);
  const pack = state.interviewQuestionPacks[candidate.id];
  if (!accepted) {
    return `
      <div class="interview-handoff-panel">
        <div>
          <p class="eyebrow">Automatic next step</p>
          <h3>Interview invitation sent</h3>
          <p>This candidate meets the current requirements. The question agent waits until the candidate accepts.</p>
        </div>
        <button class="primary-button" type="button" data-accept-interview="${candidate.id}">Candidate accepts interview</button>
      </div>
    `;
  }
  return `
    <div class="interview-delivery-panel">
      <div>
        <p class="eyebrow">Interview handoff</p>
        <h3>Interviewer pack available</h3>
        <p>${pack?.questions?.length || 0} evidence-gap questions are ready for TA and the assigned interviewer.</p>
      </div>
      <div class="interview-delivery-status">
        <span class="status-pill ${pack?.source === "workspace_agent_triggered" ? "green" : "yellow"}">
          ${pack?.source === "workspace_agent_triggered" ? "Agent queued" : "Prepared locally"}
        </span>
        <small>${pack?.source === "workspace_agent_triggered" ? "Ready for interviewer delivery" : "Prepared in demo mode"}</small>
      </div>
    </div>
    <details class="interviewer-pack">
      <summary>View interviewer pack</summary>
      <div class="interviewer-pack-list">
        ${(pack?.questions || []).map((item) => `
          <article>
            <span>${escapeHtml(item.id)}</span>
            <div>
              <strong>${escapeHtml(item.competency)}</strong>
              <p>${escapeHtml(item.question)}</p>
              <small>Follow-up: ${escapeHtml(item.followUp)}</small>
            </div>
          </article>
        `).join("")}
      </div>
    </details>
  `;
}

async function runLiveAssignmentEvaluation(candidateOverride = null) {
  const selectedCandidate = candidateOverride
    || state.candidates.find((item) => item.id === state.selectedCandidateId)
    || state.candidates[0];
  if (!selectedCandidate) {
    return false;
  }
  const response = await fetch("/api/evaluate-assignment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": `produck-assignment-${selectedCandidate.id}-${Date.now()}`
    },
    body: JSON.stringify({
      candidate: buildAssignmentEvaluationPayload(selectedCandidate)
    })
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || "Live assignment evaluation failed.");
  }

  const fallbackEvaluation = assignmentEvaluationAgent.analyze(selectedCandidate);
  state.assignmentEvaluations[selectedCandidate.id] = {
    ...fallbackEvaluation,
    source: body.trigger?.source === "workspace_agent" ? "workspace_agent_triggered" : "demo_fallback",
    trigger: body.trigger || null,
    summary: body.trigger?.source === "workspace_agent"
      ? "PM CV Evaluator trigger accepted. The visible CV score uses the demo fallback until a result-return path is added."
      : fallbackEvaluation.summary,
    signature: getAssignmentSignature(selectedCandidate),
    evaluatedAt: new Date().toISOString()
  };
  localStorage.setItem("produckAssignmentEvaluations", JSON.stringify(state.assignmentEvaluations));
  return true;
}

function saveProvisionalAssessment(candidate, source = "demo_fallback") {
  const fallbackEvaluation = assignmentEvaluationAgent.analyze(candidate);
  state.assignmentEvaluations[candidate.id] = {
    ...fallbackEvaluation,
    source,
    structuredOutput: {
      candidateId: candidate.id,
      candidateName: candidate.name,
      targetRole: candidate.targetRole,
      cvScore: candidate.cvAnalysis?.overall || candidate.cv || 0,
      addOnScore: getLearningAddOn(candidate).score,
      assignmentScore: fallbackEvaluation.score,
      readiness: "PROVISIONAL",
      confidence: candidate.cvFileName === "No uploaded CV" ? "LOW" : "MEDIUM",
      stage: "AI reviewed",
      nextAction: "Review structured evidence package",
      summary: fallbackEvaluation.summary,
      risks: candidate.cvAnalysis?.riskFlags || [],
      missingEvidence: fallbackEvaluation.missingEvidence,
      interviewProbes: fallbackEvaluation.missingEvidence.map((item) => `Ask for evidence of ${item.toLowerCase()}.`),
      evaluatedAt: new Date().toISOString()
    },
    signature: getAssignmentSignature(candidate),
    evaluatedAt: new Date().toISOString()
  };
  localStorage.setItem("produckAssignmentEvaluations", JSON.stringify(state.assignmentEvaluations));
}

function renderLessons() {
  courseTitle.textContent = courseContent.title;
  lessonList.innerHTML = lessons
    .map((lesson, index) => {
      const done = state.completedLessons.has(lesson.id);
      const selected = state.selectedLessonId === lesson.id;
      return `
        <article class="lesson-card ${done ? "done" : ""} ${selected ? "selected" : ""}">
          <div class="lesson-number">${done ? "OK" : String(index + 1).padStart(2, "0")}</div>
          <div>
            <h3>${lesson.title}</h3>
            <p>${lesson.summary}</p>
            <span class="lesson-duration">${lesson.duration}</span>
          </div>
          <div class="lesson-actions">
            <button class="lesson-action" type="button" data-preview="${lesson.id}">Open course</button>
            <button class="lesson-action" type="button" data-lesson="${lesson.id}">
              ${done ? "Completed" : "Mark complete"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll("[data-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedLessonId = button.dataset.preview;
      localStorage.setItem("produckSelectedLesson", state.selectedLessonId);
      renderStudent();
    });
  });

  document.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      state.completedLessons.add(button.dataset.lesson);
      localStorage.setItem("produckLessons", JSON.stringify([...state.completedLessons]));
      renderStudent();
    });
  });
}

function renderModulePreview() {
  const lesson = lessons.find((item) => item.id === state.selectedLessonId) || lessons[0];
  const moduleQuiz = state.moduleQuizResults[lesson.id];
  moduleTitle.textContent = lesson.title;
  moduleDuration.textContent = lesson.duration;
  modulePreview.innerHTML = `
    <div class="module-hero">
      <span>PM</span>
      <div>
        <h3>${lesson.preview.headline}</h3>
        <p>${lesson.preview.body}</p>
      </div>
    </div>
    <div class="module-body">
      ${lesson.preview.bullets.map((bullet) => `
        <div class="learning-point">
          <span></span>
          <p>${bullet}</p>
        </div>
      `).join("")}
    </div>
    <div class="case-quiz-grid">
      <div class="example-box">
        <strong>Mini case</strong>
        <p>${lesson.miniCase.prompt}</p>
        <small>${lesson.miniCase.answer}</small>
      </div>
      <div class="mini-quiz-box">
        <strong>Mini quiz</strong>
        <p>${lesson.miniQuiz.question}</p>
        <div class="mini-quiz-options">
          ${lesson.miniQuiz.options.map((option, index) => `
            <button class="${moduleQuiz?.selected === index ? (option.correct ? "correct" : "wrong") : ""}" type="button" data-module-quiz="${lesson.id}" data-option-index="${index}">
              ${option.label}
            </button>
          `).join("")}
        </div>
        <span>${moduleQuiz ? (moduleQuiz.correct ? "Correct. This module is counted as learned." : "Try again. Pick the answer a PM would use.") : "Answer to strengthen your learning signal."}</span>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-module-quiz]").forEach((button) => {
    button.addEventListener("click", () => {
      const moduleId = button.dataset.moduleQuiz;
      const optionIndex = Number(button.dataset.optionIndex);
      const selectedLesson = lessons.find((item) => item.id === moduleId);
      const correct = Boolean(selectedLesson?.miniQuiz.options[optionIndex]?.correct);
      state.moduleQuizResults[moduleId] = { selected: optionIndex, correct };
      if (correct) {
        state.completedLessons.add(moduleId);
        localStorage.setItem("produckLessons", JSON.stringify([...state.completedLessons]));
      }
      localStorage.setItem("produckModuleQuizResults", JSON.stringify(state.moduleQuizResults));
      renderStudent();
    });
  });
}

function renderProgress() {
  const progress = Math.round((state.completedLessons.size / lessons.length) * 100);
  document.documentElement.style.setProperty("--course-progress", `${progress}%`);
  progressPercent.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;
  const certificateUnlocked = progress === 100 && state.quizScore >= 80;
  certificateBadge.textContent = certificateUnlocked ? "Optional certificate earned" : "Optional certificate not earned";
  certificateBadge.className = `status-pill ${certificateUnlocked ? "" : "muted"}`;
  applyButton.disabled = false;
  applyButton.textContent = `Apply to ${getSelectedApplicationPosition().shortTitle}`;
}

function renderQuiz() {
  const courseDone = state.completedLessons.size === lessons.length;
  if (!courseDone) {
    quizBox.innerHTML = `
      <h3>Unlock the quiz</h3>
      <p>Complete all course lessons to take the readiness check.</p>
    `;
    return;
  }

  if (state.quizScore >= 80) {
    quizBox.innerHTML = `
      <h3>Quiz passed: ${state.quizScore}/100</h3>
      <p>The optional certificate adds bonus points to your recruitment ranking.</p>
    `;
    return;
  }

  quizBox.innerHTML = `
    <h3>${courseContent.quiz.question}</h3>
    <p>Choose the answer that best matches Produck's approach.</p>
    <div class="quiz-options">
      ${courseContent.quiz.options.map((option) => `
        <button type="button" data-score="${option.score}">${option.label}</button>
      `).join("")}
    </div>
  `;

  document.querySelectorAll("[data-score]").forEach((button) => {
    button.addEventListener("click", () => {
      state.quizScore = Number(button.dataset.score);
      localStorage.setItem("produckQuizScore", String(state.quizScore));
      button.classList.add("correct");
      setTimeout(renderStudent, 250);
    });
  });
}

function renderStudent() {
  renderStudentTabs();
  renderLessons();
  renderModulePreview();
  renderProgress();
  renderQuiz();
  renderCvUpload();
  renderCertificates();
  renderHiringPrograms();
  renderApplicationForSelectedPosition();
}

function renderStudentTabs() {
  document.querySelectorAll(".student-tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === state.activeStudentTab);
  });
  document.querySelectorAll(".funnel-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.studentTab === state.activeStudentTab);
  });
}

function getProgressPercent() {
  return Math.round((state.completedLessons.size / lessons.length) * 100);
}

function renderCertificates() {
  const progress = getProgressPercent();
  const passedExam = state.quizScore >= 80;
  certificateList.innerHTML = courseContent.certificates.map((certificate, index) => {
    const earned = index === 0 ? progress === 100 && passedExam : progress >= 50 && state.moduleQuizResults[lessons[index + 1]?.id]?.correct;
    const status = earned ? "Earned" : certificate.status === "progress" ? "In progress" : "Locked";
    return `
      <article class="certificate-card ${earned ? "earned" : ""}">
        <div class="certificate-seal">${earned ? "✓" : `C${index + 1}`}</div>
        <div>
          <p class="eyebrow">${certificate.issuer}</p>
          <h3>${certificate.title}</h3>
          <p>${certificate.requirement}</p>
        </div>
        <span class="status-pill ${earned ? "" : "muted"}">${status}</span>
      </article>
    `;
  }).join("");
}

function renderApplicationForSelectedPosition() {
  const position = getSelectedApplicationPosition();
  applicationTitle.textContent = `Apply to ${position.title}`;
  applicationRoleSummary.textContent = `${position.type} role / ${formatNumber(position.applicants)} CVs currently active / ${position.targetHires} target hire${position.targetHires === 1 ? "" : "s"}.`;
  candidateMotivationLabel.textContent = position.motivationLabel;
  candidateAssignmentLabel.textContent = position.assignmentLabel;
  candidateMotivation.placeholder = position.motivationDefault;
  candidateAssignment.placeholder = position.assignmentDefault;

  if (shouldReplaceRoleDefault(candidateMotivation)) {
    candidateMotivation.value = position.motivationDefault;
  }
  if (shouldReplaceRoleDefault(candidateAssignment)) {
    candidateAssignment.value = position.assignmentDefault;
  }
  applyButton.textContent = `Apply to ${position.shortTitle}`;
}

function renderHiringPrograms() {
  hiringProgramList.innerHTML = activeHiringPositions.map((program) => `
    <article class="program-card ${program.id === state.selectedApplicationRoleId ? "selected" : ""}">
      <div class="program-header">
        <span>${program.type}</span>
        <strong>${formatNumber(program.applicants)} CVs</strong>
      </div>
      <h3>${program.title}</h3>
      <p>${program.targetHires} target hire${program.targetHires === 1 ? "" : "s"} / ${program.slaHours}h SLA</p>
      <p>${program.studentDescription}</p>
      <div class="program-steps">
        ${["Apply with CV", "AI CV + add-on review", "Interview invitation", "Evidence-based interview", "Offer"].map((step, index) => `
          <div>
            <span>${index + 1}</span>
            <p>${step}</p>
          </div>
        `).join("")}
      </div>
      <button class="program-select-button" type="button" data-apply-position="${program.id}">
        ${program.id === state.selectedApplicationRoleId ? "Selected for application" : `Select ${program.shortTitle}`}
      </button>
    </article>
  `).join("");

  document.querySelectorAll("[data-apply-position]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedApplicationRoleId = button.dataset.applyPosition;
      localStorage.setItem("produckSelectedApplicationRole", state.selectedApplicationRoleId);
      renderHiringPrograms();
      renderApplicationForSelectedPosition();
    });
  });
}

function renderCvUpload() {
  if (!state.cvUpload) {
    cvStatus.innerHTML = `
      <span>No CV uploaded yet</span>
      <p>Upload a PDF CV so the screening agent can attach a competency score to the application.</p>
    `;
    return;
  }
  cvStatus.innerHTML = `
    <span>${state.cvUpload.name}</span>
    <p>PDF received. Size: ${state.cvUpload.sizeLabel}. The agent will score it against the PM competency rubric after application.</p>
  `;
}

function renderMetrics() {
  const totals = activeHiringPositions.reduce((result, position) => ({
    applicants: result.applicants + position.applicants,
    screened: result.screened + position.screened,
    ready: result.ready + position.ready,
    interview: result.interview + position.interview,
    offers: result.offers + position.offer,
    review: result.review + position.humanReview,
    target: result.target + position.targetHires
  }), { applicants: 0, screened: 0, ready: 0, interview: 0, offers: 0, review: 0, target: 0 });
  const openPrograms = activeHiringPositions.filter((position) => getCampaignConfig(position).status === "OPEN").length;
  const unscreened = totals.applicants - totals.screened;
  const offerProgress = Math.round((totals.offers / Math.max(1, totals.target)) * 100);

  document.querySelector("#metricApplicants").textContent = formatNumber(totals.applicants);
  document.querySelector("#metricApplicantsInsight").textContent = `${openPrograms} open hiring programs`;
  document.querySelector("#metricTop").textContent = formatNumber(unscreened);
  document.querySelector("#metricTopInsight").textContent = `${Math.round((unscreened / totals.applicants) * 100)}% of active CVs`;
  document.querySelector("#metricAvg").textContent = formatNumber(totals.ready);
  document.querySelector("#metricAvgInsight").textContent = `${Math.round((totals.ready / totals.applicants) * 100)}% ready for interview`;
  document.querySelector("#metricInterview").textContent = formatNumber(totals.interview);
  document.querySelector("#metricInterviewInsight").textContent = "Interview evidence in progress";
  document.querySelector("#metricOffers").textContent = formatNumber(totals.offers);
  document.querySelector("#metricOffersInsight").textContent = `${offerProgress}% of ${totals.target} target hires`;
  document.querySelector("#metricReview").textContent = formatNumber(totals.review);
  document.querySelector("#metricReviewInsight").textContent = "Prioritize before SLA breach";
}

const hrAgentDefinitions = [
  {
    id: "cv-screening",
    name: "CV Screening Agent",
    purpose: "Scores CV evidence against the role competency rubric.",
    prompt: "Evaluate CV evidence against the selected role rubric. Return competency scores, evidence, risks, and missing proof.",
    source: "Candidate CV + role competency rubric"
  },
  {
    id: "assignment-evaluator",
    name: "Assignment Evaluator",
    purpose: "Audits the candidate's case response and evidence quality.",
    prompt: "Evaluate the assignment for problem framing, user evidence, prioritization, metrics, and execution clarity.",
    source: "Application assignment + evaluation rubric"
  },
  {
    id: "talent-readiness",
    name: "Talent Readiness Agent",
    purpose: "Combines core evidence and optional add-ons into the next action.",
    prompt: "Combine CV and assignment evidence with optional learning add-ons. Recommend Ready, Borderline, or Not Match with confidence and next action.",
    source: "CV result + assignment result + learning signals"
  },
  {
    id: "interview-probe",
    name: "Interview Evidence Probe Agent",
    purpose: "Prepares targeted questions after interview acceptance.",
    prompt: "Turn unresolved evidence gaps into fair behavioral questions, follow-ups, and a 1/3/5 evidence score guide.",
    source: "Accepted interview event + evidence gaps + risks"
  }
];

function getAgentConfig(definition) {
  return {
    ...definition,
    ...(state.agentConfigs[definition.id] || {})
  };
}

function renderAgentRegistry() {
  agentRegistry.innerHTML = hrAgentDefinitions.map((definition) => {
    const agent = getAgentConfig(definition);
    return `
      <article class="agent-admin-card">
        <div class="agent-admin-heading">
          <div>
            <p class="eyebrow">Active agent</p>
            <h3>${escapeHtml(agent.name)}</h3>
            <p>${escapeHtml(agent.purpose)}</p>
          </div>
          <span class="status-pill green">Active</span>
        </div>
        <label>
          <span>Agent prompt</span>
          <textarea rows="4" data-agent-prompt="${agent.id}">${escapeHtml(agent.prompt)}</textarea>
        </label>
        <label>
          <span>Data sources</span>
          <input type="text" data-agent-source="${agent.id}" value="${escapeHtml(agent.source)}">
        </label>
        <div class="agent-admin-actions">
          <small id="agentSaveStatus-${agent.id}">Last saved in this portal</small>
          <button class="crm-action-button" type="button" data-save-agent="${agent.id}">Save configuration</button>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-save-agent]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.saveAgent;
      state.agentConfigs[id] = {
        prompt: document.querySelector(`[data-agent-prompt="${id}"]`).value.trim(),
        source: document.querySelector(`[data-agent-source="${id}"]`).value.trim()
      };
      localStorage.setItem("produckAgentConfigs", JSON.stringify(state.agentConfigs));
      document.querySelector(`#agentSaveStatus-${id}`).textContent = "Saved just now";
    });
  });
}

function renderPositionCommand() {
  const position = getSelectedPosition();
  const totalApplicants = getTotalActiveApplicants();
  const screenedShare = Math.round((position.screened / position.applicants) * 100);
  const readyShare = Math.round((position.ready / position.applicants) * 100);
  const reviewShare = Math.round((position.humanReview / Math.max(1, position.screened)) * 100);
  const selectedCampaign = getCampaignConfig(position);

  selectedPositionTitle.textContent = position.title;
  selectedPositionSummary.textContent = `${formatNumber(position.applicants)} CVs for this role from a ${formatNumber(talentPoolSnapshot.totalStudents)}-student pool. ${formatNumber(totalApplicants)} total CVs are active across ${activeHiringPositions.length} positions.`;

  positionTabs.innerHTML = activeHiringPositions.map((item) => `
    <button class="position-tab ${item.id === state.activePositionId ? "active" : ""}" type="button" data-position="${item.id}">
      <strong>${item.shortTitle}</strong>
      <span>${formatNumber(item.applicants)} CVs</span>
    </button>
  `).join("");

  const positionQuery = state.positionSearch.trim().toLowerCase();
  const visiblePositions = activeHiringPositions
    .filter((item) => state.positionTypeFilter === "ALL" || item.type === state.positionTypeFilter)
    .filter((item) => `${item.title} ${item.shortTitle} ${item.type}`.toLowerCase().includes(positionQuery))
    .sort((a, b) => {
      if (state.positionSort === "ready-desc") return b.ready - a.ready;
      if (state.positionSort === "review-desc") return b.humanReview - a.humanReview;
      if (state.positionSort === "title-asc") return a.title.localeCompare(b.title);
      return b.applicants - a.applicants;
    });

  positionResultCount.textContent = visiblePositions.length;
  positionVolumeList.innerHTML = `
    <div class="crm-table-scroll">
      <table class="crm-table positions-table">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Type</th>
            <th scope="col">Campaign</th>
            <th scope="col">Promotion channels</th>
            <th scope="col" class="numeric">CVs</th>
            <th scope="col" class="numeric">Screened</th>
            <th scope="col" class="numeric">Ready</th>
            <th scope="col" class="numeric">Borderline</th>
            <th scope="col" class="numeric">Not match</th>
            <th scope="col" class="numeric">HR review</th>
            <th scope="col" class="numeric">Target hires</th>
            <th scope="col">SLA</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          ${visiblePositions.map((item) => {
            const screenedShare = Math.round((item.screened / Math.max(1, item.applicants)) * 100);
            return `
              <tr class="${item.id === state.activePositionId ? "active" : ""}">
                <td>
                  <button class="crm-primary-link" type="button" data-position="${item.id}">${escapeHtml(item.title)}</button>
                  <small>${screenedShare}% screened</small>
                </td>
                <td><span class="crm-type-tag">${escapeHtml(item.type)}</span></td>
                <td><span class="status-pill compact ${getCampaignConfig(item).status === "OPEN" ? "green" : "muted"}">${getCampaignConfig(item).status === "OPEN" ? "Open" : "Closed"}</span></td>
                <td>${escapeHtml(getCampaignConfig(item).channels.join(", "))}</td>
                <td class="numeric strong-cell">${formatNumber(item.applicants)}</td>
                <td class="numeric">${formatNumber(item.screened)}</td>
                <td class="numeric positive-cell">${formatNumber(item.ready)}</td>
                <td class="numeric warning-cell">${formatNumber(item.borderline)}</td>
                <td class="numeric danger-cell">${formatNumber(item.notMatch)}</td>
                <td class="numeric">${formatNumber(item.humanReview)}</td>
                <td class="numeric">${formatNumber(item.targetHires)}</td>
                <td><span class="status-pill compact ${item.slaHours <= 48 ? "green" : "yellow"}">${item.slaHours}h</span></td>
                <td><button class="crm-action-button" type="button" data-position="${item.id}">Open</button></td>
              </tr>
            `;
          }).join("") || `
            <tr><td class="crm-empty" colspan="13">No positions match the current filters.</td></tr>
          `}
        </tbody>
      </table>
    </div>
  `;

  campaignManager.innerHTML = `
    <div class="campaign-manager-heading">
      <div>
        <p class="eyebrow">Campaign controls</p>
        <h3>${escapeHtml(position.title)}</h3>
        <p>Target: ${formatNumber(position.targetHires)} hires · ${formatNumber(position.applicants)} CVs · ${position.slaHours}h SLA</p>
      </div>
      <button class="primary-button" type="button" data-toggle-campaign="${position.id}">
        ${selectedCampaign.status === "OPEN" ? "Close campaign" : "Open campaign"}
      </button>
    </div>
    <label>
      <span>Promotion channels</span>
      <input id="campaignChannels" type="text" value="${escapeHtml(selectedCampaign.channels.join(", "))}" placeholder="LinkedIn, Campus, Referral">
    </label>
    <div class="campaign-channel-actions">
      <small>Separate channels with commas.</small>
      <button class="crm-action-button" type="button" data-save-channels="${position.id}">Save channels</button>
    </div>
  `;

  workloadList.innerHTML = [
    { label: "Screened by agent", value: `${formatNumber(position.screened)} / ${screenedShare}%`, tone: "blue" },
    { label: "Ready for interview", value: `${formatNumber(position.ready)} / ${readyShare}%`, tone: "green" },
    { label: "Human review needed", value: `${formatNumber(position.humanReview)} / ${reviewShare}%`, tone: "red" },
    { label: "SLA target", value: `${position.slaHours}h`, tone: "yellow" }
  ].map((item) => `
    <div class="workload-row ${item.tone}">
      <span></span>
      <div>
        <strong>${item.value}</strong>
        <p>${item.label}</p>
      </div>
    </div>
  `).join("");

  document.querySelectorAll("[data-position]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePositionId = button.dataset.position;
      localStorage.setItem("produckActivePosition", state.activePositionId);
      state.candidates = getFilteredCandidates();
      state.selectedCandidateId = state.candidates[0]?.id;
      renderHr();
    });
  });

  document.querySelector(`[data-toggle-campaign="${position.id}"]`)?.addEventListener("click", () => {
    state.campaignConfig[position.id] = {
      ...selectedCampaign,
      status: selectedCampaign.status === "OPEN" ? "CLOSED" : "OPEN"
    };
    localStorage.setItem("produckCampaignConfig", JSON.stringify(state.campaignConfig));
    renderPositionCommand();
  });

  document.querySelector(`[data-save-channels="${position.id}"]`)?.addEventListener("click", () => {
    const channels = document.querySelector("#campaignChannels").value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    state.campaignConfig[position.id] = { ...selectedCampaign, channels };
    localStorage.setItem("produckCampaignConfig", JSON.stringify(state.campaignConfig));
    renderPositionCommand();
  });
}

function renderDecisionLanes() {
  const position = getSelectedPosition();
  const sampleNames = (status) => state.candidates
    .filter((candidate) => candidate.readinessDecision.status === status)
    .slice(0, 2)
    .map((candidate) => candidate.name)
    .join(", ");
  const lanes = [
    {
      status: "READY",
      label: "Ready",
      tone: "green",
      description: "Invite directly to interview",
      count: position.ready
    },
    {
      status: "BORDERLINE",
      label: "Borderline",
      tone: "yellow",
      description: "Recommend learning and rescore",
      count: position.borderline
    },
    {
      status: "NOT_MATCH",
      label: "Not match",
      tone: "red",
      description: "Human review before outcome",
      count: position.notMatch
    }
  ];

  decisionLanes.innerHTML = lanes.map((lane) => `
    <article class="decision-lane ${lane.tone}">
      <div>
        <span class="status-pill ${lane.tone}">${lane.label}</span>
        <strong>${formatNumber(lane.count)}</strong>
      </div>
      <p>${lane.description}</p>
      <small>${sampleNames(lane.status) || "Representative sample appears when a candidate matches this lane"}</small>
    </article>
  `).join("");
}

function getPotentialBuckets() {
  const position = getSelectedPosition();
  const buckets = [
    {
      id: "high",
      label: "Ready",
      description: "Invite directly to interview",
      tone: "green",
      count: position.ready
    },
    {
      id: "case",
      label: "Borderline",
      description: "More evidence needed",
      tone: "yellow",
      count: position.borderline
    },
    {
      id: "hold",
      label: "Not match",
      description: "HR review required",
      tone: "red",
      count: position.notMatch
    }
  ];
  return buckets;
}

function getWeeklyPipelineData() {
  const position = getSelectedPosition();
  const total = position.applicants;
  const qualified = position.ready + position.borderline;
  const highPotential = position.ready;
  const labels = ["W-5", "W-4", "W-3", "W-2", "W-1", "This week"];
  const startingTotal = Math.max(2, Math.round(total * 0.62));
  const startingQualified = Math.max(1, Math.round(qualified * 0.58));
  return labels.map((label, index) => {
    const progress = index / (labels.length - 1);
    const applicants = Math.round(startingTotal + (total - startingTotal) * progress);
    const qualifiedCount = Math.min(applicants, Math.round(startingQualified + (qualified - startingQualified) * progress));
    const highCount = Math.min(qualifiedCount, Math.max(0, Math.round(highPotential * progress)));
    return {
      label,
      applicants,
      qualified: qualifiedCount,
      highPotential: highCount
    };
  });
}

function getSourceQuality() {
  const position = getSelectedPosition();
  if (position.sourceMix?.length) {
    return position.sourceMix;
  }
  const groups = state.candidates.reduce((sourceMap, candidate) => {
    const source = candidate.source.split("+")[0].trim();
    if (!sourceMap[source]) {
      sourceMap[source] = [];
    }
    sourceMap[source].push(candidate);
    return sourceMap;
  }, {});
  return Object.entries(groups)
    .map(([source, candidates]) => {
      const avgScore = Math.round(candidates.reduce((sum, candidate) => sum + candidate.score, 0) / candidates.length);
      const ready = candidates.filter((candidate) => candidate.readinessDecision.status === "READY").length;
      return { source, applicants: candidates.length, avgScore, ready };
    })
    .sort((a, b) => b.avgScore - a.avgScore || b.ready - a.ready)
    .slice(0, 4);
}

function renderDashboard() {
  const position = getSelectedPosition();
  const weeklyData = getWeeklyPipelineData();
  const latest = weeklyData[weeklyData.length - 1];
  const previous = weeklyData[weeklyData.length - 2] || latest;
  const weeklyGrowth = previous.applicants
    ? Math.round(((latest.applicants - previous.applicants) / previous.applicants) * 100)
    : 0;
  const potentialBuckets = getPotentialBuckets();
  const activeCount = potentialBuckets[0].count + potentialBuckets[1].count;
  const readinessShare = Math.round((activeCount / position.applicants) * 100);
  dashboardHealth.textContent = readinessShare >= 65 ? "Strong hiring pool" : readinessShare >= 45 ? "Healthy funnel" : "Needs nurturing";
  dashboardHealth.className = `status-pill ${readinessShare >= 45 ? "" : "warn"}`;
  growthRate.textContent = `+${weeklyGrowth}%`;
  growthSummary.textContent = `${latest.applicants} scored candidates, ${latest.qualified} active for next action.`;
  potentialList.innerHTML = potentialBuckets.map((bucket) => {
    const share = Math.round((bucket.count / position.applicants) * 100);
    return `
      <div class="potential-row ${bucket.tone}">
        <div>
          <strong>${bucket.label}</strong>
          <span>${bucket.description}</span>
        </div>
        <div class="potential-meter" aria-label="${bucket.label} ${share}%">
          <span style="width: ${share}%"></span>
        </div>
        <b>${formatNumber(bucket.count)}</b>
      </div>
    `;
  }).join("");
  sourceQualityList.innerHTML = getSourceQuality().map((item) => `
    <div class="source-row">
      <div>
        <strong>${item.source}</strong>
        <span>${formatNumber(item.applicants)} candidate${item.applicants === 1 ? "" : "s"} / ${formatNumber(item.ready)} ready</span>
      </div>
      <b>${item.avgScore}</b>
    </div>
  `).join("");
  renderPipelineInsights(potentialBuckets, readinessShare);
  drawGrowthChart(weeklyData);
}

function renderPipelineInsights(potentialBuckets, readinessShare) {
  const topCandidate = state.candidates[0];
  const position = getSelectedPosition();
  const borderlineCount = potentialBuckets.find((bucket) => bucket.id === "case")?.count || 0;
  const reviewCount = potentialBuckets.find((bucket) => bucket.id === "hold")?.count || 0;
  const readyNames = state.candidates
    .filter((candidate) => candidate.readinessDecision.status === "READY")
    .slice(0, 2)
    .map((candidate) => candidate.name)
    .join(", ");
  const insights = [
    `${position.shortTitle} has ${formatNumber(position.applicants)} CVs, with ${readinessShare}% ready or close enough for an active next action.`,
    readyNames
      ? `Representative ready profiles: ${readyNames}. Send interview invitations and prepare interviewer packs after acceptance.`
      : "No ready representative profile in this sample; check aggregate lane before opening more profiles.",
    borderlineCount
      ? `${formatNumber(borderlineCount)} borderline candidate${borderlineCount === 1 ? "" : "s"} need learning or assignment evidence before rescore.`
      : "No borderline backlog; HR can focus on scheduling and review.",
    reviewCount
      ? `${formatNumber(reviewCount)} not-match candidate${reviewCount === 1 ? "" : "s"} require human review before an outcome message.`
      : "No not-match review debt in the current pool.",
    topCandidate
      ? `${topCandidate.name} is the strongest visible representative profile with ${topCandidate.score}/100 readiness.`
      : "No representative profile loaded for this position yet."
  ];
  pipelineInsights.innerHTML = insights.map((insight, index) => `
    <div class="insight-row">
      <span>${index + 1}</span>
      <p>${insight}</p>
    </div>
  `).join("");
}

function renderCandidateList() {
  candidateJobFilter.innerHTML = `
    <option value="ALL">All programs</option>
    ${activeHiringPositions.map((position) => `
      <option value="${position.id}" ${state.candidateJobFilter === position.id ? "selected" : ""}>${escapeHtml(position.title)}</option>
    `).join("")}
  `;
  const candidateQuery = state.candidateSearch.trim().toLowerCase();
  const visibleCandidates = state.allCandidates
    .filter((candidate) => state.candidateJobFilter === "ALL" || candidate.roleId === state.candidateJobFilter)
    .filter((candidate) => (
      state.candidateStatusFilter === "ALL"
      || candidate.readinessDecision.status === state.candidateStatusFilter
    ))
    .filter((candidate) => (
      `${candidate.name} ${candidate.school} ${candidate.source} ${candidate.stage}`
        .toLowerCase()
        .includes(candidateQuery)
    ))
    .sort((a, b) => {
      if (state.candidateSort === "assignment-desc") return b.assignmentAnalysis.score - a.assignmentAnalysis.score;
      if (state.candidateSort === "cv-desc") return b.cvAnalysis.overall - a.cvAnalysis.overall;
      if (state.candidateSort === "name-asc") return a.name.localeCompare(b.name);
      return b.score - a.score;
    });

  candidateResultCount.textContent = visibleCandidates.length;
  candidateList.innerHTML = `
    <div class="crm-table-scroll">
      <table class="crm-table candidates-table">
        <thead>
          <tr class="crm-group-header">
            <th scope="colgroup" colspan="4">General information</th>
            <th scope="colgroup" colspan="4">Score</th>
            <th scope="colgroup" colspan="2">Ranking status</th>
            <th scope="colgroup" colspan="2">Hiring process status</th>
            <th scope="colgroup" colspan="2">Next step</th>
          </tr>
          <tr>
            <th scope="col">Candidate</th>
            <th scope="col">Job</th>
            <th scope="col">School / current role</th>
            <th scope="col">Source</th>
            <th scope="col" class="numeric">CV match</th>
            <th scope="col" class="numeric">Assignment</th>
            <th scope="col" class="numeric">Add-on</th>
            <th scope="col" class="numeric">Overall</th>
            <th scope="col" class="numeric">Rank</th>
            <th scope="col">Readiness</th>
            <th scope="col">Stage</th>
            <th scope="col">AI evaluation</th>
            <th scope="col">Suggested action</th>
            <th scope="col">Review</th>
          </tr>
        </thead>
        <tbody>
          ${visibleCandidates.map((candidate, index) => {
            const aiStatus = candidate.assignmentAnalysis?.source === "workspace_agent_triggered"
              ? "Agent queued"
              : candidate.assignmentAnalysis?.source === "demo_fallback"
                ? "Demo scored"
                : candidate.aiAssessmentStatus || "Scored";
            return `
            <tr class="${candidate.id === state.selectedCandidateId ? "active" : ""}">
              <td>
                <button class="crm-primary-link" type="button" data-candidate="${candidate.id}">
                  ${escapeHtml(candidate.name)}
                </button>
                <small>Candidate ID ${escapeHtml(candidate.id.toUpperCase())}</small>
              </td>
              <td>${escapeHtml(getPositionById(candidate.roleId).shortTitle)}</td>
              <td>${escapeHtml(candidate.school)}</td>
              <td>${escapeHtml(candidate.source)}</td>
              <td class="numeric">${candidate.cvAnalysis.overall}</td>
              <td class="numeric">${candidate.assignmentAnalysis.score}</td>
              <td class="numeric positive-cell">+${candidate.leadProfile.learningAddOn.score}/10</td>
              <td class="numeric"><strong class="crm-score">${candidate.score}</strong></td>
              <td class="numeric"><strong class="crm-rank">#${index + 1}</strong></td>
              <td><span class="status-pill compact ${candidate.readinessDecision.tone}">${candidate.readinessDecision.label}</span></td>
              <td>
                <span class="crm-stage">${escapeHtml(getHiringProcessStatus(candidate))}</span>
                ${state.interviewQuestionPacks[candidate.id] ? "<small>Interviewer pack ready</small>" : ""}
              </td>
              <td><span class="crm-stage">${escapeHtml(aiStatus)}</span></td>
              <td class="next-action-cell">${escapeHtml(candidate.readinessDecision.nextAction)}</td>
              <td><button class="crm-action-button" type="button" data-candidate="${candidate.id}">Review</button></td>
            </tr>
          `;
          }).join("") || `
            <tr><td class="crm-empty" colspan="14">No candidates match the current filters.</td></tr>
          `}
        </tbody>
      </table>
    </div>
  `;

  document.querySelectorAll("[data-candidate]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCandidateId = button.dataset.candidate;
      renderHr();
    });
  });
}

function renderCandidateDetail() {
  const candidate = state.allCandidates.find((item) => item.id === state.selectedCandidateId) || state.allCandidates[0];
  if (!candidate) {
    candidateDetail.innerHTML = "<p>No candidates yet.</p>";
    return;
  }
  candidateDetail.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Candidate detail</p>
        <h2>${candidate.name}</h2>
        <p class="candidate-meta">${candidate.school} / ${candidate.source}</p>
      </div>
      <div class="detail-score">
        <strong>${candidate.score}</strong>
        <span>readiness</span>
      </div>
    </div>
    <div class="agent-decision-panel ${candidate.readinessDecision.tone}">
      <div class="agent-decision-header">
        <div>
          <p class="eyebrow">Talent Readiness Agent</p>
          <h3>${candidate.readinessDecision.label}: ${candidate.readinessDecision.nextAction}</h3>
        </div>
        <div class="decision-badges">
          <span class="status-pill ${candidate.readinessDecision.tone}">${candidate.readinessDecision.confidence} confidence</span>
          <span class="status-pill ${candidate.readinessDecision.humanReviewRequired ? "red" : "green"}">
            ${candidate.readinessDecision.humanReviewRequired ? "HR review required" : "OA ready"}
          </span>
        </div>
      </div>
      <p>${candidate.readinessDecision.summary}</p>
      <div class="missing-evidence">
        ${candidate.readinessDecision.missingEvidence.map((item) => `<span>${item}</span>`).join("") || "<span>No missing evidence for this decision.</span>"}
      </div>
    </div>
    <div class="hr-key-signals">
      <div class="signal"><strong>${candidate.cvAnalysis.overall}</strong><span>CV match</span></div>
      <div class="signal"><strong>${candidate.leadProfile.assignmentScore}</strong><span>Assignment</span></div>
      <div class="signal"><strong>${candidate.completion}%</strong><span>Learning add-on</span></div>
      <div class="signal"><strong>${candidate.quiz}</strong><span>Exam add-on</span></div>
    </div>
    ${renderInterviewHandoff(candidate)}
    <details class="assessment-audit">
      <summary>
        <span>Full assessment audit</span>
        <small>CV, assignment, and optional learning evidence</small>
      </summary>
      <div class="assessment-audit-body">
        <div class="audit-essentials">
          <article>
            <div class="audit-card-heading">
              <div>
                <p class="eyebrow">CV evidence</p>
                <h3>${candidate.cvAnalysis.overall}/100 match</h3>
              </div>
              <span class="status-pill ${candidate.cvAnalysis.overall >= 80 ? "green" : "yellow"}">${candidate.cvAnalysis.overall >= 80 ? "Strong" : "Review"}</span>
            </div>
            <p>${escapeHtml(candidate.cvAnalysis.extractedSummary)}</p>
            <div class="audit-evidence-list">
              ${[...candidate.cvAnalysis.competencyScores].sort((a, b) => b.score - a.score).slice(0, 3).map((item) => `
                <span><b>${escapeHtml(item.label)}</b>${item.score}</span>
              `).join("")}
            </div>
          </article>
          <article>
            <div class="audit-card-heading">
              <div>
                <p class="eyebrow">Assignment</p>
                <h3>${candidate.assignmentAnalysis.score}/100 evidence</h3>
              </div>
              <span class="status-pill ${candidate.assignmentAnalysis.score >= 80 ? "green" : "yellow"}">${candidate.assignmentAnalysis.score >= 80 ? "Strong" : "Needs proof"}</span>
            </div>
            <p>${escapeHtml(candidate.assignmentAnalysis.summary)}</p>
            <div class="audit-gap">
              <strong>Check in review</strong>
              <span>${escapeHtml(candidate.assignmentAnalysis.missingEvidence[0] || "No material assignment gap detected.")}</span>
            </div>
          </article>
          <article>
            <div class="audit-card-heading">
              <div>
                <p class="eyebrow">Optional add-on</p>
                <h3>+${candidate.leadProfile.learningAddOn.score}/10 ranking bonus</h3>
              </div>
              <span class="status-pill muted">Not a gate</span>
            </div>
            <div class="audit-addon-grid">
              <span><b>${candidate.leadProfile.learningAddOn.coursePoints}/4</b>Learning</span>
              <span><b>${candidate.leadProfile.learningAddOn.examPoints}/4</b>Exam</span>
              <span><b>${candidate.leadProfile.learningAddOn.certificatePoints}/2</b>Certificate</span>
            </div>
            <p>${candidate.completion}% course completion · ${candidate.quiz}/100 exam · ${candidate.engagement}/100 engagement</p>
          </article>
        </div>
    <div class="agent-pipeline-panel">
      <div class="panel-heading compact">
        <div>
          <p class="eyebrow">Agent handoff chain</p>
          <h3>Student signals -> Lead Profile -> CV + Assignment -> Readiness -> OA -> HR</h3>
        </div>
        <span class="status-pill ${candidate.readinessDecision.humanReviewRequired ? "red" : "green"}">
          ${candidate.readinessDecision.humanReviewRequired ? "Human checkpoint" : "Approval ready"}
        </span>
      </div>
      <div class="agent-pipeline-list">
        ${candidate.agentPipeline.map((step) => `
          <div class="agent-pipeline-step ${step.tone}">
            <span>${step.owner}</span>
            <div>
              <strong>${step.name}</strong>
              <p>${step.output}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="lead-profile-panel">
      <div class="panel-heading compact">
        <div>
          <p class="eyebrow">Lead profile</p>
          <h3>Evidence package read by the agent</h3>
        </div>
        <span class="status-pill muted">Learning + CV + assignment</span>
      </div>
      <div class="lead-profile-grid">
        ${candidate.leadProfile.signals.map((signal) => `
          <div class="lead-signal">
            <strong>${signal.value}</strong>
            <span>${signal.label}</span>
            <p>${signal.description}</p>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="signal-grid">
      <div class="signal"><strong>${candidate.completion}%</strong><span>Course completion</span></div>
      <div class="signal"><strong>${candidate.quiz}</strong><span>Quiz score</span></div>
      <div class="signal"><strong>${candidate.engagement}</strong><span>Engagement</span></div>
      <div class="signal"><strong>${candidate.leadProfile.assignmentScore}</strong><span>Assignment</span></div>
      <div class="signal"><strong>${candidate.cvAnalysis.overall}</strong><span>CV competency match</span></div>
      <div class="signal"><strong>${candidate.motivation}</strong><span>Motivation</span></div>
    </div>
    <div class="assignment-agent-panel">
      <div class="panel-heading compact">
        <div>
          <p class="eyebrow">PM CV Evaluator</p>
          <h3>${candidate.assignmentAnalysis.score}/100 case response</h3>
        </div>
        <div class="decision-badges">
          <span class="status-pill ${candidate.assignmentAnalysis.source === "workspace_agent_triggered" ? "green" : "yellow"}">
            ${candidate.assignmentAnalysis.source === "workspace_agent_triggered" ? "Workspace Agent triggered" : "Demo fallback"}
          </span>
          <span class="status-pill yellow">${candidate.assignmentAnalysis.missingEvidence.length ? "Needs evidence" : "Evidence rich"}</span>
        </div>
      </div>
      <p>${escapeHtml(candidate.assignmentAnalysis.summary)}</p>
      ${getAssignmentTriggerReceipt(candidate.assignmentAnalysis)}
      <div class="assignment-dimension-list">
        ${candidate.assignmentAnalysis.dimensions.map((dimension) => `
          <div class="assignment-dimension-row">
            <div>
              <strong>${escapeHtml(dimension.label)}</strong>
              <span>${dimension.matchedKeywords.length ? dimension.matchedKeywords.map(escapeHtml).join(", ") : "limited evidence"}</span>
            </div>
            <b>${dimension.score}</b>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="oa-preview-panel">
      <div>
        <p class="eyebrow">OA message draft</p>
        <h3>${candidate.readinessDecision.oaMessageTitle}</h3>
      </div>
      <p>${candidate.readinessDecision.oaMessage}</p>
    </div>
    <div class="timeline-panel">
      <h3>Status timeline</h3>
      <div class="timeline-list">
        ${candidate.timeline.map((event) => `
          <div class="timeline-event">
            <span>${event.actor}</span>
            <p>${event.label}</p>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="cv-agent-panel">
      <div class="panel-heading compact">
        <div>
          <p class="eyebrow">CV screening agent</p>
          <h3>${candidate.cvAnalysis.fileName}</h3>
        </div>
        <span class="status-pill">${candidate.cvAnalysis.overall}/100</span>
      </div>
      <p>${candidate.cvAnalysis.extractedSummary}</p>
      <div class="competency-list">
        ${candidate.cvAnalysis.competencyScores.map((competency) => `
          <div class="competency-row">
            <div>
              <strong>${competency.label}</strong>
              <span>${competency.matchedKeywords.length ? competency.matchedKeywords.join(", ") : "limited evidence"}</span>
            </div>
            <div class="competency-meter" aria-label="${competency.label} score ${competency.score}">
              <span style="width: ${competency.score}%"></span>
            </div>
            <b>${competency.score}</b>
          </div>
        `).join("")}
      </div>
      <div class="risk-list">
        ${candidate.cvAnalysis.riskFlags.map((risk) => `<p>${risk}</p>`).join("")}
      </div>
    </div>
    <h3>Why the agent assigned this status</h3>
    <ul class="reason-list">
      ${candidate.reasons.map((reason) => `<li>${reason}</li>`).join("")}
    </ul>
    <div class="agent-box">
      <strong>${candidate.recommendation.action}</strong>
      <p>${candidate.recommendation.message}</p>
    </div>
    <div class="logistics-box">
      <h3>Agent logistics plan</h3>
      ${candidate.recommendation.tasks.map((task, index) => `
        <div class="task-row">
          <span>${index + 1}</span>
          <p>${task}</p>
        </div>
      `).join("")}
    </div>
      </div>
    </details>
  `;

  const acceptInterviewButton = document.querySelector(`[data-accept-interview="${candidate.id}"]`);
  if (acceptInterviewButton) {
    acceptInterviewButton.addEventListener("click", async () => {
      acceptInterviewButton.disabled = true;
      acceptInterviewButton.textContent = "Preparing interviewer questions...";
      await acceptInterviewAndPrepareQuestions(candidate);
    });
  }
}

function drawSignalChart() {
  const canvas = document.querySelector("#signalCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const grid = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grid.addColorStop(0, "rgba(201, 150, 49, 0.14)");
  grid.addColorStop(1, "rgba(36, 95, 168, 0.12)");
  ctx.fillStyle = grid;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(18, 25, 24, 0.08)";
  ctx.lineWidth = 1;
  for (let y = 26; y < 86; y += 18) {
    ctx.beginPath();
    ctx.moveTo(18, y);
    ctx.lineTo(226, y);
    ctx.stroke();
  }
  const topFive = state.candidates.slice(0, 5);
  const barWidth = 30;
  topFive.forEach((candidate, index) => {
    const x = 22 + index * 42;
    const height = Math.round(candidate.score * 0.72);
    const bar = ctx.createLinearGradient(0, 84 - height, 0, 84);
    bar.addColorStop(0, index < 2 ? "#f0c15b" : "#4b82c6");
    bar.addColorStop(0.55, index < 2 ? "#16a269" : "#245fa8");
    bar.addColorStop(1, "#121918");
    ctx.fillStyle = bar;
    ctx.fillRect(x, 84 - height, barWidth, height);
    ctx.fillStyle = "#121918";
    ctx.font = "11px system-ui";
    ctx.fillText(String(candidate.score), x + 3, 94);
  });
  ctx.fillStyle = "#17201c";
  ctx.font = "12px system-ui";
  ctx.fillText("Top readiness scores", 22, 14);
}

function drawGrowthChart(weeklyData) {
  const canvas = document.querySelector("#growthCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const chartLeft = 46;
  const chartRight = width - 22;
  const chartTop = 26;
  const chartBottom = height - 38;
  const maxApplicants = Math.max(...weeklyData.map((item) => item.applicants), 1);
  ctx.clearRect(0, 0, width, height);

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "rgba(255, 243, 216, 0.86)");
  background.addColorStop(0.55, "rgba(228, 238, 251, 0.72)");
  background.addColorStop(1, "rgba(218, 246, 232, 0.72)");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(18, 25, 24, 0.1)";
  ctx.lineWidth = 1;
  for (let index = 0; index < 4; index += 1) {
    const y = chartTop + ((chartBottom - chartTop) / 3) * index;
    ctx.beginPath();
    ctx.moveTo(chartLeft, y);
    ctx.lineTo(chartRight, y);
    ctx.stroke();
  }

  const gap = (chartRight - chartLeft) / weeklyData.length;
  weeklyData.forEach((item, index) => {
    const x = chartLeft + index * gap + gap * 0.22;
    const barWidth = gap * 0.34;
    const applicantHeight = (item.applicants / maxApplicants) * (chartBottom - chartTop);
    const qualifiedHeight = (item.qualified / maxApplicants) * (chartBottom - chartTop);
    const applicantGradient = ctx.createLinearGradient(0, chartBottom - applicantHeight, 0, chartBottom);
    applicantGradient.addColorStop(0, "#c99631");
    applicantGradient.addColorStop(1, "#fff3d8");
    ctx.fillStyle = applicantGradient;
    ctx.fillRect(x, chartBottom - applicantHeight, barWidth, applicantHeight);
    ctx.fillStyle = "#16a269";
    ctx.fillRect(x + barWidth + 5, chartBottom - qualifiedHeight, barWidth, qualifiedHeight);
    ctx.fillStyle = "#68736f";
    ctx.font = "12px system-ui";
    ctx.fillText(item.label, x - 5, height - 14);
  });

  ctx.beginPath();
  weeklyData.forEach((item, index) => {
    const x = chartLeft + index * gap + gap * 0.56;
    const y = chartBottom - (item.highPotential / maxApplicants) * (chartBottom - chartTop);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = "#245fa8";
  ctx.lineWidth = 3;
  ctx.stroke();

  weeklyData.forEach((item, index) => {
    const x = chartLeft + index * gap + gap * 0.56;
    const y = chartBottom - (item.highPotential / maxApplicants) * (chartBottom - chartTop);
    ctx.fillStyle = "#245fa8";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#121918";
  ctx.font = "700 13px system-ui";
  ctx.fillText("Applicants", chartLeft, 16);
  ctx.fillStyle = "#16a269";
  ctx.fillText("Qualified", chartLeft + 88, 16);
  ctx.fillStyle = "#245fa8";
  ctx.fillText("Ready", chartLeft + 172, 16);
}

function renderHr() {
  loadCandidates();
  renderHrTabs();
  renderMetrics();
  renderAgentRegistry();
  renderPositionCommand();
  renderDecisionLanes();
  renderDashboard();
  renderCandidateList();
  renderCandidateDetail();
}

function renderHrTabs() {
  if (!hrTabIds.includes(state.activeHrTab)) {
    state.activeHrTab = "hrOverviewTab";
  }
  document.querySelectorAll(".hr-tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === state.activeHrTab);
  });
  document.querySelectorAll("[data-hr-tab]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.hrTab === state.activeHrTab);
  });
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === viewId);
  });
  if (viewId === "hrView") {
    renderHr();
  }
}

document.querySelectorAll(".nav-tab").forEach((tab) => {
  tab.addEventListener("click", () => switchView(tab.dataset.view));
});

document.querySelectorAll("[data-student-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    state.activeStudentTab = tab.dataset.studentTab;
    localStorage.setItem("produckStudentTab", state.activeStudentTab);
    renderStudentTabs();
  });
});

document.querySelectorAll("[data-hr-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    state.activeHrTab = tab.dataset.hrTab;
    localStorage.setItem("produckHrTab", state.activeHrTab);
    renderHrTabs();
  });
});

positionSearch.addEventListener("input", () => {
  state.positionSearch = positionSearch.value;
  renderPositionCommand();
});

positionTypeFilter.addEventListener("change", () => {
  state.positionTypeFilter = positionTypeFilter.value;
  renderPositionCommand();
});

positionSort.addEventListener("change", () => {
  state.positionSort = positionSort.value;
  renderPositionCommand();
});

candidateSearch.addEventListener("input", () => {
  state.candidateSearch = candidateSearch.value;
  renderCandidateList();
});

candidateJobFilter.addEventListener("change", () => {
  state.candidateJobFilter = candidateJobFilter.value;
  renderCandidateList();
});

candidateStatusFilter.addEventListener("change", () => {
  state.candidateStatusFilter = candidateStatusFilter.value;
  renderCandidateList();
});

candidateSort.addEventListener("change", () => {
  state.candidateSort = candidateSort.value;
  renderCandidateList();
});

cvInput.addEventListener("change", () => {
  const file = cvInput.files[0];
  if (!file) {
    state.cvUpload = null;
    localStorage.removeItem("produckCvUpload");
    renderCvUpload();
    return;
  }
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    state.cvUpload = null;
    localStorage.removeItem("produckCvUpload");
    cvInput.value = "";
    cvStatus.innerHTML = `
      <span>PDF required</span>
      <p>Please choose a PDF CV file for the demo application.</p>
    `;
    return;
  }
  state.cvUpload = {
    name: file.name,
    size: file.size,
    sizeLabel: `${Math.max(1, Math.round(file.size / 1024))} KB`,
    uploadedAt: new Date().toISOString()
  };
  localStorage.setItem("produckCvUpload", JSON.stringify(state.cvUpload));
  renderCvUpload();
});

useSampleCv.addEventListener("click", () => {
  state.cvUpload = {
    name: "linh-nguyen-product-manager-cv.pdf",
    size: 144000,
    sizeLabel: "141 KB",
    uploadedAt: new Date().toISOString()
  };
  localStorage.setItem("produckCvUpload", JSON.stringify(state.cvUpload));
  renderCvUpload();
});

applicationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.cvUpload) {
    applicationMessage.textContent = "Upload a PDF CV or use the demo CV. Learning and certificate progress are optional.";
    return;
  }
  applyButton.disabled = true;
  applyButton.textContent = "Sending to AI Agent...";
  const formData = new FormData(applicationForm);
  const applicant = buildCandidateFromForm(formData);
  const savedApplicants = JSON.parse(localStorage.getItem("produckApplicants") || "[]");
  localStorage.setItem("produckApplicants", JSON.stringify([applicant, ...savedApplicants]));
  state.activePositionId = applicant.roleId;
  localStorage.setItem("produckActivePosition", state.activePositionId);
  state.selectedCandidateId = applicant.id;
  loadCandidates();
  const enrichedApplicant = state.allCandidates.find((candidate) => candidate.id === applicant.id);
  saveProvisionalAssessment(enrichedApplicant || applicant);

  try {
    await runLiveAssignmentEvaluation(enrichedApplicant || applicant);
    applicationMessage.textContent = `Application sent to ${applicant.targetRole}. The AI Agent was triggered and a structured row was added to HR.`;
  } catch (error) {
    applicationMessage.textContent = `Application sent to ${applicant.targetRole}. A structured demo assessment was added to HR while the live Agent is unavailable.`;
  } finally {
    loadCandidates();
    state.selectedCandidateId = applicant.id;
    state.activeHrTab = "hrReviewTab";
    localStorage.setItem("produckHrTab", state.activeHrTab);
    applyButton.disabled = false;
    renderStudent();
    switchView("hrView");
  }
});

document.querySelector("#runAgent").addEventListener("click", async () => {
  const runAgentButton = document.querySelector("#runAgent");
  runAgentButton.disabled = true;
  runAgentButton.textContent = "Evaluating...";
  agentMode.textContent = "Triggering Workspace Agent";
  agentMode.className = "status-pill blue";

  try {
    await runLiveAssignmentEvaluation();
    agentMode.textContent = "Workspace Agent triggered";
    agentMode.className = "status-pill green";
  } catch (error) {
    agentMode.textContent = "Demo fallback active";
    agentMode.className = "status-pill warn";
    state.candidates = enrichCandidates(state.candidates.map((candidate) => ({
      ...candidate,
      engagement: Math.min(100, candidate.engagement + (candidate.completion === 100 ? 3 : 1))
    })));
  } finally {
    runAgentButton.disabled = false;
    runAgentButton.textContent = "Run AI Agent";
    renderHr();
  }
});

document.querySelector("#resetDemo").addEventListener("click", () => {
  localStorage.removeItem("produckLessons");
  localStorage.removeItem("produckModuleQuizResults");
  localStorage.removeItem("produckQuizScore");
  localStorage.removeItem("produckApplicant");
  localStorage.removeItem("produckApplicants");
  localStorage.removeItem("produckCvUpload");
  localStorage.removeItem("produckAssignmentEvaluations");
  localStorage.removeItem("produckInterviewAccepted");
  localStorage.removeItem("produckInterviewQuestionPacks");
  localStorage.removeItem("produckSelectedLesson");
  localStorage.removeItem("produckStudentTab");
  localStorage.removeItem("produckActivePosition");
  localStorage.removeItem("produckSelectedApplicationRole");
  localStorage.removeItem("produckHrTab");
  state.completedLessons = new Set();
  state.moduleQuizResults = {};
  state.quizScore = 0;
  state.cvUpload = null;
  state.assignmentEvaluations = {};
  state.interviewAcceptedIds = new Set();
  state.interviewQuestionPacks = {};
  state.activePositionId = "pmt";
  state.selectedApplicationRoleId = "pmt";
  state.activeHrTab = "hrOverviewTab";
  state.selectedLessonId = lessons[0].id;
  state.activeStudentTab = "learningTab";
  state.selectedCandidateId = "mai";
  cvInput.value = "";
  applicationMessage.textContent = "";
  renderStudent();
  renderHr();
});

loadCandidates();
renderStudent();
renderHr();
