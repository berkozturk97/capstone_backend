var express = require('express');
const { db } = require('../models/User');
var router = express.Router();
const Door = require('../models/Door');

router.post('/addDoor', (req, res) => {
    const { doorName, doorId } = req.body;
    const door = new Door({ doorName, doorId })
    door.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

router.get('/getAllDoor', (req, res) => {
    Door.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})
module.exports = router;