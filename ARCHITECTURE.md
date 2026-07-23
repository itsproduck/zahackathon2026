# Architecture

## Simple Explanation

Produck is currently one small web app with an optional backend endpoint. It uses built-in sample data and browser storage, so static demo mode still works without accounts, databases, or paid services.

## Current Prototype

- `index.html`: app layout.
- `styles.css`: visual design and mobile layout.
- `course-content.js`: editable course modules and quiz content.
- `competency-rubric.js`: editable Product Manager competency rubric.
- `app.js`: course flow, PDF upload state, aggregate hiring volumes, active position filters, CV screening agent, application flow, Lead Profile generation, sample candidates, readiness classification, OA message drafts, and mock AI Agent actions.
- `api/evaluate-assignment.mjs`: private PM CV Evaluator endpoint.
- `api/assignment-evaluation-core.mjs`: Workspace Agent trigger request, candidate-package formatting, and trigger error handling.
- `server.mjs`: local static server plus API route for the live demo.
- Browser storage: remembers demo progress and the submitted demo applicant.

## Large Funnel Dashboard

The HR dashboard separates aggregate volume from representative profiles.

- Aggregate counts show a 30,000-student talent pool.
- Product Management Trainee shows 4,000 CVs.
- Product Manager shows 20 CVs.
- Other active hiring positions show their own applicant volumes, target hires, readiness lanes, and agent workload.

The app renders a small representative queue for demo speed, while the dashboard metrics describe the full hiring operation.

## Readiness Logic

Each candidate receives a readiness score from six signals:

- Course completion
- Quiz score
- Engagement
- Assignment score
- CV competency match
- Motivation

The Talent Readiness Agent then classifies the candidate into:

- Ready: advance to offline test.
- Borderline: send learning path and rescore later.
- Not Match: require HR review before sending an outcome.

## CV Screening Agent

The current demo includes a local CV screening agent. It checks the uploaded PDF file state and scores the candidate against the Product Manager competency rubric in `competency-rubric.js`.

The current browser-only prototype does not extract real PDF text yet. It simulates extraction from demo evidence so the scoring workflow is visible and reliable during the hackathon.

For a production version, PDF parsing and AI scoring should happen in a private backend so candidate CVs and credentials are handled securely.

The mock agent uses the score, missing evidence, and CV risks to prepare a next action, OA message draft, and status timeline. AI recommendations do not make the final rejection decision.

## PM CV Evaluator

The PM CV Evaluator is the first agent with a live backend path.

- Static mode: `app.js` scores the assignment locally with deterministic rubric logic.
- Live mode: `Run AI Agent` posts the selected candidate's assignment package to `/api/evaluate-assignment`.
- The endpoint triggers a published ChatGPT Workspace Agent through its API channel.
- The trigger API returns `202 Accepted` when the run is queued; it does not currently return the agent's scored result back to the app.
- The browser caches the accepted trigger event by candidate and answer, then keeps the deterministic assignment score visible until a result-return path is added.
- If the endpoint is unavailable or Workspace Agent credentials are missing, the app keeps the deterministic fallback so the demo still runs.

## Future Production Version

A production system would likely add:

- User accounts
- Database
- CV upload and parsing
- Private backend for AI agent calls and result storage
- Email and calendar integrations
- Admin controls for HR teams

Those are intentionally excluded from the hackathon prototype to keep the 3-minute demo reliable.
