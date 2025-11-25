const auth = require("../middlewares/auth");
const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/items", itemRouter);

router.use(auth);
router.use("/users", userRouter);

router.use((req, res) =>
  res.status(NOT_FOUND).send({ message: "Requested resource not found." })
);

module.exports = router;
