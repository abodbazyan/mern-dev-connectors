const express = require('express');
const passport = require('passport');
const postController = require('../../controllers/postController');

const router = express.Router();

// @route   GET   api/post/
// @desc    get a post
// @access  public
router.get('/', postController.getPosts);

// @route   GET   api/post/:id
// @desc    get post by id
// @access  public
router.get('/:id', postController.getPost);

// ***********************************
// Checking if the user is authenticated or not
router.use(passport.authenticate('jwt', { session: false }));
// ***********************************

// @route   POST   api/post/
// @desc    create new post
// @access  private
router.post('/', postController.createPost);

// @route   DELETE   api/post/:id
// @desc    delete my post
// @access  private
router.delete('/:id', postController.deletePost);

// @route   POST   api/post/like/:id
// @desc    add like to a post
// @access  private
router.post('/like/:id', postController.addLike);

// @route   POST   api/post/unlike/:id
// @desc    remove like from a post
// @access  private
router.post('/unlike/:id', postController.removeLike);

// @route   POST   api/post/comment/:id
// @desc    add a comment to a post
// @access  private
router.post('/comment/:id', postController.addComment);

// @route   DELETE   api/post/comment/:id/:comment_id
// @desc    remove a comment from a post
// @access  private
router.delete('/comment/:id/:comment_id', postController.removeComment);

module.exports = router;
