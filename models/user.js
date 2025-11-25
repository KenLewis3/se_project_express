const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

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

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = crypto
    .createHash("sha256")
    .update(this.password)
    .digest("hex");

  next();
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const hashed = crypto.createHash("sha256").update(password).digest("hex");

  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid login credentials");
  }

  if (user.password !== hashed) {
    throw new Error("Invalid login credentials");
  }

  return user;

  return null;
};

module.exports = mongoose.model("user", userSchema);
