const express = require("express");
const House = require("../models/houseModel");
const router = express.Router();
let pageSize = 5

// Add a new house
router.post("/addhouse", async (req, res) => {
    try {
        const houseData = await House.create(req.body);
        res.status(201).send(houseData);
    } catch (error) {
        handleRouteError(res, error);
    }
});
// Add multiple houses
router.post("/addhouses", async (req, res) => {
    try {
        const houses = req.body; // Assuming the request body is an array of house objects

        if (!Array.isArray(houses) || houses.length === 0) {
            return res.status(400).send({ message: "Invalid request. The request body should be a non-empty array of house objects." });
        }

        const insertedHouses = await House.insertMany(houses);
        res.status(201).send(insertedHouses);
    } catch (error) {
        handleRouteError(res, error);
    }
});
// Get houses with pagination
router.get("/houses", async (req, res) => {
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
                currentPage: page,
                totalPages: totalPage,
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Houses not found",
            });
        }
    } catch (error) {
        handleRouteError(res, error)
    }
});

//Get a single house by ID
router.get("/houses/:id", async (req, res) => {
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
        handleRouteError(res, error)
    }
})
// Delete a house by ID
router.delete("/houses/:id", async (req, res) => {
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
        handleRouteError(res, error);
    }
});
// Update a house by ID
router.put("/houses/:id", async (req, res) => {
    try {
        const house = req.body;
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
        res.status(500).send({
            message: error.message,
        });
    }
});
function handleRouteError(res, error) {
    if (error.name === "MongoError" && error.code === 18) {
        res.status(503).send({ message: "Database unavailable" });
    } else if (error.name === "ValidationError") {
        res.status(400).send({ message: "Invalid request" });
    } else {
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports = router;
