const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
    },
    customer_photo: {
      type: String,
    },
    isDeleted:{
      type: Boolean,
      default: false
    },
    valid_account: {
      type: Boolean,
      default: false,
    },
    resetToken:{
      type: String,
      default: null
    },
    resetTokenExpiration:{
      type:Date,
      default: null
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
