//dependencies
//const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//test Home page
const test = async (req, res) => {
  res.json("Test is working ");
};
// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email) {
      return res.json({
        error: "Please fill in the form",
      });
    }
    // check password
    if (!password || password.length < 6) {
      return res.json({
        error: "Passord Not less than 6 char",
      });
    }
    //check email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({
        error: "Email Already been used",
      });
    }
    //
    
    //user create
    const user = await User.create({
      name,
      email,
      password,
    });
    //user return
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
};
