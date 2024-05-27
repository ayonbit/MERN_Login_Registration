//dependencies
const express = require("express");
const cors = require("cors");
const { test, registerUser,loginUser } = require("../controllers/authControllers");

//router
const router = express.Router();

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", //localhost for vite
  })
);

//router request
router.get("/", test);
router.post("/register", registerUser);
router.post("/login",loginUser);

module.exports = router;
