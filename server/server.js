const express = require("express");
const { connectToDatabase } = require("./db");

const app = express();
const PORT = 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = { app, connectToDatabase };

