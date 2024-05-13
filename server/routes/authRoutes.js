const express = require("express");
const cors = require("cors");
const { test } = require("../controllers/authControllers");
//router
const router = express.Router();

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173/", //localhost for vite
  })
);

router.get("/", test);

module.exports = router;
