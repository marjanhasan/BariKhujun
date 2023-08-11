const {handleGetHouse} = require("../utils/utils");
const router = require('express').Router()

router.get('houses', handleGetHouse)
router.get('houses/:id', handleGetHouse)