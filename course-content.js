const courseContent = {
  title: "Product Management Foundations",
  subtitle: "A beginner-friendly path for Product trainee candidates.",
  certificateName: "Product Discovery Readiness Certificate",
  modules: [
    {
      id: "pm-preview",
      title: "What does a Product Manager do?",
      summary: "Preview the daily work of a PM and why the role connects customer needs, business goals, and delivery.",
      duration: "8 min",
      preview: {
        headline: "A Product Manager turns uncertainty into clear product decisions.",
        body: "PMs listen to customers, define the real problem, align business goals, prioritize what matters, and help design, engineering, sales, and leadership move in the same direction.",
        bullets: [
          "Understand customer pain before choosing a solution.",
          "Translate messy feedback into a product problem statement.",
          "Prioritize by user value, business impact, and confidence.",
          "Run small experiments before asking teams to build big features."
        ],
        example: "If users say checkout is slow, a PM does not only ask engineering to make the page faster. They first check where users drop, what causes confusion, and which fix creates the most business value."
      },
      miniCase: {
        prompt: "A campus food delivery app has many signups but few first orders. What should a PM investigate first?",
        answer: "Find the biggest drop-off point in the first-order journey, then interview users who signed up but did not order."
      },
      miniQuiz: {
        question: "What is the PM's first job in this situation?",
        options: [
          { label: "Ask engineering to rebuild checkout", correct: false },
          { label: "Understand the user problem and drop-off point", correct: true },
          { label: "Launch a discount campaign immediately", correct: false }
        ]
      }
    },
    {
      id: "customer-problem",
      title: "Find the real customer problem",
      summary: "Turn vague feedback into a clear product problem statement.",
      duration: "10 min",
      preview: {
        headline: "Strong PMs fall in love with the problem, not the first solution.",
        body: "This module teaches candidates to separate symptoms, root causes, user segments, and measurable outcomes.",
        bullets: [
          "Identify who has the problem.",
          "Describe when and why the problem happens.",
          "Avoid solution-first thinking.",
          "Write a concise problem statement."
        ],
        example: "Instead of 'build a reminder feature,' write 'new users forget to finish onboarding because the value is unclear after signup.'"
      },
      miniCase: {
        prompt: "Students say they want 'better course recommendations.' The team wants to build AI search. What should the PM clarify?",
        answer: "Clarify who struggles, when recommendations fail, and what successful recommendations should improve."
      },
      miniQuiz: {
        question: "Which problem statement is strongest?",
        options: [
          { label: "Build an AI recommendation engine", correct: false },
          { label: "Students cannot find relevant beginner courses after signup", correct: true },
          { label: "The homepage looks old", correct: false }
        ]
      }
    },
    {
      id: "prioritization",
      title: "Prioritize the market opportunity",
      summary: "Compare reach, pain level, and business value before choosing what to build.",
      duration: "12 min",
      preview: {
        headline: "Prioritization is choosing the best trade-off with limited time.",
        body: "Candidates learn how to compare possible features using impact, effort, confidence, and strategic fit.",
        bullets: [
          "Estimate user and business impact.",
          "Check confidence level before committing.",
          "Compare effort with expected value.",
          "Communicate why one option wins."
        ],
        example: "A lower-effort onboarding improvement may beat a large loyalty feature if it improves activation for every new user."
      },
      miniCase: {
        prompt: "You can improve onboarding, build badges, or launch referrals. The goal is activation. Which should be tested first?",
        answer: "Onboarding, because it touches every new user and directly affects activation."
      },
      miniQuiz: {
        question: "Which signal matters most for prioritization?",
        options: [
          { label: "Highest user and business impact with reasonable effort", correct: true },
          { label: "The feature requested by the loudest user", correct: false },
          { label: "The idea with the nicest UI", correct: false }
        ]
      }
    },
    {
      id: "experiment",
      title: "Design a fast product experiment",
      summary: "Use a lightweight test to reduce risk before investing engineering time.",
      duration: "9 min",
      preview: {
        headline: "Experiments help PMs learn before teams spend too much.",
        body: "This module shows candidates how to test demand, usability, and value using small experiments.",
        bullets: [
          "Define the riskiest assumption.",
          "Choose a fast test method.",
          "Set a success metric.",
          "Decide what action follows the result."
        ],
        example: "Before building a full mentor marketplace, test demand with a landing page and interview the first 20 signups."
      },
      miniCase: {
        prompt: "The team wants to build a mentor marketplace for students. What is a fast demand test?",
        answer: "Create a landing page, collect signups, interview interested students, and measure real conversion."
      },
      miniQuiz: {
        question: "What should a PM define before running an experiment?",
        options: [
          { label: "A success metric and next decision", correct: true },
          { label: "A complete product roadmap", correct: false },
          { label: "A perfect logo", correct: false }
        ]
      }
    }
  ],
  certificates: [
    {
      id: "discovery",
      title: "Product Discovery Readiness",
      issuer: "Produck Academy",
      requirement: "Complete all lessons and pass the readiness exam.",
      status: "available"
    },
    {
      id: "prioritization",
      title: "Product Prioritization Basics",
      issuer: "Produck Academy",
      requirement: "Complete prioritization module and answer its mini quiz.",
      status: "progress"
    },
    {
      id: "experiment",
      title: "Experiment Design Starter",
      issuer: "Produck Academy",
      requirement: "Complete experiment module and submit one mini case answer.",
      status: "progress"
    }
  ],
  hiringPrograms: [
    {
      id: "trainee",
      type: "Trainee program",
      title: "Product Management Trainee 2026",
      company: "Produck Demo Company",
      timeline: "8-week selection program",
      location: "Ho Chi Minh City / Hybrid",
      description: "For high-potential students and fresh graduates. Learning signals can strengthen ranking but are not required to apply.",
      steps: ["Apply with CV", "AI CV + add-on review", "Product case test", "Panel interview", "Offer"]
    },
    {
      id: "fulltime",
      type: "Full-time position",
      title: "Associate Product Manager",
      company: "Produck Demo Company",
      timeline: "Full-time role",
      location: "Ho Chi Minh City",
      description: "For candidates ready to join a product squad and own discovery, prioritization, and experiment work with a senior PM.",
      steps: ["Submit CV", "Portfolio or case review", "Hiring manager interview", "Team fit interview", "Offer"]
    }
  ],
  quiz: {
    question: "Which signal should HR trust most for trainee hiring?",
    options: [
      { label: "CV keyword match only", score: 65 },
      { label: "CV plus learning behavior and assessment results", score: 92 },
      { label: "Who applied first", score: 70 }
    ]
  }
};
