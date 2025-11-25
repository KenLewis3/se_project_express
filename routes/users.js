const router = require("express").Router();

const {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
} = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

/* router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.post("/login", login); */

module.exports = router;
