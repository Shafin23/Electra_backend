const express = require("express");
const { productController } = require("../controller/productController");
const router = express.Router();
const { upload } = require("../utility_function/fileUpload")


router.post("/addProduct", upload.array('productImg', 5), productController.addProduct)
router.delete("/removeProduct/:id", productController.removeProduct)
router.put("/editProduct/:id", productController.editProduct)
router.get("/getProductList", productController.getProductList)

// cancel product list
router.post("/cancelProduct", productController.addItemToCancelList)
router.delete("/removeItemFromCancelList", productController.removeItemFromCancelList)
router.get("/getCancelledList", productController.getCancelList)

// return product list
router.post("/returnProduct", productController.addReturnedProduct)
router.delete("/removeItemFromReturnProductList", productController.removeReturnedProduct)
router.get("/getReturnProductList", productController.getReturnedList)

// purchase product
router.post("/purchase", productController.purchaseProduct)

module.exports = router