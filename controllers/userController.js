const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const homePage = (req, res) => {
  res.status(200).send("home Page");
};
const loginPage = (req, res) => {
  res.status(200).send("Login Page");
};

const userLogin = async(req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({email})
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).send("Login Successful");
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
};

const signUpPage = (req, res) => {
  res.status(200).send("Sign Up Page");
};

const userSignUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);
    if (password !== confirmPassword) {
      return res.status(400).send("password des not match");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).send("successfully Sign Up");
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).send(messages.join(". "));
    }
    console.error(error);
    return res.status(500).send("Internal server error", error.message);
  }
};

module.exports = {
  homePage,
  loginPage,
  userLogin,
  signUpPage,
  userSignUp,
};
