const router = require("express").Router();
const passport = require("passport");
const {validateLoginInput, handleValidationErrors, validateRegisterInput} = require("../middleware/validateUserInput");
const {registerUser, loginUser, refreshToken, getProfile} = require("../controllers/userController");

// User Registration
router.post("/register", validateRegisterInput, handleValidationErrors, registerUser);
// User Login
router.post("/login", validateLoginInput, handleValidationErrors, loginUser);
//Refreshes access token for the user
router.post('/refresh-token', refreshToken);
// User Profile Route (protected)
router.get("/profile", passport.authenticate("jwt", { session: false }), getProfile);

module.exports = router;
