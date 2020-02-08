const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { promisify } = require("util");

// Passing the token in the body of the request
module.exports = async (req, res, next) => {
  const token = req.body.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Token not valid" });
  }
};
