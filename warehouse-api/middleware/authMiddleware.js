const jwt = require('jsonwebtoken');
const JWT_SECRET = "supersecretkey"; // Use the same secret key as in auth routes

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting token in format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // Store user info in request
    next(); // Proceed to the next middleware/route handler
  });
};

module.exports = authenticateToken;
