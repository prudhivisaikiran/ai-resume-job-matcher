# API Testing Guide

## Base URL
`http://localhost:5000`

## Option 1: Testing with Postman

### 1. Register User
- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns User object + JWT Token.

### 2. Login User
- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns User object + JWT Token.
- **Action:** Copy the `token` from the response.

### 3. Get Current User (Protected)
- **Method:** `GET`
- **URL:** `/api/auth/me`
- **Headers:**
  - Key: `Authorization`
  - Value: `Bearer <YOUR_TOKEN_HERE>`
- **Response:** Returns your user profile (id, name, email).

---

## Option 2: Testing with PowerShell (cURL)

### 1. Register
```powershell
curl -Method POST "http://localhost:5000/api/auth/register" `
  -Headers @{ "Content-Type"="application/json" } `
  -Body '{ "name":"Sai", "email":"sai_test_1@gmail.com", "password":"Password123" }'
```

### 2. Login
```powershell
curl -Method POST "http://localhost:5000/api/auth/login" `
  -Headers @{ "Content-Type"="application/json" } `
  -Body '{ "email":"sai_test_1@gmail.com", "password":"Password123" }'
```
*Copy the token from the response.*

### 3. Get Current User (Protected)
Replace `PASTE_TOKEN_HERE` with your actual token:
```powershell
curl -Method GET "http://localhost:5000/api/auth/me" `
  -Headers @{ "Authorization"="Bearer PASTE_TOKEN_HERE" }
```

## Option 3: AI Features (Resume & Jobs)

**Note:** By default, the system runs in `AI_MODE=local`. This generates "fake" embeddings locally for free. To use real OpenAI embeddings, set `AI_MODE=openai` in `.env` and provide a valid API Key.

### Prerequisites
- **Login** first and copy your `token`.
- Add `Authorization: Bearer <TOKEN>` header to all requests.

### 1. Upload Resume
- **Method:** `POST`
- **URL:** `/api/resume/upload`
- **Body:** `form-data`
  - Key: `resume` | Type: `File` | Value: Select a PDF or TXT file.
- **Response:** `{ resumeId: "...", textPreview: "..." }`

### 2. Create Job
- **Method:** `POST`
- **URL:** `/api/jobs`
- **Body (JSON):**
  ```json
  {
    "title": "Software Engineer",
    "company": "Tech Corp",
    "description": "Looking for Node.js and React developer."
  }
  ```

### 3. Match Resume to Jobs
- **Method:** `GET`
- **URL:** `/api/jobs/match?resumeId=<RESUME_ID_FROM_STEP_1>`
- **Response:** List of jobs sorted by match score.
