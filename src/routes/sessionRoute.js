const express = require("express");
const router = express.Router();
const controller = require("../controllers/sessionController");

router.post("/login", controller.getToken);



module.exports = router;