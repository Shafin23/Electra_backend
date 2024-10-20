
const express = require("express");
const { wishListController } = require("../controller/wishListController");
const router = express.Router();

router.post("/add", wishListController.addToWishList)
router.delete("/remove", wishListController.removeProductFromWishList)

module.exports = { router }