const Users = require("../models/userModel");
const objectId = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const bcryptSalt = 9;

//POST NEW USER
exports.postSignup = async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = await bcrypt.hashSync(password, salt);

  const newUser = new Users({
    email,
    password: hashPass
  });

  try {
    newUser.save(function(err) {
      if (err) {
        return res.status(500).json({ error: "User not saved" });
      }
      console.log("User saved");
    });
    return res.status(201).json({ message: "User successfully registered" });
  } catch (e) {
    return res.status(400).json({ error: "Error saving the user" });
  }
};

//POST CPF
exports.postCPF = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUser = await Users.findByIdAndUpdate(
      { _id: objectId(userId) },
      { $set: req.body }
    );
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error saving User's CPF." });
  }
};

//POST FULLNAME
exports.postFullnamePerUser = async (req, res) => {
  const userId = req.params.id;
  const objeto = req.body;

  //Get firstName and lastName from FullName
  const fullName = objeto.fullName;
  const first = fullName.substring(0, fullName.indexOf(" "));
  const last = fullName.substring(fullName.indexOf(" ") + 1);

  const namesData = { firstName: first, lastName: last };

  try {
    const currentUser = await Users.findByIdAndUpdate(
      { _id: objectId(userId) },
      { $set: namesData }
    );
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error to add user" });
  }
};

//POST BIRTHDATE
exports.postBdayPerUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUser = await Users.findByIdAndUpdate(
      { _id: objectId(userId) },
      { $set: req.body }
    );
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Erro adding User's birthday." });
  }
};

// POST PHONE NUMBER
// If it does exists just update timestamp, add a new phone number record otherwise
exports.postPhonePerUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUser = await Users.findByIdAndUpdate(
      { _id: objectId(userId) },
      { $addToSet: req.body }
    );
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error adding User's phone number" });
  }
};


//POST ADDRESS
exports.postAddressPerUser = async (req, res) => {
  const userId = req.params.id;
  console.log(req.body)

  const findMatch = await Users.find({
    address: { $elemMatch: req.body }
  });

  try {
    const currentUser = await Users.findByIdAndUpdate(
      { _id: objectId(userId) },
      { $setOnInsert: { address: req.body } },{upsert:true}
    );
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error adding User's address" });
  }
}

