var express = require('express');
const Log = require('../models/Log');
var router = express.Router();

const UserPackage = require('../models/User');

router.post('/addUser', (req, res) => {
    const { fullName, email, rfid, password, permissions } = req.body;
    const user = new UserPackage({
        fullName,
        email,
        rfid,
        password,
        permissions
    })
    user.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

router.post('/login', async (req, res) => {
    try {
        const user = await UserPackage.findByCredentials(req.body.email, req.body.password)
        res.send({ user})
    } catch (error) {
        res.status(400).send()
    }
})


router.post('/hasPermisson', async (req, res) => {
    const { rfid, doorid } = req.body;
    const user = await UserPackage.find({ rfid: rfid });
    const userPermission = user[0].permissions;
    let hasId = await userPermission.includes(doorid);
    console.log(hasId);
    const log = new Log({
        rfid: rfid,
        isOpen: hasId
    })
    log.save().then((data) => {
        //res.send({ hasId })
        res.json(hasId)
    }).catch((err) => {
        res.json(err)
    });

})

router.get('/get', (req, res) => {
    UserPackage.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router;