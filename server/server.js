//dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

//app
const app = express();

// rotues
app.use("/", require("./routes/authRoutes"));

//port
const PORT = process.env.PORT;

//server start
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
