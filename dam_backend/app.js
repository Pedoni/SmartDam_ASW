const express = require("express");
const app = express();
const router = require("./api/routes/dam_router");

app.set('secretKey', 'nodeRestApi'); // jwt secret token

app.use("/", router);

module.exports = app;
