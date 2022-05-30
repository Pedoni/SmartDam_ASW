const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
var cors = require('cors');
require('./DataPoint');
var DataPoint = require("./DataPoint");
var SerialCommChannel = require("./SerialCommChannel");

const MAX_SIZE = 10;
let values = []
let state = 1;
let manual = true;
let percDam = 20;
const D2 = 0.4
const DeltaD = 0.04
let scc = new SerialCommChannel('COM3', 9600);

app.set('secretKey', 'nodeRestApi'); // jwt secret token

/*
mongoose.connect(
    "mongodb://localhost:27017/smartDam", {
        useMongoClient: true
    }
);
mongoose.Promise = global.Promise;
*/

//for cors permissions
app.use(cors({origin: '*'}));

app.use(morgan("dev"));
//app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setInterval(function(){ 
    let rm = scc.receiveMessage();
    if(rm == "manual"){
        manual = true;
        console.log("Diga passata a modalità manuale");
    } else if(rm == "auto"){
        manual = false;
        console.log("Diga passata a modalità automatica");
    } else if(rm == "0" || rm == "20" || rm == "40" || rm == "60" || rm == "80" || rm == "100"){
        percDam = 
        console.log("Valore attuale diga = " + rm);
    }
}, 300);

app.get("/api/dashboard", (req, res, next) => {
    let text = '[{"State": "' + state + '", "Manual": "' + manual + '", "Opening": "' + percDam + '"}';
    values.forEach(val => {
        text += ', {time: ' + val.getTime() + ', value: ' + val.getValue() + ', place: '+ val.getPlace() + '}'
    });
    text += ']';
    console.log(text);
    let arr = JSON.parse(text);
    res.status(200).json(arr);
});

app.post("/api/data", (req, res, next) => {
    if(req == null){
        return res.status(400).json({
            message: "Error"
        });
    } else {
        if(req.params.value!=null){
            let value = req.params.value;
            let place = req.params.place;
            const time = Date.now();
            values.unshift(new DataPoint(value, time, place));
            if(values.length > MAX_SIZE){
                values.shift();
            }
            console.log("New value: " + value + " from " + place + " on " + new Date(time));
            res.status(200).end();
            if(value>1.0){
                this.state = 0;
            } else if(value <= 1.0 && value > 0.4) {
                this.state = 1;
            } else if(value <= 0.4) {
                this.state = 2;
            }
            if(value > D2){
                sendValue(0);
            } else if(value > (D2 - DeltaD) && value <= D2){
                sendValue(20);
            } else if(value > (D2-2*(DeltaD)) && value <= (D2-(DeltaD))) {
                sendValue(40);
            } else if(value > (D2-3*(DeltaD)) && value <= (D2-(2*DeltaD))) {
                sendValue(60);
            } else if(value > (D2-4*(DeltaD)) && value <= (D2-(3*DeltaD))) {
                sendValue(80);
            } else if(value <= (D2-4*(DeltaD))) {
                sendValue(100);
            }
        } else if(req.params.state!=null){
            state = req.params.state;
            console.log("New state: " + state);
            switch(state) {
                case 0:
                    scc.sendMessage("NORMAL");
                    percDam = 0;
                    manual = false;
                    break;
                case 1:
                    scc.sendMessage("PRE");
                    percDam = 0;
                    manual = false;
                    break;
                case 2:
                    scc.sendMessage("ALARM");
                    break;
            }
        }
    }
});

function sendValue(val){
    scc.sendMsg('"' + val + '"');
    if(!manual) {
        percDam = val;
    }
}

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
