const jwt = require('jsonwebtoken');
const secretKey = 'talento-tech';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid Token' });
  }
}

module.exports = { authenticateToken };
