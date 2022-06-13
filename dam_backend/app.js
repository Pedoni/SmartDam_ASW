const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const controller = require("./api/controllers/controller");
var cors = require('cors');

const waterlevelEndpoint = "/api/waterlevel";
const weatherEndpoint = "/api/weather";
const summaryEndpoint = "/api/summary";
const openingEndpoint = "/api/opening"

app.set('secretKey', 'nodeRestApi'); // jwt secret token

mongoose.connect("mongodb://root:example@mongo:27017");
mongoose.Promise = global.Promise;

//for cors permissions
app.use(cors({ origin: '*' }));

//app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(waterlevelEndpoint, (req, res, next) => {
    controller.getLastWaterLevels(req, res, next, 10);
});

app.post(waterlevelEndpoint, (req, res, next) => {
    if (req == null) {
        return res.status(400).json({
            message: "Error"
        });
    }

    if (!("value" in req.body)) {
        res.status(300).end();
    }

    controller.addNewWaterlevelData(req, res, next);
});

app.get(weatherEndpoint, (req, res, next) => {
    controller.getLastWeatherData(req, res, next, 10);
});

app.post(weatherEndpoint, (req, res, next) => {
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

app.post(openingEndpoint, (req, res, next) => {
    controller.setOpening(req, res, next);
});

app.get(summaryEndpoint, (req, res, next) => {
    controller.getSummary(req, res, next);
});

module.exports = app;
