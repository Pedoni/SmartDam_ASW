const express = require("express");
const router = express.Router();
const waterController = require("../controllers/water_controller");

router.get("/get_last", waterController.getLastWaterLevel);

module.exports = router;