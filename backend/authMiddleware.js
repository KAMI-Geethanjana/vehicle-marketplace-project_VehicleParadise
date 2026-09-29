const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains user_id and email
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized, invalid token' });
  }
};

module.exports = { requireAuth };
