# Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB Database (Atlas or local)

## Production Build

### Frontend
```bash
cd frontend
npm run build
```
This generates a `dist` folder.

### Backend
The backend runs directly with `node src/server.js`.
Ensure `NODE_ENV=production`.

## Host Recommendations
- **Frontend:** Vercel, Netlify
- **Backend:** Render, Railway, Heroku
