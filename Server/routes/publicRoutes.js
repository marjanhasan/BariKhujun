const router = require("express").Router();
const {getHouses, getHouse, registerUser, loginUser} = require("../controllers/publicController");
const {handleValidationErrors, validateRegisterInput} = require("../middleware/validateUserInput");

// User Registration
router.post("/register", validateRegisterInput, handleValidationErrors, registerUser);
// User Login
router.post("/login", validateLoginInput, handleValidationErrors, loginUser);
// Get houses with pagination
router.get("/houses", getHouses);
//Get a single house by ID
router.get("/houses/:id", getHouse);

module.exports = router;