const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

//Rotas

//Register User
router.post("/signup", controller.postSignup); 

//CPF
router.post("/CPF", controller.postCPF);


//FullName
router.post("/fullname/:id", controller.postFullnamePerUser);

//Birthday
router.post("/birthday/:id", controller.postBdayPerUser);

//Phone Number
router.post("/phone/:id", controller.postPhonePerUser);

//Address
router.post("/address/:id", controller.postAddressPerUser);


module.exports = router;