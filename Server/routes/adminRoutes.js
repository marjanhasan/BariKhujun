// adminRoutes.js
const router = require('express').Router();
const {getProfile, addHouse, addHouses, updateHouse, deleteHouse, bulkRegistration, registerUser, updateUser, deleteUser} = require("../controllers/adminController");
const {handleValidationErrors, validateRegisterInput} = require("../middleware/validateUserInput");

// Admin landing page
router.get("/", getProfile);
// Add a new house
router.post("/addhouse", addHouse);
// Add multiple houses
router.post("/addhouses", addHouses);
// Endpoint to delete a house
router.delete('/house/:id', deleteHouse);
// Update a house by ID
router.put("/houses/:id", updateHouse);
// Bulk User Registration
router.post("/bulk-register", bulkRegistration);
// Endpoint to add user
router.post('/register', validateRegisterInput, handleValidationErrors, registerUser);
// Endpoint to modify user
router.put('/user/:id', validateRegisterInput, handleValidationErrors, updateUser);
// Endpoint to delete a user
router.delete('/user/:id', deleteUser);

module.exports = router;
