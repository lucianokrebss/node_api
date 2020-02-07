const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const Users = require("../models/userModel");
const brcrypt = require("bcryptjs");

// Is user registered
function checkPassword(passwordEntry, password) {
  return brcrypt.compareSync(passwordEntry, password);
}

//Route GetToken
exports.getToken = async (req, res) => {
  const { userEmail, password: passwordEntry } = req.body;
  const user = await Users.findOne({ email: userEmail });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const { _id, email, password: hashPass } = user;

  // Check the password
  try {
    checkPassword(passwordEntry, hashPass);
  } catch (e) {
    return res.status(401).json({ error: "Password is not valid" });
  }

  try {
    return res.json({
      user: { _id, email },
      token: jwt.sign({ _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  } catch (e) {
    return res.status(401).json({ error: "Access denied" });
  }
};
