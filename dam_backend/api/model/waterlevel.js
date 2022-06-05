const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Number },
    level: { type: Number },
});

module.exports = mongoose.model("waterlevel", schema);