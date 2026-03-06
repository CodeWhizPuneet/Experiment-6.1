// controllers/protectedController.js

// Controller for protected dashboard route
export const getDashboard = (req, res, next) => {
  res.json({
    message: 'Welcome to the dashboard!',
    user: req.user
  });
};
