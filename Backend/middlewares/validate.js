const { validationResult } = require('express-validator');
const { HttpError } = require('../utils/httpError');

function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const details = result.array().map((e) => ({
    field: e.path,
    message: e.msg,
  }));

  next(new HttpError(400, 'Validation failed', details));
}

module.exports = { validate };
