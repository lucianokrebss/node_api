const Users = require("../models/userModel");
const objectId = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const bcryptSalt = 9;
const fetch = require("node-fetch");

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
        return res.status(500).send({ error: "Error saving the user" });
      }
      console.log("Registro salvo!");
    });
    return res.status(201).send({
      mensagem: "User successfully registered"
    });
  } catch (e) {
    return res.status(400).json({ error: "Error saving the user" });
  }
};

//POST CPF
exports.postCPF = (req, res) => {
  const userId = req.params.id;

  validateCPF();

  async function validateCPF() {
    const userCPF = req.body.cpf;
    const cpf = userCPF.replace(/[^\d]+/g, "");
    if (cpf == "") return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    )
      return res.status(400).json({ error: "Invalid CPF" });

    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return res.status(400).json({ error: "Invalid CPF" });

    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return res.status(400).json({ error: "Invalid CPF" });

    try {
      const currentUser = await Users.findByIdAndUpdate(
        { _id: objectId(userId) },
        { $set: req.body }
      );
      if (!currentUser) {
        return res.status(404).send({
          error: "User not found"
        });
      }
      res.status(200).json({});
    } catch (e) {
      return res.status(400).json({ error: "Error saving User's CPF." });
    }
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
    if (!currentUser) {
      return res.status(404).send({
        error: "User not found"
      });
    }
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
  const phoneNumb = req.body.data;
  console.log(phoneNumb);

  try {
    const currentUser = await Users.updateOne(
      {
        _id: objectId(userId),
        "phoneNumber.data": { $ne: phoneNumb }
      },
      { $addToSet: { phoneNumber: req.body } }
    );

    const currentUser1 = await Users.updateOne(
      { _id: objectId(userId), "phoneNumber.data": phoneNumb },
      {
        $set: {
          "phoneNumber.$.data": phoneNumb,
          "phoneNumber.$.updatedAt": new Date()
        }
      }
    );

    if (!currentUser) {
      return res.status(404).send({
        error: "User not found"
      });
    }
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error adding User's phone number" });
  }
};

//FALTA ATUALIZAR TIMESTAMP - VIDE PHONENUMBER
//POST ADDRESS
exports.postAddressPerUser = async (req, res) => {
  const addressData = req.body;
  const userId = req.params.id;
  let {
    cep,
    street,
    number,
    complement,
    city,
    state,
    authorization
  } = req.body;

  let formatedCEP = cep.replace(/\D/g, "");

  // Address auto-complete from CEP input
  street = await buscarCeps(formatedCEP).then(rua => rua.logradouro);
  complement = await buscarCeps(formatedCEP).then(
    complemento => complemento.complemento
  );
  city = await buscarCeps(formatedCEP).then(cidade => cidade.localidade);
  state = await buscarCeps(formatedCEP).then(estado => estado.uf);

  const adressData = {
    cep,
    street,
    number,
    complement,
    city,
    state,
    authorization
  };

  const isEqual = await Users.aggregate(
    [
      { $project: { address: 1, addressData: 1, sameElements: { $setEquals: [ "$address", "$addressData" ] }, _id: 0 } }
    ]
 )

 console.log(isEqual);

  try {
    const currentUser = await Users.findByIdAndUpdate(
      { _id: objectId(userId) },
      { $push: { address: adressData } }
    );

    if (!currentUser) {
      return res.status(404).send({
        error: "User not found"
      });
    }
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error adding User's address" });
  }
};

const buscarCeps = cep => {
  return fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => json)
    .catch(err => res.status(400).json({ error: "Invalid CEP" }));
};

// POST REQUESTED AMOUNT
exports.postRequestedAmount = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUser = await Users.findByIdAndUpdate(
      { _id: objectId(userId) },
      { $set: req.body }
    );
    if (!currentUser) {
      return res.status(404).send({
        error: "User not found"
      });
    }
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Erro adding User's requested Amount." });
  }
};
