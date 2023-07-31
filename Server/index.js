const dotenv = require("dotenv");
const path = require("path");
const { getDynamicDirname } = require("./config");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();
const checkRole = require("./middleware/checkRole");
// Import routes
const houseRoutes = require("./routes/houseRoutes");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const miscellaneousRoutes = require("./routes/miscellaneousRoutes");
// config file
const envPath = path.resolve(getDynamicDirname(), "config", ".env");
dotenv.config({ path: envPath });
// DB connection...
const connectDb = require("./db/connect");

// Port Declaration
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Passport JWT Strategy
require("./config/passport");

// Use routes
app.use(houseRoutes);
app.use(userRoutes);
app.use('/owner', checkRole("owner"), ownerRoutes);
app.use(miscellaneousRoutes);

// Start the server
app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
    await connectDb();
});