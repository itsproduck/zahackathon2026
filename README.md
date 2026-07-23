# Produck

Produck is a hackathon demo for in-house Talent Acquisition and HR teams that need to manage large candidate funnels.

The product creates an early talent funnel before candidates apply. Students complete a free Product course, pass a short readiness check, earn a certificate, then apply to a trainee program. HR sees a ranked shortlist where an AI Agent explains why each candidate should move to interview, case test, nurture, or hold.

## What the Product Does

- Lets a demo student complete Product course lessons.
- Unlocks a short readiness quiz and certificate state.
- Lets the student apply to a Product Trainee program.
- Shows HR a ranked candidate queue with realistic sample candidates.
- Explains each ranking using learning behavior, quiz score, CV strength, and motivation.
- Works in demo mode without external services.

## How the System Works

This first prototype is intentionally simple:

- `index.html` contains the app structure.
- `styles.css` contains the visual design and responsive layout.
- `app.js` contains the sample data, course progress, application flow, ranking logic, and mock AI Agent recommendations.
- Browser storage keeps the demo student's progress on the same machine.

There is no real login, database, email sending, or CV upload yet. Those are intentionally left out to keep the hackathon demo reliable.

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
2. Complete the three course lessons.
3. Answer the readiness check.
4. Apply to the Product Trainee program.
5. The app switches to `HR command room`.
6. Show the ranked candidate queue.
7. Open the live demo candidate and explain the agent recommendation.
8. Click `Run AI Agent` to show the system can refresh the shortlist.

## Known Limitations

- Candidate ranking is deterministic mock logic, not a live model call yet.
- No real authentication or user accounts.
- No real database.
- No real CV file parsing.
- No email, calendar, or interview scheduling integration.
- The certificate is a visible state in the app, not a generated PDF.

## Hackathon Materials

- `DEPLOYMENT.md`: how to deploy later.
- `TESTING.md`: final test checklist.
- `DEMO_SCRIPT.md`: 3-minute presentation script.
- `ARCHITECTURE.md`: short system explanation.
- `JUDGE_QA.md`: likely judge questions and answers.
