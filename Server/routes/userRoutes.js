const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/userModel");
const router = express.Router();
const saltRounds = 10;

// User Registration
router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send({
            success: false,
            message: "Email is already being used.",
            user: {
                email: user.email,
            },
        });

        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            name: req.body.name,
            role: req.body.role,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.send({
            success: true,
            message: "User is created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
            },
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// User Login
router.post("/login", async (req, res) => {
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
        });
    }

    const payload = {
        id: user._id,
        name: user.name,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
    });

    return res.status(200).send({
        success: true,
        message: "User is logged in successfully",
        token: "Bearer " + token,
    });
});

// User Profile Route (protected)
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
    return res.status(200).send({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        },
    });
});


module.exports = router;
