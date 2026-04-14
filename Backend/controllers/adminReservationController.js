const { query, body, param } = require('express-validator');

const { Reservation } = require('../models/Reservation');
const { asyncHandler } = require('../utils/asyncHandler');
const { HttpError } = require('../utils/httpError');

const listValidators = [
  query('status').optional().isIn(['pending', 'confirmed', 'cancelled']),
  query('limit').optional().isInt({ min: 1, max: 200 }).toInt(),
  query('skip').optional().isInt({ min: 0, max: 10000 }).toInt(),
];

const idParamValidators = [param('id').isMongoId().withMessage('Invalid reservation id')];

const statusValidators = [
  ...idParamValidators,
  body('status').isIn(['confirmed', 'cancelled']).withMessage('Status must be confirmed or cancelled'),
  body('note').optional().isString().trim().isLength({ max: 500 }),
];

const listReservations = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const limit = req.query.limit ?? 50;
  const skip = req.query.skip ?? 0;

  const [items, total] = await Promise.all([
    Reservation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Reservation.countDocuments(filter),
  ]);

  res.json({ items, total, limit, skip });
});

const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).lean();
  if (!reservation) throw new HttpError(404, 'Reservation not found');
  res.json({ reservation });
});

const setReservationStatus = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) throw new HttpError(404, 'Reservation not found');

  reservation.status = req.body.status;
  reservation.decision = {
    byAdminId: req.admin.sub,
    at: new Date(),
    note: req.body.note,
  };

  await reservation.save();

  res.json({ reservation });
});

const acceptReservation = asyncHandler(async (req, res) => {
  req.body.status = 'confirmed';
  return setReservationStatus(req, res);
});

const rejectReservation = asyncHandler(async (req, res) => {
  req.body.status = 'cancelled';
  return setReservationStatus(req, res);
});

module.exports = {
  listValidators,
  idParamValidators,
  statusValidators,
  listReservations,
  getReservation,
  setReservationStatus,
  acceptReservation,
  rejectReservation,
};
