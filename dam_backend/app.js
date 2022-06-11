const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const waterlevel = require("./api/model/waterlevel");
var cors = require('cors');
// require('./DataPoint');
var DataPoint = require("./DataPoint");

const MAX_SIZE = 10;
let values = []
let state = 1;
let manual = true;
let percDam = 20;
const D2 = 0.4
const DeltaD = 0.04

app.set('secretKey', 'nodeRestApi'); // jwt secret token

mongoose.connect("mongodb://root:example@mongo:27017");
mongoose.Promise = global.Promise;

//for cors permissions
app.use(cors({ origin: '*' }));

// app.use(morgan("dev"));
//app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// values.unshift(new DataPoint("100", Date.now(), "dam"));

app.get("/api/dashboard", (req, res, next) => {
    waterlevel.find()
        .sort({ "timestamp": -1 })
        .limit(10)
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
                    "state": state,
                    "manual": manual,
                    "opening": percDam,
                    "timestamps": timestamps,
                    "waterlevels": waterlevels
                });
            }
        });
});

app.post("/api/data", (req, res, next) => {
    if (req == null) {
        return res.status(400).json({
            message: "Error"
        });
    }

    if (!("value" in req.body ^ "state" in req.body)) {
        res.status(300).end();
    }

    if ("value" in req.body) {
        let value = req.body.value;
        let place = req.body.place;
        const time = Date.now();
        values.unshift(new DataPoint(value, time, place));
        if (values.length > MAX_SIZE) {
            values.shift();
        }
        console.log("New value: " + value + " from " + place + " on " + new Date(time));

        if (value > 1.0) {
            this.state = 0;
        } else if (value <= 1.0 && value > 0.4) {
            this.state = 1;
        } else if (value <= 0.4) {
            this.state = 2;
        }

        if (value > D2) {
            // sendValue(0);
        } else if (value > (D2 - DeltaD) && value <= D2) {
            // sendValue(20);
        } else if (value > (D2 - 2 * (DeltaD)) && value <= (D2 - (DeltaD))) {
            // sendValue(40);
        } else if (value > (D2 - 3 * (DeltaD)) && value <= (D2 - (2 * DeltaD))) {
            // sendValue(60);
        } else if (value > (D2 - 4 * (DeltaD)) && value <= (D2 - (3 * DeltaD))) {
            // sendValue(80);
        } else if (value <= (D2 - 4 * (DeltaD))) {
            // sendValue(100);
        }

        waterlevel.insertMany(
            [{
                timestamp: Date.now(),
                level: value,
            }],
            function (err) {
                if (err) {
                    console.log("Error during insertMany: " + err);
                }
            }
        );
    } else { // if state is not null
        state = req.body.state;
        console.log("New state: " + state);
        switch (state) {
            case 0:
                // scc.sendMessage("NORMAL");
                percDam = 0;
                manual = false;
                break;
            case 1:
                // scc.sendMessage("PRE");
                percDam = 0;
                manual = false;
                break;
            case 2:
                // scc.sendMessage("ALARM");
                break;
        }
    }
    // if everything went well
    res.status(200).end();
});

function sendValue(val) {
    // scc.sendMessage('"' + val + '"');
    if (!manual) {
        percDam = val;
    }
}

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

module.exports = app;
