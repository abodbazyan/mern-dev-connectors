const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

// @route   POST   api/user/register
// @desc    register new user
// @access  public
router.post("/register", userController.register);

// @route   POST   api/user/login
// @desc    login a user
// @access  public
router.post("/login", userController.login);

module.exports = router;
