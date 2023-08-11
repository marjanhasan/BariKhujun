const handleRouteError = require("./errorHandler");
const House = require("../models/houseModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let pageSize = 5
const handleAddHouse = async (req, res, houseData) => {
    try {
        if (houseData.email) {
            const user = await User.findOne({ email: houseData.email });
            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: 'User not found.',
                });
            }

            houseData = { ...houseData, owner: user._id };
        }

        const newHouse = await House.create(houseData);
        res.status(201).send(newHouse);
    } catch (error) {
        handleRouteError(res, error, null, null);
    }
};
const handleGetHouses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        let givenPageSize = parseInt(req.query.pageSize);
        if (!isNaN(givenPageSize)) {
            pageSize = givenPageSize
        }
        // Count the total number of houses
        const totalHouses = await House.countDocuments();

        // Count total page
        let totalPage = Math.ceil(totalHouses / pageSize)
        if (page > totalPage) {
            res.status(404).send({
                success: false,
                message: "Page number not valid",
                totalPages: totalPage,
            });
            return;
        }
        // Get the paginated houses
        const houses = await House.find().limit(pageSize).skip(skip);

        if (houses.length > 0) {
            res.status(200).send({
                success: true,
                message: "Returned houses",
                data: houses,
                meta: {
                    "Current Page": page,
                    "Total Page": totalPage,
                }
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Houses not found",
            });
        }
    } catch (error) {
        handleRouteError(res, error, null, null)
    }
}
const handleGetHouse = async (req, res) => {
    try {
        const house = await House.findById(req.params.id)
        if (!house) {
            return res.status(404).send({
                success: false,
                message: "House not found with this id",
            });
        }
        res.status(200).send({
            success: true,
            message: "House Retrieved",
            data: house,
        });
    } catch (error) {
        handleRouteError(res, error, null, null)
    }
}
const handleUpdateHouse = async (req, res, houseData) => {
    try {
        const house = houseData;
        // Check if the request body is empty or has no properties
        if (Object.keys(house).length === 0) {
            return res.status(400).send({ message: "Invalid request. No data provided for update." });
        }

        const updatedHouse = await House.findByIdAndUpdate(
            req.params.id,
            { $set: house },
            { new: true }
        );
        if (updatedHouse) {
            res.status(200).send({
                success: true,
                message: "House updated",
                data: updatedHouse,
            });
        } else {
            res.status(404).send({
                success: false,
                message: "House not found with this id",
            });
        }
    } catch (error) {
        handleRouteError(res, error, null, null)
    }
};
const handleDeleteHouse = async (req, res) => {
    try {
        const house = await House.findByIdAndDelete(req.params.id);
        if (!house) {
            return res.status(404).send({
                success: false,
                message: "House not found with this id",
            });
        }

        res.status(200).send({
            success: true,
            message: "House deleted",
            data: house,
        });
    } catch (error) {
        handleRouteError(res, error, null, null);
    }
}
const handleRegisterUser = async (req, res, userData) => {
    try {
        const user = await User.findOne({
            $or: [{ email: userData.email }, { username: userData.username }],
        });
        if (user) return res.status(400).send({
            success: false,
            message: "Email is already being used.",
            data: {
                email: user.email,
            },
        });

        const hash = await bcrypt.hash(userData.password, saltRounds);

        // Check if roles are provided and if 'user' role is missing, add it to the roles array
        let roles = userData.roles || [];
        if (!roles.includes('user')) {
            roles.push('user');
        }

        const newUser = new User({
            name: userData.name,
            roles: roles,
            phone: userData.phone,
            email: userData.email,
            password: hash,
            username: userData.username,
        });

        await newUser.save();
        res.send({
            success: true,
            message: "User is created successfully",
            data: {
                name: newUser.name,
            },
        });
    } catch (error) {
        handleRouteError(res, error,null, null);
    }
};

module.exports = {
    handleGetHouse,
    handleGetHouses,
    handleAddHouse,
    handleUpdateHouse,
    handleDeleteHouse,
    handleRegisterUser,
};
