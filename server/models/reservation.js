const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    transaction_time: {
      type: Date,
      default: Date.now,
    },
    userLink: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventLink: {
      type: mongoose.Types.ObjectId,
      ref: 'Event', 
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
