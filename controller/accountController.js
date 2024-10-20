const { Account } = require("../model/accountSchema")
const { responseMessages } = require("../utils/responseMessages")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const accountController = {
    registration: async (req, res) => {
        try {
            const { firstName, lastName, email, password, confirmPassword } = req.body;

            // Check if passwords match
            if (password !== confirmPassword) {
                return res.status(400).json({ success: false, message: responseMessages.registeringUsersPasswordMissmatchMessage });
            }

            // craeting hashed password
            const hashedPass = await bcrypt.hash(password, 10)

            // Create a new customer instance
            const newCustomer = new Account({ firstName, lastName, email, password: hashedPass });
            const newCustomerAdded = await newCustomer.save();


            // failed to add the new customer to database
            if (!newCustomerAdded) {
                return res.status(500).json({ success: false, message: responseMessages.registrationFailedMessage });
            }

            res.status(201).json({ success: true, message: responseMessages.registrationSuccessfullMessage });

        } catch (error) {
            res.status(500).json({ success: false, message: responseMessages.registrationFailedMessage, error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // check the user using email
            const customer = await Account.findOne({ email: email });
            const hashedPass = customer.password;

            // check the password correct or not
            const isCorrect = await bcrypt.compare(password, hashedPass)
            if (!isCorrect) {
                return res.status({ success: false, message: responseMessages.puttingWrongPasswordWhileLogin })
            }

            // generating token
            const token = jwt.sign({ customer }, process.env.JWT_SECRET_KEY, { expiresIn: '72h' });
            res.json(token);

        } catch (error) {
            res.status(500).json({ success: false, message: responseMessages.loginFailedMessage, error })
        }
    }  
}

module.exports = { accountController }