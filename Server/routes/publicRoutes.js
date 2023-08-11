const router = require("express").Router();
const {getHouses, getHouse} = require("../controllers/publicController");
const {registerUser} = require("../controllers/userController");
const {handleValidationErrors, validateRegisterInput} = require("../middleware/validateUserInput");

// User Registration
router.post("/register", validateRegisterInput, handleValidationErrors, registerUser);
// Get houses with pagination
router.get("/houses", getHouses);
//Get a single house by ID
router.get("/houses/:id", getHouse);

module.exports = router;