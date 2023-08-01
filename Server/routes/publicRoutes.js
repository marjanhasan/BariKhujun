const router = require("express").Router();
const {getHouses, getHouse} = require("../controllers/publicController");

// Get houses with pagination
router.get("/houses", getHouses);
//Get a single house by ID
router.get("/houses/:id", getHouse);

module.exports = router;