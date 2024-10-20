const jwt = require('jsonwebtoken');
const { responseMessages } = require('../utils/responseMessages');

const verifyToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ success: false, message: responseMessages.invalidJWTToken  });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: responseMessages.invalidJWTToken });

        // Attach user information to the request object
        req.user = user;
        next();
    });
}

module.exports = { verifyToken };