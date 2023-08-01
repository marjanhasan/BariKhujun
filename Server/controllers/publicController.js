const House = require("../models/houseModel");
let pageSize = 5
const handleRouteError = require("../utils/errorHandler");

async function getHouses (req, res) {
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
async function getHouse (req, res) {
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

module.exports = {getHouses, getHouse}