const User = require("../models/user");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred while retrieving users." });
    });
};

const createUser = (req, res) => {
  //console.log(req.body);
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid user data provided." });
      }
      return res
        .status(500)
        .send({ message: "An error occurred while creating the user." });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Invalid user ID." });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "User not found." });
      }
      return res
        .status(500)
        .send({ message: "An error occurred while retrieving the user." });
    });
};

module.exports = { getUsers, createUser, getUserById };
