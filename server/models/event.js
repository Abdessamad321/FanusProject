const mongoose = require("mongoose");
const moment = require('moment');



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
      min: new Date().toISOString().split('T')[0],
      max: () => {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 5);
        return maxDate;
      },
      set: function (value) {
        const validFormats = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'];
        let formattedDate = null;

        for (const format of validFormats) {
          const parsedDate = moment(value, format, true);
          if (parsedDate.isValid()) {
            formattedDate = parsedDate.format('YYYY-MM-DD');
            break;
          }
        }
        return formattedDate;
      },
    },
    time: {
      type: String,
      set: function (value) {
        const validFormats = ['HH:mm:ss', 'HH:mm', 'H:mm:ss', 'H:mm'];
        let formattedTime = null;
    
        for (const format of validFormats) {
          const parsedTime = moment.utc(value, format, true);
          if (parsedTime.isValid()) {
            formattedTime = parsedTime.format('HH:mm:ss');
            break;
          }
        }
        return formattedTime;
      },
      validate: {
        validator: function (v) {
          const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
          return timeRegex.test(v);
        },
        message: 'Invalid time format!',
      },
      required: [true, 'Time is required'],
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