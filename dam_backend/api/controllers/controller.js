const waterlevel = require("../model/waterlevel");
const weather = require("../model/weather");
const opening = require("../model/opening")
const DamData = require("./DamData");

exports.getLastWaterLevels = (req, res, next, n) => {
    waterlevel.find()
        .sort({ "timestamp": -1 })
        .limit(n)
        .select({ "timestamp": 1, "level": 1, "_id": 0 })
        .exec((err, values) => {
            if (err) {
                console.log("Error during reading from db: " + err);
                res.status(500).json({
                    "Error": "something went wrong with the database"
                });
            } else {
                // Fill with zeros to have exactly
                while (values.length < 10) {
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

exports.addNewWaterlevelData = (value) => {
    const time = Date.now();
    console.log("New water level value (" + value + ") received on " + new Date(time));

    waterlevel.insertMany(
        [{
            timestamp: time,
            level: value,
        }],
        function (err) {
            if (err) {
                console.log("Error during insertMany: " + err);
            }
        }
    );
};

exports.getLastWeatherData = (req, res, next, n) => {
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
                console.log("Error during reading from db: " + err);
                res.status(500).json({
                    "Error": "something went wrong with the database"
                });
            } else {
                // Fill with zeros to have exactly
                while (values.length < 10) {
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

exports.addNewWeatherData = (values) => {
    values.timestamp = Date.now();
    weather.insertMany(
        [values],
        function (err) {
            if (err) {
                console.log("Error during addNewWeatherData: " + err);
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
            console.log("Error during query to db: " + err);
        });
};

exports.setOpening = (req, res, next) => {
    opening.insertMany([
        {
            timestamp: Date.now(),
            percentage: req.body.percentage,
        }
    ],
        function (err) {
            if (err) {
                console.log("Error during insertMany: " + err);
            }
        });
    res.status(200).end();
}