const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Number },
    water_temperature: { type: Number },
    air_temperature: { type: Number },
    atmospheric_pressure: { type: Number },
    humidity: { type: Number },
    rain: { type: Number }
});

module.exports = mongoose.model("weather", weatherSchema);