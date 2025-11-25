const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const bcrypt = require("bcryptjs");

  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid login credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid login credentials");
  }

  return user;
};

module.exports = mongoose.model("user", userSchema);
