const { default: mongoose } = require("mongoose");
require('dotenv').config();


const connectMongoDB = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6oyupqe.mongodb.net/ecommerce`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(
            console.log("Connected to database")
        )
        .catch(error => {
            console.log(error)
        })
}

module.exports = { connectMongoDB };