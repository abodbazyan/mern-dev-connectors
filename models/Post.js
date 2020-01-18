const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  CreatedAt: {
    type: Date,
    default: Date.now()
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      commentCreatedAt: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
