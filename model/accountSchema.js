const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

const Account = mongoose.model("Account", accountSchema);

module.exports = { Account };
