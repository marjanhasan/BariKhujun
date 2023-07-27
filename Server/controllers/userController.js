const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const handleRouteError = require("../routes/errorHandler");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
async function registerUser (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send({
            success: false,
            message: "Email is already being used.",
            data: {
                email: user.email,
            },
        });

        const hash = await bcrypt.hash(req.body.password, saltRounds);

        // Check if roles are provided and if 'user' role is missing, add it to the roles array
        let roles = req.body.roles || [];
        if (!roles.includes('user')) {
            roles.push('user');
        }

        const newUser = new User({
            name: req.body.name,
            roles: roles,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.send({
            success: true,
            message: "User is created successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
            },
        });
    } catch (error) {
        handleRouteError(res, error,null, null);
    }
}
// bulkRegistration - regiters a user
async function bulkRegistration (req, res) {
    try {
        const users = req.body; // Assuming the request body is an array of user objects

        if (!Array.isArray(users)) {
            return res.send({
                success: false,
                message: "Invalid request",
                data: {
                    desc: "Provide valid array",
                },
            });
        }

        if (users.length === 0) {
            return res.send({
                success: true,
                message: "Invalid request",
                data: {
                    desc: "Request body can not be empty"
                },
            });
        }

        const existingEmails = await User.find({ email: { $in: users.map(user => user.email) } });
        const existingEmailSet = new Set(existingEmails.map(user => user.email));

        const newUserPromises = users.map(async user => {
            if (!existingEmailSet.has(user.email)) {
                if (!user.roles) {
                    user.roles = ["user"]; // Initialize roles array with "user" if not provided
                } else if (!user.roles.includes("user")) {
                    user.roles.push("user"); // Add "user" to roles array if not already present
                }

                const hash = await bcrypt.hash(user.password, saltRounds);
                const newUser = new User({
                    name: user.name,
                    roles: user.roles,
                    phone: user.phone,
                    email: user.email,
                    password: hash,
                });
                return newUser.save();
            }
            return null;
        });

        const insertedUsers = await Promise.all(newUserPromises);

        const registeredUsers = insertedUsers.filter(user => user !== null);
        res.status(201).send({
            success: true,
            message: "Users registered Successfully",
            data: registeredUsers,
        });
    } catch (error) {
        handleRouteError(res, error, null, null)
    }
}
// loginUser - Logs in a user
async function loginUser (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

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

        const payload = {
            id: user._id,
            name: user.name,
        };

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
//
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

        // Send the new access token to the client
        res.status(200).send({
            success: true,
            message: 'Access token refreshed successfully',
            accessToken,
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
        const { _id, name, email } = req.user;
        return res.status(200).send({
            success: true,
            message: "User authenticated",
            data: {
                "user": {
                    id: _id,
                    name: name,
                    email: email,
                }
            },
        });
    } catch (error) {
        handleRouteError(res, error, null, null);
    }
}

module.exports = {registerUser, loginUser, bulkRegistration, refreshToken, getProfile}