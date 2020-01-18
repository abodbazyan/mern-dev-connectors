const express = require('express');
const passport = require('passport');
const profileController = require('../../controllers/profileController');

const router = express.Router();

// @route   GET   api/profile/handle/:handle
// @desc    get someone profile by handle
// @access  public
router.get('/handle/:handle', profileController.getProfileByHandle);

// @route   GET   api/profile/user/:user_id
// @desc    get someone profile by their id
// @access  public
router.get('/user/:user_id', profileController.getProfileById);

// @route   GET   api/profile/all
// @desc    get all the profiles
// @access  public
router.get('/all', profileController.getAllProfiles);

// ***********************************
// Checking if the user is authenticated or not
router.use(passport.authenticate('jwt', { session: false }));
// ***********************************

// @route   GET   api/profile
// @desc    return current user profile
// @access  private
router.get('/', profileController.getMyProfile);

// @route   POST   api/profile
// @desc    create or edit user profile
// @access  private
router.post('/', profileController.createOrUpdateMyProfile);

// @route   POST   api/profile/experience
// @desc    add experience to profile
// @access  private
router.post('/experience', profileController.createExperience);

// @route   POST   api/profile/education
// @desc    add education to profile
// @access  private
router.post('/education', profileController.createEducation);

// @route   DELETE   api/profile/experience/:experience_id
// @desc    delete experience from profile
// @access  private
router.delete('/experience/:experience_id', profileController.deleteExperience);

// @route   DELETE   api/profile/education/:education_id
// @desc    delete education from profile
// @access  private
router.delete('/education/:education_id', profileController.deleteEducation);

// @route   DELETE   api/profile/
// @desc    delete user and his profile
// @access  private
router.delete('/', profileController.deleteMe);

module.exports = router;
