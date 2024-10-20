const { ContactUS } = require("../model/contactUsSchema");
const { responseMessages } = require("../utils/responseMessages");

const contactUSController = {
    sendMessage: async (req, res) => {
        try {
            const { name, email, phoneNumber, message } = req.body;

            const newMessageAdding = new ContactUS({ name, email, phoneNumber, message })
            const newMessageAdded = await newMessageAdding.save();

            if (!newMessageAdded) {
                return res.json({ success: false, message: responseMessages.failedToSendMessage })
            }
            res.json({ success: true, message: responseMessages.successfullySendMessage })
        } catch (error) {

        }
    }
}

module.exports = { contactUSController }