const {getOwnerHouses} = require("../controllers/ownerController");
const router = require("express").Router();

router.get("/houses", getOwnerHouses);
router.post("/house", addHouseByOwner);
router.put("/house/:id", updateHouseByOwner);
router.delete("/house/:id", deleteHouseByOwner)

module.exports = router;