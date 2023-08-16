const {check} = require("express-validator");

function checkRole(role) {
    return (req, res, next) => {
        const user = req.user;
        if (user && user.roles.includes(role)) {
            next();
        } else {
            res.status(403).json({
                message: "Access Denied"
            });
        }
    }
}

module.exports = checkRole;