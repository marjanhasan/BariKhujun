// config.js
const path = require("path");

// Function to dynamically calculate __dirname
function getDynamicDirname() {
    return path.resolve(process.cwd());
}

module.exports = {
    getDynamicDirname,
};