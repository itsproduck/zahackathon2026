# Produck

Produck is a hackathon demo for in-house Talent Acquisition and HR teams that need to manage large candidate funnels.

The product creates an early talent funnel before candidates apply. Students complete a free Product course, pass a short readiness check, earn a certificate, then apply to a trainee program. HR sees a ranked shortlist where an AI Agent explains why each candidate should move to interview, case test, nurture, or hold.

## What the Product Does

- Lets a demo student complete Product course lessons.
- Shows a clearer student funnel with subtabs for learning, certificates, and hiring programs.
- Shows clickable course modules that change the lesson content, mini case, and mini quiz.
- Unlocks a short readiness quiz and certificate state.
- Shows multiple certificate tracks in a certificate wallet.
- Previews both trainee programs and full-time Product roles.
- Lets the student upload a CV as a PDF before applying.
- Lets the student apply to a Product Trainee program.
- Shows HR a ranked candidate queue with realistic sample candidates.
- Explains each ranking using learning behavior, quiz score, CV competency match, and motivation.
- Shows how the CV screening agent scores candidates against a Product Manager competency rubric.
- Works in demo mode without external services.

## How the System Works

This first prototype is intentionally simple:

- `index.html` contains the app structure.
- `styles.css` contains the visual design and responsive layout.
- `course-content.js` contains editable course modules.
- `competency-rubric.js` contains the editable Product Manager competency rubric.
- `app.js` contains the sample data, course progress, application flow, CV scoring agent, ranking logic, and mock AI Agent recommendations.
- Browser storage keeps the demo student's progress on the same machine.

There is no real login, database, or email sending yet. Those are intentionally left out to keep the hackathon demo reliable.

## How to Edit Course Content

Open `course-content.js` and edit:

- Course title
- Module titles
- Module summaries
- Preview content
- Quiz question and answer options

The app reads this file automatically.

## How to Edit the Competency Rubric

Open `competency-rubric.js` and edit:

- Competency names
- Weights
- Keywords
- Descriptions

When you provide your real Product Manager competency framework, place it here so the CV screening agent scores candidates against your criteria.

## How to Start It

Open `index.html` in a browser.

No install step is required.

## Required Accounts and API Keys

None for the current prototype.

An OpenAI API key may be added later if we want live AI-generated ranking explanations. The app currently uses mock AI Agent logic so the demo works even without an API key.

## Environment Variables

Copy `.env.example` to `.env` only when we add live API behavior later.

Never place a real API key directly in source code.

## How to Run the Demo

1. Start in `Student funnel`.
2. Use `Learning and exam` to click course modules, read the mini case, and answer a mini quiz.
3. Use `Assessment and certificates` to pass the readiness exam and show the certificate wallet.
4. Use `Hiring programs` to preview trainee and full-time roles.
5. Upload a PDF CV or click `Use demo CV`.
6. Apply to the Product Trainee program.
7. The app switches to `HR command room`.
8. Show the ranked candidate queue.
9. Open the live demo candidate and explain the CV screening agent, competency scores, and recruiting recommendation.
10. Click `Run AI Agent` to show the system can refresh the shortlist.

## Known Limitations

- Candidate ranking is deterministic mock logic, not a live model call yet.
- No real authentication or user accounts.
- No real database.
- PDF upload is real, but PDF text extraction is simulated in the browser-only prototype.
- No email, calendar, or interview scheduling integration.
- The certificate is a visible state in the app, not a generated PDF.

## Hackathon Materials

- `DEPLOYMENT.md`: how to deploy later.
- `TESTING.md`: final test checklist.
- `DEMO_SCRIPT.md`: 3-minute presentation script.
- `ARCHITECTURE.md`: short system explanation.
- `JUDGE_QA.md`: likely judge questions and answers.
