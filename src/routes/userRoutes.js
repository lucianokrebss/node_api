const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

//Rotas

//CPF
router.post("/cpf", controller.postCPF);


//FullName
router.post("/fullname/:id", controller.postFullnamePerUser);

//Birthday
//Phone Number
//Address

module.exports = router;