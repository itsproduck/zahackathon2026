# Architecture

## Simple Explanation

Produck is currently one small web app that runs in the browser. It uses built-in sample data and browser storage, so it works without accounts, databases, or paid services.

## Current Prototype

- `index.html`: app layout.
- `styles.css`: visual design and mobile layout.
- `app.js`: course flow, application flow, sample candidates, ranking logic, and mock AI Agent actions.
- Browser storage: remembers demo progress and the submitted demo applicant.

## Ranking Logic

Each candidate receives a readiness score from five signals:

- Course completion
- Quiz score
- Engagement
- CV strength
- Motivation

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
