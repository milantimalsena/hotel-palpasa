const express = require('express');

const { requireAdminAuth, requireAdminRole } = require('../middlewares/adminAuth');
const { validate } = require('../middlewares/validate');
const {
  listValidators,
  idParamValidators,
  statusValidators,
  listReservations,
  getReservation,
  setReservationStatus,
  acceptReservation,
  rejectReservation,
} = require('../controllers/adminReservationController');

const router = express.Router();

router.use(requireAdminAuth, requireAdminRole);

router.get('/', listValidators, validate, listReservations);
router.get('/:id', idParamValidators, validate, getReservation);
router.patch('/:id/status', statusValidators, validate, setReservationStatus);
router.post('/:id/accept', idParamValidators, validate, acceptReservation);
router.post('/:id/reject', idParamValidators, validate, rejectReservation);

module.exports = router;
