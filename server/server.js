//dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const errorHandler = require("./helper/errorHandler");
//app
const app = express();

//middleWare
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//  Middleware Rotues
app.use("/", require("./routes/authRoutes"));
//error Handler
//app.use(errorHandler);
//port
const PORT = process.env.PORT;
//dB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Database Not Connected", err));

//server start
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
