# Experiment 6.1 - Middleware Implementation (Logging/Auth)

## Objectives
- Create custom logging middleware
- Develop authentication middleware
- Apply middleware to routes
- Test middleware sequencing
- Handle middleware errors

## Project Structure

```
experiment-6.1/
├── config/
│   ├── constants.js          # Application constants (JWT secret, etc.)
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication route handlers
│   └── protectedController.js # Protected route handlers
├── middleware/
│   ├── asyncErrorHandler.js  # Async error handling wrapper
│   ├── auth.js              # JWT authentication middleware
│   ├── logging.js           # Request/response logging middleware
│   └── validation.js        # Input validation middleware
├── models/
│   └── User.js              # User data model (in-memory storage)
├── routes/
│   ├── auth.js              # Authentication routes (login/register)
│   └── protected.js         # Protected routes requiring authentication
├── services/
│   └── authService.js       # Authentication business logic
├── utils/
│   └── errors.js            # Custom error classes
├── server.js                # Main application entry point
├── package.json             # Project dependencies
└── README.md                # This file
```

## Architecture Overview

### Layers
- **Routes**: Define HTTP endpoints and middleware chains (thin layer)
- **Controllers**: Handle HTTP requests/responses, delegate to services
- **Services**: Contain business logic (authentication, user management)
- **Models**: Data access layer for user operations
- **Middleware**: Cross-cutting concerns (auth, logging, validation, error handling)
- **Utils**: Shared utilities and custom error classes
- **Config**: Application configuration and constants

### Key Features
- **ES Modules**: Modern JavaScript module system
- **In-Memory Storage**: User data stored in RAM only (lost on server restart)
- **Separation of Concerns**: Each layer has a specific responsibility
- **Error Handling**: Centralized error middleware with custom error classes
- **Async Error Handling**: Automatic catching of async errors without try-catch
- **Input Validation**: Middleware-based validation with sanitization
- **Security**: Password hashing, JWT tokens, proper error responses

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB** (optional - for database connection testing):
   ```bash
   # Make sure MongoDB is running on localhost:27017
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

The server will run on **http://localhost:3000**

## API Endpoints

### Public Routes
- **GET /** - Welcome message

### Authentication Routes
- **POST /auth/register** - Register a new user
  - Body: `{ "username": "newuser", "password": "password123" }`
  - Returns: `{ "message": "User registered successfully", "user": { "id": 2, "username": "newuser" } }`

- **POST /auth/login** - Login with username and password
  - Body: `{ "username": "testuser", "password": "password" }`
  - Returns: `{ "token": "jwt-token", "user": { "id": 1, "username": "testuser" } }`

### Protected Routes
- **GET /api/dashboard** - Protected dashboard (requires Bearer token)
  - Header: `Authorization: Bearer <token>`
  - Returns: `{ "message": "Welcome to the dashboard!", "user": { "id": 1, "username": "testuser" } }`

## Middleware Sequence

1. **Logging middleware** (logs all requests)
2. **Authentication middleware** (for protected routes only)
3. **Validation middleware** (for auth routes)
4. **Route handlers**
5. **Error handling middleware** (last)

## Testing with Postman

### 1. Test Default User Login
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password"
}
```

### 2. Register a New User
```
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123"
}
```

### 3. Access Protected Route (with token)
```
GET http://localhost:3000/api/dashboard
Authorization: Bearer <your-token-here>
```

### 4. Test Unauthorized Access
```
GET http://localhost:3000/api/dashboard
(No Authorization header)
```

## Expected Outputs

✅ **Request logs displayed in the console:**
```
[2026-03-06T...] POST /auth/login - IP: ::1
[2026-03-06T...] POST /auth/login - Status: 200
```

✅ **Protected route access with valid token:**
```json
{
  "message": "Welcome to the dashboard!",
  "user": {
    "id": 1,
    "username": "testuser"
  }
}
```

✅ **401 errors for unauthorized access:**
```json
{
  "error": "No token provided"
}
```

✅ **Error handling for internal server issues:**
```json
{
  "error": "Internal server error"
}
```

✅ **Middleware executes in correct sequence** (visible in console logs)

## Course Outcomes Addressed

- **CO3**: Implement RESTful APIs and integrate databases (MongoDB/MySQL) with a backend server using Node.js and Express.js
- **CO4**: Debug, test, and optimize full-stack applications by analyzing performance and security aspects

## Key Concepts Demonstrated

1. **Request/Response Pipeline** - How middleware processes requests sequentially
2. **Middleware Chaining** - Multiple middleware functions working together
3. **Error Handling Middleware** - Centralized error handling
4. **Authentication Patterns** - JWT-based authentication
5. **Request Logging** - Tracking all requests and responses

## Questions

1. **What is middleware in Express?**
   - Middleware functions have access to the request object (req), response object (res), and the next middleware function (next) in the application's request-response cycle.

2. **How does the next() function work?**
   - The next() function passes control to the next middleware function in the stack. If not called, the request will be left hanging.

3. **Why is the error handler placed last?**
   - Error-handling middleware must be placed last because it needs to catch errors from previous middleware and routes.

4. **What is the difference between app.use() and router.use()?**
   - app.use() applies middleware to the entire application, while router.use() applies it only to routes defined on that specific router.

5. **How does async error handling work?**
   - The asyncErrorHandler wrapper catches any errors from async functions and passes them to the error handling middleware automatically.

## Default Credentials

- **Username**: testuser
- **Password**: password

---

**Created by**: Puneet  
**Experiment**: 6.1 - Middleware Implementation  
**Date**: March 6, 2026
