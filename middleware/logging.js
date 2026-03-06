// middleware/logging.js
// Custom logging middleware to log all incoming requests and responses
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  // Log incoming request
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

  // Log response when finished
  res.on('finish', () => {
    console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
  });

  next();
};

export default loggingMiddleware;
