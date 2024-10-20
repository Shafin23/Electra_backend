const express = require("express");
const router = express.Router();
const { accountController } = require("../controller/accountController")
require('dotenv').config();

router.post("/registration", accountController.registration);
router.post("/login", accountController.login)

module.exports = router 