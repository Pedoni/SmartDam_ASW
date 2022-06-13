const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require("body-parser");

const waterlevelEndpoint = "/api/waterlevel";
const weatherEndpoint = "/api/weather";
const summaryEndpoint = "/api/summary";
const openingEndpoint = "/api/opening"

mongoose.connect("mongodb://root:example@mongo:27017");
mongoose.Promise = global.Promise;

//for cors permissions
router.use(cors({ origin: '*' }));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get(waterlevelEndpoint, (req, res, next) => {
    controller.getLastWaterLevels(res, 10);
});

router.post(waterlevelEndpoint, (req, res, next) => {
    if (req == null) {
        return res.status(400).json({
            message: "No request"
        });
    }

    if (req.body.value === undefined) {
        return res.status(400).json({
            message: "value is missing"
        });
    }

    controller.addNewWaterlevelData(res, req.body.value);
});

router.get(weatherEndpoint, (req, res, next) => {
    controller.getLastWeatherData(res, 10);
});

router.post(weatherEndpoint, (req, res, next) => {
    if (req == null) {
        return res.status(400).json({
            message: "Error"
        });
    }

    if (req.body.water_temperature === undefined ||
        req.body.air_temperature === undefined ||
        req.body.atmospheric_pressure === undefined ||
        req.body.humidity === undefined ||
        req.body.rain === undefined) {
        return res.status(400).json({
            message: "Missing data"
        });
    }

    const values = {
        "water_temperature": req.body.water_temperature,
        "air_temperature": req.body.air_temperature,
        "atmospheric_pressure": req.body.atmospheric_pressure,
        "humidity": req.body.humidity,
        "rain": req.body.rain
    };

    console.log("New weather values " + JSON.stringify(values) + " received on " + new Date(Date.now()));

    controller.addNewWeatherData(res, values);
});

router.post(openingEndpoint, (req, res, next) => {
    if (req == null) {
        return res.status(400).json({
            message: "Error"
        });
    }

    if (req.body.percentage === undefined) {
        return res.status(400).json({
            message: "percentage is missing"
        });
    }

    controller.setOpening(res, req.body.percentage);
});

router.get(summaryEndpoint, (req, res, next) => {
    controller.getSummary(res);
});

module.exports = router;