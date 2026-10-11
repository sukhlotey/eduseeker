const jwt = require('jsonwebtoken');
const User = require('../schema/User');

// Verify Bearer Token
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'eduseeker_fallback_secret_key'
      );
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

// Only Course Provider (Admin)
const requireProvider = (req, res, next) => {
  if (req.user && req.user.role === 'provider') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied: Course Providers only' });
  }
};

// Only Course Seeker (User)
const requireSeeker = (req, res, next) => {
  if (req.user && req.user.role === 'seeker') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied: Course Seekers only' });
  }
};

module.exports = { protect, requireProvider, requireSeeker };
