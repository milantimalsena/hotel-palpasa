const { body, param } = require('express-validator');

const { Reservation } = require('../models/Reservation');
const { asyncHandler } = require('../utils/asyncHandler');
const { HttpError } = require('../utils/httpError');

const createValidators = [
  body('name').isString().trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').isString().trim().isLength({ min: 10 }).withMessage('Valid phone is required'),
  body('date').isString().trim().notEmpty().withMessage('Date is required'),
  body('time').isString().trim().notEmpty().withMessage('Time is required'),
  body('guests').isInt({ min: 1, max: 50 }).withMessage('Guests must be between 1 and 50').toInt(),
  body('message').optional().isString().trim().isLength({ max: 2000 }),
  body('userId').optional().isString().trim().isLength({ min: 1 }),
];

const idValidators = [param('id').isMongoId().withMessage('Invalid reservation id')];

const createReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.create({
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.time,
    guests: req.body.guests,
    message: req.body.message,
    status: 'pending',
  });

  res.status(201).json({ reservation });
});

const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).lean();
  if (!reservation) throw new HttpError(404, 'Reservation not found');
  res.json({ reservation });
});

module.exports = {
  createValidators,
  idValidators,
  createReservation,
  getReservation,
};
