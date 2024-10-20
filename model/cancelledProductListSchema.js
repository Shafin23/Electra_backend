const mongoose = require("mongoose");

const cancelledProductListSchema = new mongoose.Schema({
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

const CancelledProductList = mongoose.model("CancelledProductList", cancelledProductListSchema)

module.exports = { CancelledProductList }