// controllers/authController.js
import AuthService from '../services/authService.js';

// Controller for user registration
export const register = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await AuthService.register(username, password);
  res.status(201).json({
    message: 'User registered successfully',
    user
  });
};

// Controller for user login
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  const result = await AuthService.login(username, password);
  res.json(result);
};
