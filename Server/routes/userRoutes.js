const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/userModel");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const saltRounds = 10;

// User Registration
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required."),
        body("roles").isArray().withMessage("Roles should be an array\""),
        body("phone").isString().withMessage("Phone should be a string"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Customize the errors array
            const customErrors = errors.array().map((error) => ({
                field: error.path,
                message: `Validation failed for field '${error.path}': ${error.msg}`, // Customize the error message
            }));
            return res.status(400).send({
                success: false,
                message: "Field validation failed",
                errors: customErrors,
            });
        }
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
        handleRouteError(res, error);
    }
});

// Bulk User Registration
router.post(
    "/bulk-register",
    async (req, res) => {
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
        handleRouteError(error)
    }
});

// User Login
// User Login
router.post("/login", async (req, res) => {
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

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "2h",
        });

        res.status(200).send({
            success: true,
            message: "User is logged in successfully",
            data: {
                "access-token": "Bearer" + token,
            },
        });
    } catch (error) {
        handleRouteError(res, error);
    }
});

// User Profile Route (protected)
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
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
            handleRouteError(res, error);
        }
    }
);


module.exports = router;
