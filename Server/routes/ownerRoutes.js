const {getOwnerHouses, addHouseByOwner, getOwnerHouse, updateHouseByOwner, deleteHouseByOwner} = require("../controllers/ownerController");
const router = require("express").Router();

router.get("/houses", getOwnerHouses);
router.get("/house/:id", getOwnerHouse);
router.post("/house", addHouseByOwner);
router.put("/house/:id", updateHouseByOwner);
router.delete("/house/:id", deleteHouseByOwner)

module.exports = router;