const House = require("../models/houseModel");
const handleRouteError = require("../utils/errorHandler");
const {handleGetHouse, handleGetHouses} = require("../utils/utils");

async function getHouses (req, res) {
    await handleGetHouses(req, res)
}
async function getHouse (req, res) {
    await handleGetHouse(req, res)
}

module.exports = {getHouses, getHouse}