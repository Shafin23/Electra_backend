const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    message: {
        type: String
    }
})

const ContactUs = mongoose.model("ContactUS", contactUsSchema)

module.exports = { ContactUs }