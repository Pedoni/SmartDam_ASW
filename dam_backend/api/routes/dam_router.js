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

//router.use('/images', express.static('images'));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get(waterlevelEndpoint, (req, res, next) => {
    controller.getLastWaterLevels(req, res, next, 10);
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

    controller.addNewWaterlevelData(req.body.value);

    res.status(200).end();
});

router.get(weatherEndpoint, (req, res, next) => {
    controller.getLastWeatherData(req, res, next, 10);
});

router.post(weatherEndpoint, (req, res, next) => {
    if (req == null) {
        return res.status(400).json({
            message: "Error"
        });
    }

    console.log("New weather values " + JSON.stringify({
        "water_temperature": req.body.water_temperature,
        "air_temperature": req.body.air_temperature,
        "atmospheric_pressure": req.body.atmospheric_pressure,
        "humidity": req.body.humidity,
        "rain": req.body.rain
    }) + " received on " + new Date(Date.now()));

    controller.addNewWeatherData(req, res, next);
});

router.post(openingEndpoint, (req, res, next) => {
    controller.setOpening(req, res, next);
});

router.get(summaryEndpoint, (req, res, next) => {
    controller.getSummary(req, res, next);
});

module.exports = router;