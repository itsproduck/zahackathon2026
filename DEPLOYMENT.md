# Deployment Guide

The current prototype is a static web app. It can be deployed to any static hosting service later, such as Vercel, Netlify, GitHub Pages, or an internal company hosting page.

## Local Demo

Open `index.html` in a browser, or serve the folder with a simple local web server.

## Public Deployment Later

1. Choose a static hosting provider.
2. Upload or connect this project folder.
3. Set the publish directory to the project root.
4. Confirm that `index.html`, `styles.css`, and `app.js` are available.
5. Do not add API keys to source code.

## API Key Handling

The current demo does not require an API key.

If live OpenAI ranking is added later, use a small backend service so the API key stays private. Do not call the OpenAI API directly from this browser-only app with a secret key.

## Recommended Hackathon Choice

For the deadline, keep the demo local unless the judges require a public link. A local demo is more reliable and avoids last-minute account setup.
