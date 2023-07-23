const express = require("express");
const router = express.Router();

// Home Route
router.get("/", (req, res) => {
    res.send("<h1>Welcome to the Server</h1>");
});

// Resource Not Found
router.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found",
    });
});

// Server Error
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

module.exports = router;
