const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(auth.slice(7), SECRET);
  } catch {
    return null;
  }
}

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' });
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

module.exports = { verifyToken, signToken, setCors };
