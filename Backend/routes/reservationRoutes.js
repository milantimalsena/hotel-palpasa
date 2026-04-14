const express = require('express');

const { validate } = require('../middlewares/validate');
const {
  createValidators,
  idValidators,
  createReservation,
  getReservation,
} = require('../controllers/reservationController');

const router = express.Router();

router.post('/', createValidators, validate, createReservation);
router.get('/:id', idValidators, validate, getReservation);

module.exports = router;
