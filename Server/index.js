const dotenv = require("dotenv");
const path = require("path");
const { getDynamicDirname } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const saltRounds = 10;
const app = express();

// config file
const envPath = path.resolve(getDynamicDirname(), "config", ".env");
dotenv.config({ path: envPath });
// Port Declaration
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

const connectDb = require("./db/connect");

// Home Route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Server</h1>");
});

// Start the server
app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
    await connectDb();
});