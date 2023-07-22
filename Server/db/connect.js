// src/db/connect.js

// const mongoose = require("mongoose");
const {connect} = require("mongoose");

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;