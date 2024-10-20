const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String
    },
    previousPrice: {
        type: Number
    },
    currentPrice: {
        type: Number
    },
    isDiscountAvailable: {
        type: Boolean
    },
    discount: {
        type: Number
    },
    reviews: {
        type: Array
    },
    ratings: {
        type: Number
    },
    stockNumber: {
        type: Number
    },
    productImgs: {
        type: Object
    },
    date: {
        type: String
    }

})

const Product = mongoose.model("Product", productSchema)

module.exports = { Product }