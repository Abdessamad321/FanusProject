const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 7000;
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
async function connected() {
    try {
      mongoose.connect(process.env.MONGO_CON);
    } catch (error) {
      console.log(error);
    }
  }
  connected();


  

  const event = require ('./routes/eventRoutes')
  app.use("/fanus", event)
mongoose.connection.on("connected", () => {
  console.log(`Connected`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
