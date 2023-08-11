const router = require("express").Router();
const passport = require("passport");
const {refreshToken, getProfile} = require("../controllers/userController");

//Refreshes access token for the user
router.post('/refresh-token', refreshToken);
// User Profile Route (protected)
router.get("/profile", passport.authenticate("jwt", { session: false }), getProfile);

module.exports = router;
