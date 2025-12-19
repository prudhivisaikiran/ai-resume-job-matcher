# AI-Powered Resume & Job Matching Platform

> Intelligent resume analysis and job matching using AI-driven semantic similarity scoring with explainable insights.

---

## 🚀 Live Demo

- **Frontend Application**: [https://6944ea73366ed1f31f3e7306--courageous-tarsier-ae47e9.netlify.app/](https://6944ea73366ed1f31f3e7306--courageous-tarsier-ae47e9.netlify.app/)
- **Backend API**: [https://ai-resume-job-matcher-bs9a.onrender.com/](https://ai-resume-job-matcher-bs9a.onrender.com/)

---

## 📋 Project Overview

This platform leverages AI to bridge the gap between job seekers and opportunities by analyzing resumes and job descriptions to generate **explainable match scores**. Unlike traditional keyword-based systems, this solution uses semantic embeddings to understand context and provide actionable insights into skill alignment, gaps, and improvement recommendations.

**Real-World Impact**: Helps candidates optimize their resumes for specific roles while giving recruiters data-driven insights into candidate-job fit.

---

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based user authentication with bcrypt password hashing
- **📄 Resume Upload & Parsing**: Supports PDF and TXT formats with intelligent text extraction
- **🤖 AI-Powered Job Matching**: Semantic similarity scoring using vector embeddings
- **📊 Explainable Match Scores**: Detailed breakdown of matched skills, missing skills, and improvement suggestions
- **💼 Modern Dashboard UI**: Clean, responsive interface built with React and Tailwind CSS
- **☁️ Cloud Deployment**: Production-ready deployment on Netlify (frontend) and Render (backend)
- **🔄 Real-Time Analysis**: Instant match scoring and resume improvement recommendations

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Deployment**: Netlify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **File Processing**: Multer, pdf-parse
- **Deployment**: Render

### AI/ML
- **Embeddings**: Text vectorization using semantic embeddings
- **Similarity Scoring**: Cosine similarity for match calculation
- **NLP**: Keyword extraction and normalization

### Authentication & Security
- **JWT**: JSON Web Tokens for stateless authentication
- **bcrypt**: Password hashing and salting
- **CORS**: Cross-origin resource sharing configuration

---

## 🏗️ System Architecture

```
┌─────────────┐      HTTPS      ┌─────────────┐      ┌─────────────┐
│   React     │ ────────────────▶│  Express    │ ────▶│  MongoDB    │
│  Frontend   │                  │   Backend   │      │   Atlas     │
│  (Netlify)  │◀────────────────│  (Render)   │◀────│             │
└─────────────┘   JSON/REST     └─────────────┘      └─────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  AI Processing  │
                              │   - Embeddings  │
                              │   - Similarity  │
                              │   - Scoring     │
                              └─────────────────┘
```

**Data Flow**:
1. User uploads resume → Backend parses and vectorizes content
2. User views jobs → Backend calculates semantic similarity scores
3. User requests analysis → AI engine generates explainable insights (matched/missing skills)
4. User receives improvement suggestions → Targeted resume optimization recommendations

---

## 💻 How to Run Locally

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
# Create .env file with VITE_API_URL=http://localhost:5000
npm run dev
```

### Environment Variables

**Backend** (`.env`):
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_MODE=local
```

**Frontend** (`.env`):
```
VITE_API_URL=http://localhost:5000
```

---

## 🌐 Deployment

### Frontend (Netlify)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**: `VITE_API_URL` → Backend URL

### Backend (Render)
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`
- **Environment Variables**: `MONGO_URI`, `JWT_SECRET`, `AI_MODE=local`

### Database (MongoDB Atlas)
- Cloud-hosted MongoDB cluster
- Automatic backups and scaling
- Secure connection via connection string

---

## 🎯 Why This Project Matters

**Problem Solved**: Traditional resume screening relies on exact keyword matches, missing qualified candidates whose experience is described differently. This platform uses AI to understand semantic meaning, providing:

- **For Job Seekers**: Clear, actionable feedback on how to improve resume-job alignment
- **For Recruiters**: Data-driven insights into candidate fit beyond keyword matching
- **For Engineers**: Demonstrates full-stack development, AI integration, cloud deployment, and production-ready architecture

**Technical Depth**: This project showcases end-to-end software engineering—from database design and REST API development to AI model integration, responsive UI/UX, and cloud infrastructure management.

---

## 👨‍💻 Author

**Sai Kiran Prudhvi**  
Full-Stack & AI Engineer

*Building intelligent systems that solve real-world problems.*

---

## 📄 License

This project is open source and available under the MIT License.
