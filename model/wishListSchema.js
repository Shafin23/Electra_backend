const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
    email: {
        type: String
    },
    wishlist: {
        type: Array
    },
})

const WishList = mongoose.model("WishList", wishListSchema)

module.exports = { WishList }