const express = require('express');

const { validate } = require('../middlewares/validate');
const { requireAdminAuth, requireAdminRole } = require('../middlewares/adminAuth');
const {
  bootstrapValidators,
  loginValidators,
  bootstrapAdmin,
  loginAdmin,
  meAdmin,
} = require('../controllers/adminAuthController');

const router = express.Router();

router.post('/bootstrap', bootstrapValidators, validate, bootstrapAdmin);
router.post('/login', loginValidators, validate, loginAdmin);
router.get('/me', requireAdminAuth, requireAdminRole, meAdmin);

module.exports = router;
