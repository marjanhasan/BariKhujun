const House = require("../models/houseModel");
const handleRouteError = require("../utils/errorHandler");
const {handleGetHouse, handleGetHouses, handleRegisterUser} = require("../utils/utils");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function getHouses (req, res) {
    await handleGetHouses(req, res)
}
async function getHouse (req, res) {
    await handleGetHouse(req, res)
}
async function registerUser (req, res) {
    await handleRegisterUser(req, res, req.body)
}

async function loginUser (req, res) {
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.user }, { username: req.body.user }],
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
module.exports = {getHouses, getHouse, registerUser, loginUser}