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
