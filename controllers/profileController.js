const Profile = require('../models/Profile');
const User = require('../models/User');

// Require the validators
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

exports.getMyProfile = async (req, res) => {
  const errors = {};
  const profile = await Profile.findOne({ user: req.user.id }).populate({
    path: 'user',
    select: 'name avatar'
  });

  if (!profile) {
    errors.profile = 'There is no profile for this user';
    return res.status(404).json({ errors });
  }

  res.status(200).json({ data: profile });
};

exports.createOrUpdateMyProfile = async (req, res) => {
  // Check Validation
  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      errors
    });
  }

  const profileFields = {};
  profileFields.social = {};
  profileFields.user = req.user.id;

  // Get the fields
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubUsername)
    profileFields.githubUsername = req.body.githubUsername;
  // Skills - split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }
  // Social
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json({ data: profile }));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json({ errors });
        }

        // Save Profile
        new Profile(profileFields)
          .save()
          .then(profile => res.json({ data: profile }));
      });
    }
  });
};

exports.getProfileByHandle = async (req, res) => {
  const errors = {};
  const profile = await Profile.findOne({ handle: req.params.handle }).populate(
    {
      path: 'user',
      select: 'name avatar'
    }
  );

  if (!profile) {
    errors.profile = 'There is no profile for this user';
    return res.status(404).json({ errors });
  }

  res.status(200).json({ data: profile });
};

exports.getProfileById = async (req, res) => {
  const errors = {};
  const profile = await Profile.findOne({ user: req.params.user_id })
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .catch(error => {
      errors.profile = 'There is no profile for this user';
      return res.status(404).json({ errors });
    });

  res.status(200).json({ data: profile });
};

exports.getAllProfiles = async (req, res) => {
  const errors = {};
  const profiles = await Profile.find()
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .catch(error => {
      errors.profile = 'There is no profile for this user';
      return res.status(404).json({ errors });
    });

  res.status(200).json({
    results: profiles.length,
    data: profiles
  });
};

exports.createExperience = (req, res) => {
  // Check Validation
  const { errors, isValid } = validateExperienceInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      errors
    });
  }

  // Add the fields
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExperience = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to experience array
    profile.experience.unshift(newExperience);
    profile.save().then(profile => res.json({ data: profile }));
  });
};

exports.createEducation = (req, res) => {
  // Check Validation
  const { errors, isValid } = validateEducationInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      errors
    });
  }

  // Add the fields
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEducation = {
      school: req.body.school,
      degree: req.body.degree,
      fieldOfStudy: req.body.fieldOfStudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to experience array
    profile.education.unshift(newEducation);
    profile.save().then(profile => res.json({ data: profile }));
  });
};

exports.deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.experience_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json({ data: profile }));
    })
    .catch(error => res.status(404).json(error));
};

exports.deleteEducation = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.education_id);

      // Splice out of array
      profile.education.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json({ data: profile }));
    })
    .catch(error => res.status(404).json(error));
};

exports.deleteMe = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.status(204).json({ status: 'success' });
    });
  });
};
