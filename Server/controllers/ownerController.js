const House = require("../models/houseModel");
const handleRouteError = require("../utils/errorHandler");
const User = require("../models/userModel");
const {handleAddHouse, handleUpdateHouse} = require("../utils/utils");

async function getOwnerHouses (req, res){
    try {
        const user = req.user;
        // Find all houses owned by the user based on the owner field
        const houses = await House.find({ owner: user._id });
        res.status(200).send(houses);
    } catch (error) {
        handleRouteError(error);
    }
}
async function addHouseByOwner (req, res) {
    await handleAddHouse(req, res, req.body)
};
async function updateHouseByOwner (req, res) {
    await handleUpdateHouse(req, res, req.body)
}

async function deleteHouseByOwner (req, res) {

}

module.exports = {getOwnerHouses, addHouseByOwner, updateHouseByOwner, deleteHouseByOwner}