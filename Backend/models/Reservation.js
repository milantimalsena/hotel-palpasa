const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true },

    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1, max: 50 },
    message: { type: String, trim: true },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
      index: true,
    },

    decision: {
      byAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
      at: { type: Date },
      note: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = { Reservation };
