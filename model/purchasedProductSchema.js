const mongoose = require("mongoose");

const purchasedProducttListSchema = new mongoose.Schema({
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

const PurchasedProduct = mongoose.model("purchasedProducttListSchema", purchasedProducttListSchema)

module.exports = { PurchasedProduct }