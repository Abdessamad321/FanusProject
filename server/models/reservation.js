const mongoose = require("mongoose");
// const { v4: uuidv4 } = require('uuid');

// Reservation schema ======================================================

const reservationSchema = new mongoose.Schema(
  {
    transaction_time: {
      type: Date,
      default: Date.now,
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
