const Users = require("../models/userModel");
const objectId = require("mongodb").ObjectID;

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
          .json({ error: "Erro ao salvar o CPF do usuário" });
      }
      console.log("CPF salvo!");
    });
    return res.status(201).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Erro ao enviar o CPF do usuário" });
  }
};

//Post FullName per user
exports.postFullnamePerUser = async (req, res) => {
  const userId = req.params.id;
  const {fullName} = req.body;
  console.log(fullName);
  const firstName = {fullName}.substr(0,fullName.indexOf(' '));
  const lastName = {fullName}.substr(fullName.indexOf(' ')+1);

console.log(firstName);
console.log(lastName);

  try {
    const currentUser = await Users.findByIdAndUpdate(
      { _id: ObjectID(userId) },
      { $set: { firstName, lastName } }
    );
    if (currentUser == 0) {
      return res.status(404).send({
        error: `Não foi possível localizar o usuário.`
      });
    }
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Erro ao incluir nome do usuário." });
  }
};
