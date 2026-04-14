const jwt = require('jsonwebtoken');
const { body } = require('express-validator');

const { AdminUser } = require('../models/AdminUser');
const { asyncHandler } = require('../utils/asyncHandler');
const { HttpError } = require('../utils/httpError');

const bootstrapValidators = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').optional().isString().trim(),
];

const loginValidators = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isString().withMessage('Password is required'),
];

function signAdminJwt(adminUser) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Missing JWT_SECRET');

  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(
    {
      sub: adminUser._id.toString(),
      role: 'admin',
      email: adminUser.email,
      name: adminUser.name,
    },
    secret,
    { expiresIn }
  );
}

const bootstrapAdmin = asyncHandler(async (req, res) => {
  const bootstrapKey = req.headers['x-bootstrap-key'];
  if (!bootstrapKey || bootstrapKey !== process.env.ADMIN_BOOTSTRAP_KEY) {
    throw new HttpError(403, 'Invalid bootstrap key');
  }

  const existingAdmin = await AdminUser.findOne({}).lean();
  if (existingAdmin) {
    throw new HttpError(409, 'Admin already exists');
  }

  const passwordHash = await AdminUser.hashPassword(req.body.password);
  const admin = await AdminUser.create({
    name: req.body.name,
    email: req.body.email,
    passwordHash,
    role: 'admin',
  });

  const token = signAdminJwt(admin);

  res.status(201).json({
    admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
    token,
  });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
  if (!admin) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const ok = await admin.verifyPassword(password);
  if (!ok) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const token = signAdminJwt(admin);

  res.json({
    admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
    token,
  });
});

const meAdmin = asyncHandler(async (req, res) => {
  if (!req.admin?.sub) throw new HttpError(401, 'Not authenticated');

  const admin = await AdminUser.findById(req.admin.sub).select('_id email name role').lean();
  if (!admin) throw new HttpError(401, 'Not authenticated');

  res.json({ admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role } });
});

module.exports = {
  bootstrapValidators,
  loginValidators,
  bootstrapAdmin,
  loginAdmin,
  meAdmin,
};
