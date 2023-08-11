const House = require("../models/houseModel");
const handleRouteError = require("../utils/errorHandler");
const {handleGetHouse, handleGetHouses, handleRegisterUser} = require("../utils/utils");

async function getHouses (req, res) {
    await handleGetHouses(req, res)
}
async function getHouse (req, res) {
    await handleGetHouse(req, res)
}
async function registerUser (req, res) {
    await handleRegisterUser(req, res, req.body)
}
module.exports = {getHouses, getHouse, registerUser}