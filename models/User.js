const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Middleware to encrypt the password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Middleware to compare passwords
userSchema.methods.comparePasswords = async function(enteredPW, DB_PW) {
  return bcrypt.compare(enteredPW, DB_PW);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
