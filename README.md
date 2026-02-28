# Astrolyzer

Astrology web app with:
- `frontend`: React + Vite UI
- `backend`: Express API (AI chat, palm analysis, zodiac lookup) + MongoDB Atlas

## Local Setup

1. Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
```
2. Configure env:
- Copy `backend/.env.example` to `backend/.env`
- Copy `frontend/.env.example` to `frontend/.env`
3. Run:
```bash
cd backend && npm start
cd ../frontend && npm run dev
```

## Vercel Deployment

This repo is configured for a single Vercel project with both frontend and backend using `vercel.json`.

### Required Vercel Environment Variables

Set these in Vercel Project Settings:
- `GEMINI_API_KEY`
- `MONGODB_URI`
- `MONGODB_DB_NAME` (recommended: `data`)
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_BASE_URL` (leave empty for same-domain API routing, or set your API base URL)

### Deploy

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Vercel will use:
- static build from `frontend`
- Node serverless function from `backend/server.js`
4. Redeploy after setting env vars.

