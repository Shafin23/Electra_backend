const mongoose = require("mongoose");

const returnedProductListSchema = new mongoose.Schema({
    email: {
        type: String
    },
    productId: {
        type: String
    },
    date: {
        type: String
    }
})

const ReturnedProductList = mongoose.model("ReturnedProductList", returnedProductListSchema)

module.exports = { ReturnedProductList }