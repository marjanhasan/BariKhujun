const House = require("../models/houseModel");
const User = require("../models/userModel");
const handleRouteError = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const {handleAddHouse, handleUpdateHouse, handleRegisterUser} = require("../utils/utils");

async function addHouse (req, res) {
    await handleAddHouse(req, res, req.body)
};
async function addHouses (req, res) {
    try {
        const houses = req.body;

        if (!Array.isArray(houses) || houses.length === 0) {
            return res.status(400).send({ message: "Invalid request. The request body should be a non-empty array of house objects." });
        }

        // Process each house object in the array
        for (const house of houses) {
            const { email, username } = house;
            if (email || username) {
                // Find the user based on the provided email or username
                const user = await User.findOne({ $or: [{ email }, { username }] });
                if (!user) {
                    return res.status(400).send({
                        success: false,
                        message: 'User not found for a house.',
                    });
                }

                // Link the house to the user using their id
                house.owner = user._id;
            }
        }

        const insertedHouses = await House.insertMany(houses);
        res.status(201).send(insertedHouses);
    } catch (error) {
        handleRouteError(res, error, null, null);
    }
};
async function deleteHouse (req, res) {
    try {
        const house = await House.findByIdAndDelete(req.params.id);
        if (!house) {
            return res.status(404).send({
                success: false,
                message: "House not found with this id",
            });
        }

        res.status(200).send({
            success: true,
            message: "House deleted",
            data: house,
        });
    } catch (error) {
        handleRouteError(res, error, null, null);
    }
};
async function updateHouse (req, res) {
    await handleUpdateHouse(req, res, req.body);
};
async function registerUser (req, res) {
    await handleRegisterUser(req, res, req.body)
}
async function updateUser (req, res) {
    try {
        const userId = req.params.userId;

        let roles = req.user.roles || [];
        // Check if the logged-in user is an admin
        if (!!roles.includes('admin')){
            return res.status(403).send({
                success: false,
                message: 'You are not authorized to update user roles.',
            });
        }

        // Find the user by _id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found.',
            });
        }

        // Update the user's role
        const { role } = req.body;
        user.role = role;
        await user.save();

        res.status(200).send({
            success: true,
            message: 'User role updated successfully.',
            user: {
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        handleRouteError(res, error, null, null);
    }
}
async function deleteUser (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found with this id",
            });
        }

        res.status(200).send({
            success: true,
            message: "User deleted",
            data: user,
        });
    } catch (error) {
        handleRouteError(res, error, null, null);
    }
};
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
};

module.exports = {addHouse, addHouses, updateHouse, deleteHouse, bulkRegistration, addUser: registerUser, updateUser, deleteUser};