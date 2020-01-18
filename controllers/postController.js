const Post = require('../models/Post');
const Profile = require('../models/Profile');

// Require the validators
const validatePostInput = require('../validation/post');

exports.createPost = (req, res) => {
  // Check Validation
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      errors
    });
  }

  Post.create({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })
    .then(post => {
      res.status(201).json({ data: post });
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

exports.getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts =>
      res.status(200).json({
        results: posts.length,
        data: posts
      })
    )
    .catch(error =>
      res.status(404).json({
        errors: {
          posts: 'No posts found'
        }
      })
    );
};

exports.getPost = (req, res) => {
  Post.findById(req.params.id)
    .then(post =>
      res.status(200).json({
        data: post
      })
    )
    .catch(error =>
      res.status(404).json({
        errors: {
          post: 'No post found'
        }
      })
    );
};

exports.deletePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ errors: { auth: 'User not authorized' } });
        }

        // Delete
        post.remove().then(() => res.status(204).json({ status: 'success' }));
      })
      .catch(error => {
        res.status(404).json({ errors: { post: 'Post not found' } });
      });
  });
};

exports.addLike = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Check if the user already liked this post
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ errors: { like: 'User already liked this post' } });
        }

        // Add the user id to the likes array
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json({ data: post }));
      })
      .catch(error => {
        res.status(404).json({ errors: { post: 'Post not found' } });
      });
  });
};

exports.removeLike = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Check if the user has liked this post or not
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ errors: { like: 'You have not yet liked this post' } });
        }

        // Remove the user id from the likes array
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json({ data: post }));
      })
      .catch(error => {
        res.status(404).json({ errors: { post: 'Post not found' } });
      });
  });
};

exports.addComment = (req, res) => {
  // Check Validation
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      errors
    });
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      // Add to comments array
      post.comments.unshift(newComment);
      post.save().then(post => res.json({ data: post }));
    })
    .catch(error => {
      errors.post = 'Post not found';
      res.status(404).json({ errors });
    });
};

exports.removeComment = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // Check to see if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ errors: { comment: 'Comment does not exists' } });
      }

      // Get the remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json({ data: post }));
    })
    .catch(error => {
      errors.post = 'Post not found';
      res.status(404).json({ errors });
    });
};
