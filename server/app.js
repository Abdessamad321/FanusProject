const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 7000;
require('dotenv').config();
async function connected() {
    try {
      mongoose.connect(process.env.MONGO_CON);
    } catch (error) {
      console.log(error);
    }
  }
  connected();
mongoose.connection.on("connected", () => {
  console.log(`Connected`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
