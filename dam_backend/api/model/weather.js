const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Number },
    water_temperature: { type: Number },    // measured in Celsius degrees
    air_temperature: { type: Number },      // measured in Celsius degrees
    atmospheric_pressure: { type: Number }, // measured in mmHg
    humidity: { type: Number },             // measured in percentage
    rain: { type: Number }                  // measured as mm
});

module.exports = mongoose.model("weather", weatherSchema);