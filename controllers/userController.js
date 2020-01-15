const User = require("../models/User");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ msg: "Email already in use" });
  } else {
    const avatar = gravatar.url(email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    });

    const newUser = await User.create({
      name,
      email,
      password,
      avatar
    });

    res.status(201).json({
      status: "success",
      data: newUser
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }

  if (!user) {
    return res.status(404).json({ msg: "Email does not exist" });
  }

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return res.status(400).json({ msg: "Incorrect email or password" });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 });

  res.status(200).json({
    status: "success",
    token: "Bearer " + token
  });
};
