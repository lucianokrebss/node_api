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
      console.log("User registered!");
    });
    return res.status(201).send({
      message: "User successfully registered"
    });
  } catch (e) {
    return res.status(400).json({ error: "Error saving the user" });
  }
};

//POST CPF
exports.postCPF = async (req, res) => {
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

    // Validate 1st digit
    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return res.status(400).json({ error: "Invalid CPF" });

    // Validate 2nd digit
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
      console.log("User's CPF added!");
      return res.status(200).json({ success: true });
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
    console.log("Username added!");
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error adding user's name" });
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
    console.log("User's birthday added!");
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error adding User's birthday." });
  }
};

// POST PHONE NUMBER
// If it does exists just update timestamp, add a new phone number record otherwise
exports.postPhonePerUser = async (req, res) => {
  const userId = req.params.id;
  const phoneNumb = req.body.data;

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
    console.log("User's phone number added!");
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res.status(400).json({ error: "Error adding User's phone number" });
  }
};

//POST ADDRESS
//If user input a different street a new register is created, update otherwise.
exports.postAddressPerUser = async (req, res) => {
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

  try {
    const currentUser = await Users.updateOne(
      {
        _id: objectId(userId),
        "address.street": { $ne: street }
      },
      { $addToSet: { address: adressData } }
    );

    const currentUser1 = await Users.updateOne(
      { _id: objectId(userId), "address.street": street },
      {
        $set: {
          "address.$.cep": cep,
          "address.$.street": street,
          "address.$.number": number,
          "address.$.complement": complement,
          "address.$.city": city,
          "address.$.data": state,
          "address.$.updatedAt": new Date()
        }
      }
    );

    if (!currentUser) {
      return res.status(404).send({
        error: "User not found"
      });
    }
    console.log("User's address added!");
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
    console.log("User's requested amount added!");
    res.status(200).json({
      success: true
    });
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Erro adding User's requested Amount." });
  }
};
