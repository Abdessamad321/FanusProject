const mongoose = require("mongoose");
const moment = require('moment');

// Event schema ======================================================

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const parsedTime = moment(value, ['h:mm A', 'HH:mm', 'H A', 'HH'], true);
          return parsedTime.isValid();
        },
        message: 'Invalid time format.',
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
    },
    remaining_places: {
      type: Number,
    },
  },
  { timestamps: true }
);

 const Event = mongoose.model("Event", eventSchema);

 module.exports = Event;