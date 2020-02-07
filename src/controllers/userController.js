const Users = require("../models/userModel");
const objectId = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const bcryptSalt = 8;

//Post New User


//Post CPF
exports.postCPF = async (req, res) => {
  const { cpf } = req.body;

  const newCpf = new Users({
    cpf
  });

  try {
    newCpf.save(function(err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error while saving User's CPF" });
      }
      console.log("CPF salvo!");
    });
    return res.status(201).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error while sending User's CPF" });
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
<<<<<<< HEAD
    if (currentUser == 0) {
      return res.status(404).send({
        error: `User was not found`
      });
    }
=======
>>>>>>> ad373b4e11c4ad39886128f175f09c4d6c82834c
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
    return res.status(400).json({ error: "Erro ao incluir data de aniversário do usuário." });
  }
};


// POST PHONE NUMBER
exports.postPhonePerUser = async (req, res) => {
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
    return res
      .status(400)
      .json({ error: "Erro ao incluir número de telefone do usuário." });
  }
}