# Analytics Testing Guide

## Backend API

### 1. Overview Analytics
**Endpoint:** `GET /api/analytics/overview?resumeId=<RESUME_ID>`
**Access:** Private (JWT required)

**Example Postman Request:**
- **URL:** `http://localhost:5000/api/analytics/overview?resumeId=65...`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <YOUR_TOKEN>`

**Expected Response:**
```json
{
  "totalJobs": 5,
  "avgMatchScore": "65.4",
  "bestMatchScore": 88,
  "scoreBuckets": {
    "0-20": 0,
    "21-40": 1,
    "41-60": 2,
    "61-80": 1,
    "81-100": 1
  },
  "topMissingSkills": [
    { "skill": "Docker", "count": 4 },
    { "skill": "Kubernetes", "count": 3 }
  ]
}
```

---

## Frontend UI

### 1. Navigation
- Click **"Analytics"** in the sidebar.

### 2. State Handling
- **No Resume ID:** If no Resume ID is provided in the top context bar, you will see a prompt to enter one.
- **Loading State:** A shimmer skeleton appears while fetching data.
- **Empty State:** If the user has no jobs or matches, a clear empty state is shown.

### 3. Visuals
- **Metric Cards:** Total Jobs, Avg Score, Peak Score.
- **Match Concentration (Bar Chart):** Shows how candidates distribute across score ranges.
- **Market Capability Gaps (Horizontal Bar Chart):** Shows the top skills missing in your pipeline.
