# Architecture

## Simple Explanation

Produck is currently one small web app that runs in the browser. It uses built-in sample data and browser storage, so it works without accounts, databases, or paid services.

## Current Prototype

- `index.html`: app layout.
- `styles.css`: visual design and mobile layout.
- `course-content.js`: editable course modules and quiz content.
- `competency-rubric.js`: editable Product Manager competency rubric.
- `app.js`: course flow, PDF upload state, CV screening agent, application flow, sample candidates, ranking logic, and mock AI Agent actions.
- Browser storage: remembers demo progress and the submitted demo applicant.

## Ranking Logic

Each candidate receives a readiness score from five signals:

- Course completion
- Quiz score
- Engagement
- CV competency match
- Motivation

## CV Screening Agent

The current demo includes a local CV screening agent. It checks the uploaded PDF file state and scores the candidate against the Product Manager competency rubric in `competency-rubric.js`.

The current browser-only prototype does not extract real PDF text yet. It simulates extraction from demo evidence so the scoring workflow is visible and reliable during the hackathon.

For a production version, PDF parsing and OpenAI scoring should happen in a private backend so candidate CVs and API keys are handled securely.

The mock agent uses the score to recommend:

- Fast-track to interview
- Send case test
- Nurture to finish certificate
- Hold for later campaign

## Future Production Version

A production system would likely add:

- User accounts
- Database
- CV upload and parsing
- Private backend for OpenAI API calls
- Email and calendar integrations
- Admin controls for HR teams

Those are intentionally excluded from the hackathon prototype to keep the 3-minute demo reliable.
