const crypto = require("crypto");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required." });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf8")
    );

    if (!payload || !payload.id) {
      return res.status(401).send({ message: "Authorization required." });
    }

    req.user = payload;

    return next();
  } catch (err) {
    return res.status(401).send({ message: "Authorization required." });
  }
};

module.exports = auth;
