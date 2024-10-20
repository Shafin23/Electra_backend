const { CancelledProductList } = require("../model/cancelledProductListSchema");
const { Product } = require("../model/productSchema");
const { ReturnedProductList } = require("../model/returnedProductListSchema");
const { getFormattedDate } = require("../utility_function/date");
const { responseMessages } = require("../utils/responseMessages")

// stripe 
const stripe = require("stripe")("sk_test_51OY48pCg3UF6njdMIGMex9SQFX49Hl36mb8yI20UV3M5HtIj3meONK8fF2YAaSp98DHENkED2aPt3JuI9Ypd7oXI00qqrB0fF5");


const productController = {
    addProduct: async (req, res) => {
        try {
            const { files } = req;
            const {
                productName,
                currentPrice,
                previousPrice,
                ratings,
                review,
                description,
                stockNumber,
                discount,
                isDiscountAvailable
            } = req.body;

            const productImg = [...files];

            const newProduct = new Product({
                productName,
                currentPrice,
                previousPrice,
                ratings,
                review,
                description,
                stockNumber,
                discount,
                productImg,
                isDiscountAvailable
            })
            const newProductAdded = await newProduct.save();

            if (!newProductAdded) {
                return res.json({ success: false, message: responseMessages.failedToAddProduct })
            }
            res.json({ success: true, message: responseMessages.successMsgToAddProduct, newProduct: newProductAdded })


        } catch (error) {
            res.status(500).json({
                success: false,
                error,
                message: responseMessages.failedToAddProduct
            })
        }
    },
    removeProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const removeProduct = await Product.deleteOne({ _id: id });

            if (!removeProduct) {
                return res.json({ success: false, message: responseMessages.failedToRemoveProduct })
            }

            res.json({ success: true, message: responseMessages.successMsgToRemoveProduct })

        } catch (error) {
            res.json({ success: false, message: responseMessages.failedToRemoveProduct })
        }
    },
    editProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                productName,
                currentPrice,
                previousPrice,
                ratings,
                review,
                description,
                stockNumber,
                discount,
                isDiscountAvailable
            } = req.body;

            const updateProduct = await Product.updateOneById(
                { _id: id },
                {
                    productName,
                    currentPrice,
                    previousPrice,
                    ratings,
                    review,
                    description,
                    stockNumber,
                    discount,
                    isDiscountAvailable
                },
                { new: true }
            )

            if (!updateProduct) {
                return res.json({
                    success: false,
                    message: responseMessages.failedToEditProduct
                })
            }

            res.json({
                success: true,
                message: responseMessages.successfullMsgToEditProduct,
                updatedProduct: updateProduct
            })

        } catch (error) {
            res.json({ success: false, error, message: responseMessages.failedToEditProduct })
        }
    },
    getProductList: async (req, res) => {
        try {
            const productList = await Product.find();
            if (!productList) {
                return res.json({ success: false, message: "something went wrong" })
            }
            res.json({ success: true, message: "List available", productList })
        } catch (error) {
            res.json({ success: false, message: "Something went wrong", error })
        }
    },
    // cancel list
    getCancelList: async (req, res) => {
        try {
            const { userEmail } = req.params;

            // Step 1: Get the list of cancelled items by user email
            const cancelledItems = await CancelledProductList.find({ email: userEmail });

            // Step 2: Extract product IDs from the cancelled items
            const productIds = cancelledItems.map(item => item.productId);

            // Step 3: Find the products that match the productIds from the CancelledProductList
            const matchedProducts = await Product.find({ _id: { $in: productIds } });


            // Step 5: Return the list of cancelled items with matched product details
            res.json({ success: true, message: "Cancelled items retrieved successfully", data: matchedProducts });
        } catch (error) {
            res.json({ success: false, message: "Something went wrong", error: error.message });
        }
    },
    addItemToCancelList: async (req, res) => {
        try {
            const { cancelledItem, email } = req.body;
            const cancelling = new CancelledProductList({ email, productId: cancelledItem._id, date: getFormattedDate() })
            const cancelled = await cancelling.save();
            if (!cancelled) {
                return res.json({ message: "something went wrong", success: false })
            }
            res.json({ success: true, message: "remove the item from the list" })
        } catch (error) {
            res.json({ success: false, message: "something went wrong" })
        }
    },
    removeItemFromCancelList: async (req, res) => {
        try {
            const { productId, email } = req.body;

            // Find and delete the item by productId and email
            const removedItem = await CancelledProductList.findOneAndDelete({
                email: email,
                productId: productId
            });

            // Check if the item was found and deleted
            if (!removedItem) {
                return res.json({ success: false, message: "Item not found or already removed" });
            }

            res.json({ success: true, message: "Item successfully removed from cancel list" });
        } catch (error) {
            // Error handling
            res.json({ success: false, message: "Something went wrong", error });
        }
    },
    // returun product list
    addReturnedProduct: async (req, res) => {
        try {
            const { email, productId } = req.body;

            // Create a new returned product entry
            const returnedProduct = new ReturnedProductList({
                email,
                productId,
                date: getFormattedDate() // assuming you already have a getFormattedDate function
            });

            // Save the returned product to the database
            const savedProduct = await returnedProduct.save();

            if (!savedProduct) {
                return res.json({ success: false, message: "Failed to add returned product" });
            }

            res.json({ success: true, message: "Product added to returned list", data: savedProduct });
        } catch (error) {
            res.json({ success: false, message: "Something went wrong", error: error.message });
        }
    },
    removeReturnedProduct: async (req, res) => {
        try {
            const { email, productId } = req.body;

            // Find and delete the returned product by email and productId
            const removedProduct = await ReturnedProductList.findOneAndDelete({
                email: email,
                productId: productId
            });

            if (!removedProduct) {
                return res.json({ success: false, message: "Product not found or already removed" });
            }

            res.json({ success: true, message: "Product removed from returned list" });
        } catch (error) {
            res.json({ success: false, message: "Something went wrong", error: error.message });
        }
    },
    getReturnedList: async (req, res) => {
        try {
            const { email } = req.params;

            // Find all returned products for the given email
            const returnedProducts = await ReturnedProductList.find({ email: email });


            // Step 2: Extract product IDs from the cancelled items
            const productIds = returnedProducts.map(item => item.productId);

            // Step 3: Find the products that match the productIds from the CancelledProductList
            const matchedProducts = await Product.find({ _id: { $in: productIds } });

            res.json({ success: true, message: "Returned products retrieved successfully", data: matchedProducts });
        } catch (error) {
            res.json({ success: false, message: "Something went wrong", error: error.message });
        }
    }
}

module.exports = { productController }