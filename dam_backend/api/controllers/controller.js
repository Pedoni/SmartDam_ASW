const waterlevel = require("../model/waterlevel");
const weather = require("../model/weather");
const opening = require("../model/opening")
const DamData = require("./DamData");

exports.getLastWaterLevels = (req, res, next) => {
    let n = 10;
    waterlevel.find()
        .sort({ "timestamp": -1 })
        .limit(n)
        .select({
            "_id": 0,
            "timestamp": 1,
            "level": 1
        })
        .exec((err, values) => {
            if (err) {
                console.log("Error during getLastWaterLevels: " + err);
                res.status(500).end();
            } else {
                // Fill with zeros to have exactly n elements
                while (values.length < n) {
                    values.unshift({ "timestamp": 0, "level": 0 });
                }

                // Splitting timestamp and level
                var timestamps = []
                var waterlevels = []
                for (i in values) {
                    timestamps.push(values[i]["timestamp"])
                    waterlevels.push(values[i]["level"])
                }

                res.status(200).json({
                    "timestamp": timestamps,
                    "waterlevel": waterlevels
                });
            }
        });
};

exports.addNewWaterlevelData = (req, res, next) => {

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

    if (req.body.value < 0) {
        return res.status(400).json({
            message: "Invalid value"
        });
    }

    let value = req.body.value;

    const time = Date.now();
    console.log("New water level value (" + value + ") received on " + new Date(time));

    waterlevel.insertMany(
        [{
            timestamp: time,
            level: value,
        }],
        function (err) {
            if (err) {
                console.log("Error during addNewWaterlevelData: " + err);
                res.status(500).end();
            } else {
                res.status(200).end();
            }
        }
    );
};

exports.getLastWeatherData = (req, res, next) => {
    let n = 10;
    weather.find()
        .sort({ "timestamp": -1 })
        .limit(n)
        .select({
            "_id": 0,
            "timestamp": 1,
            "water_temperature": 1,
            "air_temperature": 1,
            "atmospheric_pressure": 1,
            "humidity": 1,
            "rain": 1
        })
        .exec((err, values) => {
            if (err) {
                console.log("Error during getLastWeatherData: " + err);
                res.status(500).end();
            } else {
                // Fill with zeros to have exactly n elements
                while (values.length < n) {
                    values.unshift({
                        "timestamp": 0,
                        "water_temperature": 0,
                        "air_temperature": 0,
                        "atmospheric_pressure": 0,
                        "humidity": 0,
                        "rain": 0
                    });
                }

                // Splitting timestamp and level
                var timestamps = []
                var water_temperatures = []
                var air_temperatures = []
                var atmospheric_pressures = []
                var humidities = []
                var rains = []
                for (i in values) {
                    timestamps.push(values[i]["timestamp"])
                    water_temperatures.push(values[i]["water_temperature"])
                    air_temperatures.push(values[i]["air_temperature"])
                    atmospheric_pressures.push(values[i]["atmospheric_pressure"])
                    humidities.push(values[i]["humidity"])
                    rains.push(values[i]["rain"])
                }

                res.status(200).json({
                    "timestamp": timestamps,
                    "water_temperature": water_temperatures,
                    "air_temperature": air_temperatures,
                    "atmospheric_pressure": atmospheric_pressures,
                    "humidity": humidities,
                    "rain": rains
                });
            }
        });
};

exports.addNewWeatherData = (req, res, next) => {

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

    if (req.body.water_temperature < 0 ||
        req.body.air_temperature < 0 ||
        req.body.atmospheric_pressure < 0 ||
        req.body.humidity < 0 ||
        req.body.rain < 0) {
        return res.status(400).json({
            message: "Invalid value(s)"
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

    values.timestamp = Date.now();
    weather.insertMany(
        [values],
        function (err) {
            if (err) {
                console.log("Error during addNewWeatherData: " + err);
                res.status(500).end();
            } else {
                res.status(200).end();
            }
        }
    );
};

exports.getSummary = (req, res, next) => {
    Promise.all([
        weather.find().sort({ "timestamp": -1 }).limit(1),
        waterlevel.find().sort({ "timestamp": -1 }).limit(1)
    ])
        .then(results => {
            const [weather_values, level_values] = results;

            var dam = new DamData();
            var level = level_values[0]["level"];

            res.status(200).json({
                "timestamp": level_values[0]["timestamp"],
                "level": level,
                "water_temperature": weather_values[0]["water_temperature"],
                "air_temperature": weather_values[0]["air_temperature"],
                "atmospheric_pressure": weather_values[0]["atmospheric_pressure"],
                "humidity": weather_values[0]["humidity"],
                "rain": weather_values[0]["rain"],
                "total_volume": dam.getTotalDamCapacity(),
                "volume": dam.getActualWaterVolume(level),
                "volume_percentage": dam.getVolumePercentage(level)
            });
        })
        .catch(err => {
            console.log("Error during getSummary: " + err);
            res.status(500).end();
        });
};

exports.getLastOpening = (req, res, next) => {
    opening.find()
        .sort({ "timestamp": -1 })
        .limit(1)
        .select({
            "_id": 0,
            "timestamp": 1,
            "percentage": 1
        })
        .exec((err, values) => {
            if (err) {
                console.log("Error during getLastOpening: " + err);
                res.status(500).end();
            } else {
                res.status(200).json({
                    "timestamp": values[0].timestamp,
                    "percentage": values[0].percentage,
                });
            }
        });
}

exports.setOpening = (req, res, next) => {

    if (req == null) {
        return res.status(400).json({
            message: "Error"
        });
    }

    openingPercentage = req.body.percentage;

    if (openingPercentage === undefined) {
        return res.status(400).json({
            message: "Percentage missing"
        });
    }

    if (openingPercentage < 0 || openingPercentage > 100) {
        return res.status(400).json({
            message: "Invalid percentage"
        });
    }

    opening.insertMany([
        {
            timestamp: Date.now(),
            percentage: openingPercentage,
        }
    ],
    function (err) {
        if (err) {
            console.log("Error during setOpening: " + err);
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
}