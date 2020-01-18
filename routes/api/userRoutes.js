const express = require('express');
const userController = require('../../controllers/userController');
const passport = require('passport');

const router = express.Router();

// @route   POST   api/user/register
// @desc    register new user
// @access  public
router.post('/register', userController.register);

// @route   POST   api/user/login
// @desc    login a user
// @access  public
router.post('/login', userController.login);

// ***********************************
// Checking if the user is authenticated or not
router.use(passport.authenticate('jwt', { session: false }));
// ***********************************

// @route   GET   api/user/current
// @desc    return current user
// @access  private
router.get('/current', userController.current);

module.exports = router;
