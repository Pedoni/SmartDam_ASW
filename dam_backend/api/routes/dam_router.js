const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

const waterlevelEndpoint = "/api/waterlevel";
const weatherEndpoint = "/api/weather";
const summaryEndpoint = "/api/summary";
const openingEndpoint = "/api/opening"

router.get(waterlevelEndpoint, controller.getLastWaterLevels);

router.post(waterlevelEndpoint, controller.addNewWaterlevelData);

router.get(weatherEndpoint, controller.getLastWeatherData);

router.post(weatherEndpoint, controller.addNewWeatherData);

router.post(openingEndpoint, controller.setOpening);

router.get(summaryEndpoint, controller.getSummary);

module.exports = router;