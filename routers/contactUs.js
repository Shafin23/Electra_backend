const express = require("express");
const { contactUSController } = require("../controller/contactUSController");
const router = express.Router();

router.post("/sendMessage", contactUSController.sendMessage)

module.exports =  router 