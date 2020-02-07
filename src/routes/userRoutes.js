const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

//Rotas

//Register User
router.post("/signup", controller.postSignup); 

//CPF
router.post("/cpf", controller.postCPF);


//FullName
router.post("/fullname/:id", controller.postFullnamePerUser);

//Birthday
//Phone Number
//Address

module.exports = router;