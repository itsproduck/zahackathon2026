# Deployment Guide

The current prototype is a static web app. It is ready to deploy on Vercel from a GitHub repository.

## Local Demo

Open `index.html` in a browser, or serve the folder with a simple local web server.

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

## GitHub Push

This folder is already a local Git project. It needs a GitHub repository URL before it can be pushed.

After a GitHub repository exists, connect it with:

```bash
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPO.git
git push -u origin main
```

## API Key Handling

The current demo does not require an API key.

If live OpenAI ranking is added later, use a small backend service so the API key stays private. Do not call the OpenAI API directly from this browser-only app with a secret key.

## Recommended Hackathon Choice

For the deadline, keep the demo local unless the judges require a public link. A local demo is more reliable and avoids last-minute account setup.
