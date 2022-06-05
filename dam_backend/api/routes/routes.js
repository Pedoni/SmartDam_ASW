const express = require("express");
const router = express.Router();
let values = []

router.get("/api/dashboard", (req, res, next) => {
    let text = '[{State: ' + state + ', Manual: ' + manual + ', Opening: ' + percdam + '},';
    values.forEach(val => {
        text += '{time: ' + val.getTime() + ', value: ' + val.getValue() + ', place: ' + val.getPlace() + '},'
    });
    text += ']';
    let arr = JSON.parse(text);
    res.status(200).json(arr);
});

router.post("/api/data", (req, res, next) => {
    if(req == null){
        return res.status(400).json({
            message: "Error"
        });
    } else {
        if(req.params.value!=null){
            let value = req.params.value;
            let place = req.params.place;
            
        }
    }
});

module.exports = router;
