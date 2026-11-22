const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, roles: user.roles },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
};

const generateRefreshToken = () => {
    // Use random UUID instead of JWT for refresh token (more secure for rotation)
    return uuidv4();
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};