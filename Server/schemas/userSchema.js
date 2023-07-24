const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    roles: {
        type: Array,
        require: true,
        default: "user",
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;