const User = require("../models/userModel");
const handleRouteError = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
async function refreshToken (req, res) {
    try {
        // Check if the refresh token is valid and belongs to a user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Invalid refresh token',
            });
        }

        // Generate a new access token
        const accessToken = jwt.sign({ id: user._id, name: user.name }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h', // New access token expires in 1 hour
        });
        // Generate refresh token
        const refreshToken = jwt.sign({ id: user._id, name: user.name }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d', // Refresh token expires in 7 days
        });

        // Send the new access token to the client
        res.status(200).send({
            success: true,
            message: 'Access token refreshed successfully',
            data:{
                "Access Token": accessToken,
                "Refresh Token": refreshToken,
            },
        });
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Invalid refresh token',
        });
    }
}
async function getProfile(req, res) {
    try {
        const { _id, name, email, username } = req.user;
        return res.status(200).send({
            success: true,
            message: "User authenticated",
            data: {
                "user": {
                    id: _id,
                    name: name,
                    email: email,
                    username: username,
                }
            },
        });
    } catch (error) {
        handleRouteError(res, error, null, null);
    }
}

module.exports = {refreshToken, getProfile}