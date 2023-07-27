const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/userModel");
const router = express.Router();
const {validateLoginInput, handleValidationErrors, validateRegisterInput} = require("../middleware/validateUserInput");
const handleRouteError = require("./errorHandler")
const {registerUser, loginUser, bulkRegistration, refreshToken, getProfile} = require("../controllers/userController");

// User Registration
router.post("/register", validateRegisterInput, handleValidationErrors, registerUser);
// Bulk User Registration
router.post("/bulk-register", bulkRegistration);
// User Login
router.post("/login", validateLoginInput, handleValidationErrors, loginUser);
//Refreshes access token for the user
router.post('/refresh-token', refreshToken);
// User Profile Route (protected)
router.get("/profile", passport.authenticate("jwt", { session: false }), getProfile);


module.exports = router;
