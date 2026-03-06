# API Testing Guide for Experiment 6.1

## Quick Test Commands (using curl or PowerShell)

### 1. Test Welcome Route
```powershell
curl http://localhost:3000/
```

### 2. Login with Default User
```powershell
curl -X POST http://localhost:3000/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"username\":\"testuser\",\"password\":\"password\"}'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser"
  }
}
```

### 3. Register New User
```powershell
curl -X POST http://localhost:3000/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"username\":\"puneet\",\"password\":\"password123\"}'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 2,
    "username": "puneet"
  }
}
```

### 4. Access Protected Route (with token)
```powershell
# First, get the token from login
$token = "YOUR_TOKEN_HERE"

curl http://localhost:3000/api/dashboard `
  -H "Authorization: Bearer $token"
```

**Expected Response:**
```json
{
  "message": "Welcome to the dashboard!",
  "user": {
    "id": 1,
    "username": "testuser"
  }
}
```

### 5. Test Unauthorized Access
```powershell
curl http://localhost:3000/api/dashboard
```

**Expected Response (401 Error):**
```json
{
  "error": "No token provided"
}
```

## Postman Collection

### Setup in Postman

#### 1. Login Request
- **Method**: POST
- **URL**: `http://localhost:3000/auth/login`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "username": "testuser",
  "password": "password"
}
```

#### 2. Register Request
- **Method**: POST
- **URL**: `http://localhost:3000/auth/register`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "username": "newuser",
  "password": "securepass123"
}
```

#### 3. Protected Dashboard Request
- **Method**: GET
- **URL**: `http://localhost:3000/api/dashboard`
- **Headers**: 
  - `Authorization: Bearer YOUR_TOKEN_HERE`

## Test Scenarios for Experiment

### ✅ Scenario 1: Logging Middleware
- Make any request
- Check console logs for:
  ```
  [2026-03-06T...] POST /auth/login - IP: ::1
  [2026-03-06T...] POST /auth/login - Status: 200
  ```

### ✅ Scenario 2: Authentication Success
- Login with correct credentials
- Use token to access `/api/dashboard`
- Should receive welcome message with user data

### ✅ Scenario 3: Authentication Failure
- Try accessing `/api/dashboard` without token
- Should receive 401 error: "No token provided"

### ✅ Scenario 4: Validation Middleware
- Try to register with short username (< 3 chars)
- Should receive 400 error: "Username must be at least 3 characters long"
- Try to register with short password (< 6 chars)
- Should receive 400 error: "Password must be at least 6 characters long"

### ✅ Scenario 5: Error Handling
- Try to register duplicate username
- Should receive 409 error: "User already exists"

### ✅ Scenario 6: Middleware Sequencing
Check console to verify order:
1. Logging middleware logs request
2. Validation middleware checks input
3. Controller processes request
4. Logging middleware logs response
5. Error handler catches any errors

## Console Output Examples

When server starts:
```
✅ Initialized 1 users in memory
   Default user: testuser (password: password)
🚀 Server running on http://localhost:3000
📝 Middleware sequence: Logging → Auth (protected routes) → Controllers → Error handling
MongoDB connection error: ... (optional)
```

When requests are made:
```
[2026-03-06T10:30:15.123Z] POST /auth/login - IP: ::1
[2026-03-06T10:30:15.145Z] POST /auth/login - Status: 200
[2026-03-06T10:30:20.456Z] GET /api/dashboard - IP: ::1
[2026-03-06T10:30:20.460Z] GET /api/dashboard - Status: 200
```

## Default Test Credentials

- **Username**: `testuser`
- **Password**: `password`

## Stopping the Server

```powershell
# Find the node process
Get-Process node | Where-Object { $_.Path -like "*fullstack*" } | Stop-Process

# Or press Ctrl+C in the terminal where server is running
```
