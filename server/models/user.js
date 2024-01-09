const mongoose = require("mongoose");
// const { v4: uuidv4 } = require('uuid');

// User schema ======================================================

const userSchema = new mongoose.Schema(
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
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
