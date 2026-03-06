// utils/errors.js

// Custom error class for validation errors (400)
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

// Custom error class for authentication errors (401)
export class AuthenticationError extends Error {
  constructor(message = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

// Custom error class for not found errors (404)
export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

// Custom error class for conflict errors (409)
export class ConflictError extends Error {
  constructor(message = 'Resource already exists') {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}
