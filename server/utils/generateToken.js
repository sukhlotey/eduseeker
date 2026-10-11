const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'eduseeker_fallback_secret_key',
    {
      expiresIn: '30d',
    }
  );
};

module.exports = generateToken;
