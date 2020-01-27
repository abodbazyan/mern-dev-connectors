const User = require('../models/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Require the validators
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

exports.register = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  // Check Validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      errors
    });
  }

  const user = await User.findOne({ email });

  if (user) {
    errors.email = 'Email already in use';
    return res.status(409).json({ errors });
  } else {
    const avatar = gravatar.url(email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    });

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      avatar
    });

    res.status(201).json({
      data: newUser
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check Validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      errors
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    errors.email = 'Email does not exist';
    return res.status(404).json({ errors });
  }

  if (!user || !(await user.comparePasswords(password, user.password))) {
    errors.password = 'Incorrect email or password';
    return res.status(400).json({ errors });
  }

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar
  };
  const token = jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 });

  res.status(200).json({
    token: 'Bearer ' + token
  });
};

exports.current = (req, res) => {
  res.status(200).json({
    data: req.user
  });
};
