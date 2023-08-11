const mongoose = require("mongoose");
const {stringify} = require("nodemon/lib/utils");

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
    },
    username: {
        type: String,
        require: true,
        unique: true,
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;