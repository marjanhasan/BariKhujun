const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const handleRouteError = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const {handleRegisterUser} = require("../utils/utils");
const saltRounds = 10;
async function loginUser (req, res) {
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }],
        });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User not found",
            });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password",
                data: {
                    desc: "Provide valid password"
                },
            });
        }

        // User authentication successful, generate access token
        const accessToken = jwt.sign({ id: user._id, name: user.name }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h', // Access token expires in 1 hour
        });

        // Generate refresh token
        const refreshToken = jwt.sign({ id: user._id, name: user.name }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d', // Refresh token expires in 7 days
        });

        res.status(200).send({
            success: true,
            message: "User is logged in successfully",
            data: {
                "access-token": "Bearer " + accessToken,
                "refresh-token": "Bearer " + refreshToken,

            },
        });
    } catch (error) {
        handleRouteError(res, error,null,null);
    }
}
async function refreshToken (req, res) {
    const refreshToken = req.headers['refresh-token']
    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Check if the refresh token is valid and belongs to a user
        const user = await User.findById(decoded.id);
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

module.exports = {loginUser, refreshToken, getProfile}