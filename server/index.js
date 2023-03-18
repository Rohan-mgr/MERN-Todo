const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoutes = require("./routes/todo");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(todoRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  console.log(message, "message");
  res.status(status).json({ message: message });
});

mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then((success) => {
    app.listen(8080);
    console.log("Database connected successfully.");
  })
  .catch((err) => console.log(err));
