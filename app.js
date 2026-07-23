const lessons = [
  {
    id: "problem",
    title: "Find the real customer problem",
    summary: "Turn vague feedback into a clear product problem statement."
  },
  {
    id: "market",
    title: "Prioritize the market opportunity",
    summary: "Compare reach, pain level, and business value before choosing what to build."
  },
  {
    id: "experiment",
    title: "Design a fast product experiment",
    summary: "Use a lightweight test to reduce risk before investing engineering time."
  }
];

const baseCandidates = [
  {
    id: "mai",
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
  }
];

const state = {
  completedLessons: new Set(JSON.parse(localStorage.getItem("produckLessons") || "[]")),
  quizScore: Number(localStorage.getItem("produckQuizScore") || 0),
  selectedCandidateId: "mai",
  candidates: []
};

const lessonList = document.querySelector("#lessonList");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const certificateBadge = document.querySelector("#certificateBadge");
const quizBox = document.querySelector("#quizBox");
const applyButton = document.querySelector("#applyButton");
const applicationForm = document.querySelector("#applicationForm");
const applicationMessage = document.querySelector("#applicationMessage");
const candidateList = document.querySelector("#candidateList");
const candidateDetail = document.querySelector("#candidateDetail");
const agentMode = document.querySelector("#agentMode");

function scoreCandidate(candidate) {
  return Math.round(
    candidate.completion * 0.24 +
      candidate.quiz * 0.24 +
      candidate.engagement * 0.2 +
      candidate.cv * 0.18 +
      candidate.motivation * 0.14
  );
}

function getRecommendation(candidate) {
  const score = candidate.score || scoreCandidate(candidate);
  if (score >= 88) {
    return {
      action: "Fast-track to interview",
      tone: "green",
      message: "This candidate has strong learning signals and a strong application. Invite them to a structured interview within 48 hours.",
      tasks: ["Reserve interview slot", "Send interview brief", "Notify hiring manager"]
    };
  }
  if (score >= 78) {
    return {
      action: "Send case test",
      tone: "blue",
      message: "The candidate looks promising. Send a short product case test to validate problem-solving depth.",
      tasks: ["Send product case test", "Set 72-hour deadline", "Rescore after submission"]
    };
  }
  if (candidate.completion < 100) {
    return {
      action: "Nurture to finish certificate",
      tone: "yellow",
      message: "Do not reject yet. Ask the candidate to complete the course, then rescore with stronger learning data.",
      tasks: ["Send course reminder", "Highlight missing lesson", "Reopen application after certificate"]
    };
  }
  return {
    action: "Hold for later campaign",
    tone: "red",
    message: "Current signals are below the shortlist threshold. Keep them warm for a future role or learning path.",
    tasks: ["Move to talent pool", "Send polite update", "Recommend next learning path"]
  };
}

function enrichCandidates(candidates) {
  return candidates
    .map((candidate) => {
      const score = scoreCandidate(candidate);
      const recommendation = getRecommendation({ ...candidate, score });
      const reasons = [
        `${candidate.completion}% course completion gives HR a behavioral signal beyond the CV.`,
        `${candidate.quiz}/100 assessment score shows product fundamentals.`,
        `${candidate.engagement}/100 engagement score shows consistency inside the funnel.`
      ];
      return { ...candidate, score, recommendation, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

function buildCandidateFromForm(formData) {
  const completion = Math.round((state.completedLessons.size / lessons.length) * 100);
  const motivationText = String(formData.get("candidateMotivation") || "");
  const motivation = Math.min(96, 70 + Math.floor(motivationText.length / 12));
  return {
    id: "demo-applicant",
    name: String(formData.get("candidateName")),
    source: "Free course completion",
    school: String(formData.get("candidateSchool")),
    completion,
    quiz: state.quizScore,
    engagement: 87,
    cv: 74,
    motivation,
    stage: "New",
    notes: "Live demo applicant created from the student journey."
  };
}

function loadCandidates() {
  const savedApplicant = localStorage.getItem("produckApplicant");
  const liveCandidate = savedApplicant ? [JSON.parse(savedApplicant)] : [];
  state.candidates = enrichCandidates([...liveCandidate, ...baseCandidates]);
  if (!state.candidates.some((candidate) => candidate.id === state.selectedCandidateId)) {
    state.selectedCandidateId = state.candidates[0]?.id;
  }
}

function renderLessons() {
  lessonList.innerHTML = lessons
    .map((lesson, index) => {
      const done = state.completedLessons.has(lesson.id);
      return `
        <article class="lesson-card ${done ? "done" : ""}">
          <div class="lesson-number">${done ? "OK" : String(index + 1).padStart(2, "0")}</div>
          <div>
            <h3>${lesson.title}</h3>
            <p>${lesson.summary}</p>
          </div>
          <button class="lesson-action" type="button" data-lesson="${lesson.id}">
            ${done ? "Completed" : "Complete"}
          </button>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      state.completedLessons.add(button.dataset.lesson);
      localStorage.setItem("produckLessons", JSON.stringify([...state.completedLessons]));
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
  certificateBadge.textContent = certificateUnlocked ? "Certificate earned" : "Certificate locked";
  certificateBadge.className = `status-pill ${certificateUnlocked ? "" : "muted"}`;
  applyButton.disabled = !certificateUnlocked;
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
      <p>The certificate signal is now available for the recruitment application.</p>
    `;
    return;
  }

  quizBox.innerHTML = `
    <h3>Which signal should HR trust most for trainee hiring?</h3>
    <p>Choose the answer that best matches Produck's approach.</p>
    <div class="quiz-options">
      <button type="button" data-score="65">CV keyword match only</button>
      <button type="button" data-score="92">CV plus learning behavior and assessment results</button>
      <button type="button" data-score="70">Who applied first</button>
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
  renderLessons();
  renderProgress();
  renderQuiz();
}

function renderMetrics() {
  const total = state.candidates.length;
  const interviewReady = state.candidates.filter((candidate) => candidate.score >= 88).length;
  const avg = Math.round(state.candidates.reduce((sum, candidate) => sum + candidate.score, 0) / total);
  document.querySelector("#metricApplicants").textContent = String(total);
  document.querySelector("#metricTop").textContent = String(interviewReady);
  document.querySelector("#metricAvg").textContent = String(avg);
  drawSignalChart();
}

function renderCandidateList() {
  candidateList.innerHTML = state.candidates
    .map((candidate, index) => `
      <button class="candidate-row ${candidate.id === state.selectedCandidateId ? "active" : ""}" type="button" data-candidate="${candidate.id}">
        <div>
          <div class="candidate-name">#${index + 1} ${candidate.name}</div>
          <div class="candidate-meta">${candidate.school}<br>${candidate.recommendation.action}</div>
        </div>
        <div class="score-badge">${candidate.score}</div>
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-candidate]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCandidateId = button.dataset.candidate;
      renderHr();
    });
  });
}

function renderCandidateDetail() {
  const candidate = state.candidates.find((item) => item.id === state.selectedCandidateId) || state.candidates[0];
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
    <div class="signal-grid">
      <div class="signal"><strong>${candidate.completion}%</strong><span>Course completion</span></div>
      <div class="signal"><strong>${candidate.quiz}</strong><span>Quiz score</span></div>
      <div class="signal"><strong>${candidate.engagement}</strong><span>Engagement</span></div>
      <div class="signal"><strong>${candidate.cv}</strong><span>CV strength</span></div>
    </div>
    <h3>Why the agent ranked this candidate</h3>
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
  `;
}

function drawSignalChart() {
  const canvas = document.querySelector("#signalCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const topFive = state.candidates.slice(0, 5);
  const barWidth = 30;
  topFive.forEach((candidate, index) => {
    const x = 22 + index * 42;
    const height = Math.round(candidate.score * 0.72);
    ctx.fillStyle = index < 2 ? "#1f8f5f" : "#315f9f";
    ctx.fillRect(x, 84 - height, barWidth, height);
    ctx.fillStyle = "#66736d";
    ctx.font = "11px system-ui";
    ctx.fillText(String(candidate.score), x + 3, 94);
  });
  ctx.fillStyle = "#17201c";
  ctx.font = "12px system-ui";
  ctx.fillText("Top readiness scores", 22, 14);
}

function renderHr() {
  loadCandidates();
  renderMetrics();
  renderCandidateList();
  renderCandidateDetail();
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

applicationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(applicationForm);
  const applicant = buildCandidateFromForm(formData);
  localStorage.setItem("produckApplicant", JSON.stringify(applicant));
  state.selectedCandidateId = applicant.id;
  applicationMessage.textContent = "Application sent. HR can now see this candidate in the ranked queue.";
  loadCandidates();
  setTimeout(() => switchView("hrView"), 700);
});

document.querySelector("#runAgent").addEventListener("click", () => {
  agentMode.textContent = "Mock agent updated";
  agentMode.className = "status-pill warn";
  state.candidates = enrichCandidates(state.candidates.map((candidate) => ({
    ...candidate,
    engagement: Math.min(100, candidate.engagement + (candidate.completion === 100 ? 3 : 1))
  })));
  renderHr();
});

document.querySelector("#resetDemo").addEventListener("click", () => {
  localStorage.removeItem("produckLessons");
  localStorage.removeItem("produckQuizScore");
  localStorage.removeItem("produckApplicant");
  state.completedLessons = new Set();
  state.quizScore = 0;
  state.selectedCandidateId = "mai";
  applicationMessage.textContent = "";
  renderStudent();
  renderHr();
});

loadCandidates();
renderStudent();
renderHr();
