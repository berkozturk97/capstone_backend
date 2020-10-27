var express = require('express');
const Log = require('../models/Log');
var router = express.Router();

router.get('/getLog', (req, res) => {
    Log.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

router.post('/getLogByDoorId', (req, res) => {
    const { doorId } = req.body;
    Log.find({ doorId }).populate({
        path: "doorId",
        select: "doorId doorName",
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router;