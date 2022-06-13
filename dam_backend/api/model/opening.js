const mongoose = require("mongoose");

const openingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Number },
    percentage: { type: Number },
});

module.exports = mongoose.model("opening", openingSchema);