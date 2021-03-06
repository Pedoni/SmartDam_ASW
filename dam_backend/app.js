const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cors = require('cors');

const router = require("./api/routes/dam_router");

app.set('secretKey', 'nodeRestApi'); // jwt secret token

mongoConnectionString = "mongodb://root:example@mongo:27017";

if (process.argv.length >= 3) {
    mongoConnectionString = process.argv[2];
}

console.log(mongoConnectionString);

mongoose.connect(mongoConnectionString);
mongoose.Promise = global.Promise;

//for cors permissions
app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

module.exports = app;
