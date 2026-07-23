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
      }
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
