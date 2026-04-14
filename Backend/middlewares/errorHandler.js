const { HttpError } = require('../utils/httpError');

function errorHandler(err, req, res, next) {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;

  const payload = {
    message: err?.message || 'Internal Server Error',
  };

  if (err instanceof HttpError && err.details) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err?.stack;
  }

  res.status(statusCode).json(payload);
}

module.exports = { errorHandler };
