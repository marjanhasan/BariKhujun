const passport = require("passport");
const checkRole = require("./checkRole");

function authenticateAndCheckRole(role) {
    return [
        passport.authenticate("jwt", { session: false }),
        checkRole(role)
    ];
}

module.exports = authenticateAndCheckRole;