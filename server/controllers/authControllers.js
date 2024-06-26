//dependencies
//const asyncHandler = require("express-async-handler");
const User = require("../models/user");
//const bcrypt = require("bcrypt");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
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
    //hashed password
    const hashedPassword = await hashPassword(password);

    //user create in Database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //user return
    console.log(user);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // if (!email || !password) {
    //   return res.json({
    //     error: "Please fill in the Form",
    //   });
    // }
    //check if user exists in db
    const user = await User.findOne({ email });
    //const name = await user.name;
    if (!user) {
      return res.json({
        error: "User Not Found! Please Register First",
      });
    }
    //check user password matched
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.json({
        error: "Password DoNot Matched",
      });
    }
    //if match
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

//get Profile
const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
