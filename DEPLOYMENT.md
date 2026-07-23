# Deployment Guide

The current prototype is a static web app. It is ready to deploy on Vercel from a GitHub repository.

## Local Demo

Open `index.html` in a browser, or serve the folder with a simple local web server.

For the live PM CV Evaluator, copy `.env.example` to `.env`, add the Workspace Agent trigger config and access token, then run:

```bash
npm start
```

Open `http://localhost:3000`. The `Run AI Agent` button will call `/api/evaluate-assignment`, which triggers the published PM CV Evaluator for the selected candidate.

## Deploy With Vercel

1. Push this project to GitHub.
2. Open Vercel.
3. Choose `Add New Project`.
4. Import the GitHub repository.
5. Keep the framework preset as `Other`.
6. Leave the build command empty.
7. Leave the output directory empty.
8. Deploy.

Vercel should serve `index.html` from the project root.

The `api/evaluate-assignment.js` file is a Vercel serverless function. Add these environment variables in Vercel before using the live PM CV Evaluator agent:

- `WORKSPACE_AGENT_ACCESS_TOKEN`
- `WORKSPACE_AGENT_ASSIGNMENT_ENDPOINT` optional override; the published PM CV Evaluator endpoint is already merged into the backend
- `WORKSPACE_AGENT_ASSIGNMENT_TRIGGER_ID` optional override when you only have the exact `agtch_...` trigger ID

Current PM CV Evaluator endpoint:

```text
https://api.chatgpt.com/v1/workspace_agents/agtch_6a61da53bdac819194ef01956125331e/trigger
```

## GitHub Push

This folder is already a local Git project. It needs a GitHub repository URL before it can be pushed.

After a GitHub repository exists, connect it with:

```bash
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPO.git
git push -u origin main
```

## API Key Handling

The static demo does not require an API key.

The live PM CV Evaluator requires a Workspace Agent access token in the backend environment. Do not expose it in browser code.

## Recommended Hackathon Choice

For the deadline, use `npm start` locally if you want to prove the Workspace Agent trigger is truly running. Keep `index.html` static mode as the fallback if network or credential setup gets in the way.
