const mongoose = require("mongoose");

const Activity = require("../models/activity");
const Local = require("../models/local");

exports.activities_get_all = (req, res, next) => {
    Activity.find()
        .select("local _id nameOfActivity aboutActivity")
        .populate("local", "nameOfActivity")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                activities: docs.map(doc => {
                    return {
                        _id: doc._id,
                        local: doc.local,
                        nameOfActivity: doc.nameOfActivity,
                        aboutActivity: doc.aboutActivity
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};


exports.activities_create_activity = (req, res, next) => {
    Activity.find({ nameOfActivity: req.body.nameOfActivity })
        .then(activity => {
            if (activity.length > 0) {
                return res.status(409).json({
                    message: "Name of Activity already exists"
                });
            } else {
                Local.findById(req.body.localId)
                    .then(local => {
                        if (!local) {
                            return res.status(404).json({
                                message: "Local not found"
                            });
                        }
                        const activity = new Activity({
                            _id: mongoose.Types.ObjectId(),
                            local: req.body.localId,
                            nameOfActivity: req.body.nameOfActivity,
                            aboutActivity: req.body.aboutActivity
                        });
                        return activity.save();
                    })
                    .then(result => {
                        res.status(201).json({
                            message: "Activity stored"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
};


exports.activities_get_activity = (req, res, next) => {
    Activity.findById(req.params.activityId)
        .populate("local")
        .exec()
        .then(activity => {
            if (!activity) {
                return res.status(404).json({
                    message: "Activity not found"
                });
            }
            res.status(200).json({
                activity: activity,
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};


exports.activities_delete_activity = (req, res, next) => {
    Activity.remove({ _id: req.params.activityId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Activity deleted",
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};


exports.activities_update_activity = (req, res, next) => {
    let title = req.body.title;
    let text = req.body.text;
    Activity.updateOne({ _id: req.params.activityId}, { $set: {"nameOfActivity": title, "aboutActivity": text} })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Activity updated"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
