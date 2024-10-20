const express = require("express");
const app = express();
const cors = require("cors");
const { connectMongoDB } = require("./utility_function/connectMongodb")
require('dotenv').config();
const port = process.env.PORT || 3000;


// all routers--------------------------------
const account = require("./routers/account")
const product = require("./routers/product")
const contactUs = require("./routers/contactUs")
const wishList = require("./routers/wishList")

// middleware
app.use(cors())
app.use(express.json()); // To parse JSON request bodies

// connect with mongodb
connectMongoDB();

// middleware's to connect routers
app.use("/account", account)
app.use("/product", product)
app.use("/contactUs", contactUs)
app.use("/wishList", wishList)

// Basic route
app.get("/", (req, res) => {
    res.json("Working...")
})

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error." });
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})