const router = require("express").Router();
const {addHouse, addHouses, getHouses, getHouse, deleteHouse, updateHouse} = require("../controllers/houseController");

// Add a new house
router.post("/addhouse", addHouse);
// Add multiple houses
router.post("/addhouses", addHouses);
// Get houses with pagination
router.get("/houses", getHouses);
//Get a single house by ID
router.get("/houses/:id", getHouse);
// Delete a house by ID
router.delete("/houses/:id", deleteHouse);
// Update a house by ID
router.put("/houses/:id", updateHouse);

module.exports = router;
