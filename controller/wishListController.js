const { WishList } = require("../model/wishListSchema");
const { Product } = require("../model/productSchema")
const { responseMessages } = require("../utils/responseMessages");

const wishListController = {
    addToWishList: async (req, res) => {
        try {
            const { productId, userEmail } = req.body;

            const getTheProduct = await Product.findOne({ _id: productId });
            if (!getTheProduct) {
                return res.json({ success: false, message: "Product is missing" })
            }

            const updating = await WishList.findOneAndUpdate(
                { email: userEmail },
                { $push: { wishlist: getTheProduct } },
                { upsert: true }
            )
            if (!updating) {
                return res.json({ success: false, message: "Something went wrong" })
            }
            res.json({ success: true, message: "Item is added to the wishlist" })

        } catch (error) {
            res.json({ success: false, message: responseMessages.failedToAddProductToWishList })
        }
    },
    removeProductFromWishList: async (req, res) => {
        try {
            const { productId, userEmail } = req.param;
            const removingItem = await WishList.deleteOne({ _id: productId })

            const removing = await findOneAndUpdate(
                { email: email },
                { $pull: { wishlist: removingItem } },
                { new: true }
            )
            if (!removing) {
                return res.json({ success: false, message: "something went wrong" })
            }

            res.json({ success: true, message: responseMessages.successfullyRemovedFromWishList })

        } catch (error) {
            res.json({ success: false, message: responseMessages.failedToRemoveFromWishList })
        }
    }
}

module.exports = { wishListController }