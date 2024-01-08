const mongoose = require("mongoose");

// Discount schema ======================================================

const discountSchema = new mongoose.Schema(
  {
    percentage: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
