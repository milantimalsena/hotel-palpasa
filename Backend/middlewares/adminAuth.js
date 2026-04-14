const jwt = require('jsonwebtoken');
const { HttpError } = require('../utils/httpError');

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Missing Authorization header'));
  }

  const token = authHeader.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    return next();
  } catch (err) {
    return next(new HttpError(401, 'Invalid or expired token'));
  }
}

function requireAdminRole(req, res, next) {
  if (!req.admin || req.admin.role !== 'admin') {
    return next(new HttpError(403, 'Admin access required'));
  }
  return next();
}

module.exports = { requireAdminAuth, requireAdminRole };
