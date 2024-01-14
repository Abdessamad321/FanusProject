const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();


const PORT = 7000;

require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
  
const user = require("./routes/userRoutes");
app.use("/fanus", user);

const admin = require("./routes/adminRoutes");
app.use("/fanus", admin);


mongoose.connection.on("connected", () => {
  console.log(`Connected`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})