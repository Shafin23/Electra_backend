const responseMessages = {
    // registration
    registrationFailedMessage: "Account creation failed",
    registrationSuccessfullMessage: "Registration successful.",
    registeringUsersPasswordMissmatchMessage: "Passwords do not match.",

    // login
    loginFailedMessage: "Login failed. Try again.",
    puttingWrongPasswordWhileLogin: "Incorrect password",


    // jwt
    invalidJWTToken: "No token provided",

    // add product
    failedToAddProduct: "Failed to add product",
    successfullyAddedProduct: "successfully added product",
    successMsgToAddProduct: "Successfully added",

    // remove product
    failedToRemoveProduct: "Failed to remove product",
    successMsgToRemoveProduct: "Successfully removed",

    // edit product
    failedToEditProduct: "Failed to edit",
    successfullMsgToEditProduct: "Successfilly edited",

    // contact us message
    failedToSendMessage: "Failed to send message",
    successfullySendMessage: "Message send",

    // wishlist
    addProductToWishList: "Added to wishlist",
    failedToAddProductToWishList: "Failed to add", 
    failedToRemoveFromWishList: "Failed to remove",
    successfullyRemovedFromWishList: "Successfully removed"


}

module.exports = { responseMessages }