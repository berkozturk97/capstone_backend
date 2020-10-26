var express = require('express');
const { db } = require('../models/User');
const Log = require('../models/Log');
var router = express.Router();

const UserPackage = require('../models/User');
const Door = require('../models/Door');

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
        const user = await UserPackage.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
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
        doorid: doorid,
        user: user[0],
        isOpen: hasId
    })
    log.save().then((data) => {
        //res.send({ hasId })
        res.json(hasId)
    }).catch((err) => {
        res.json(err)
    });

})

router.get('/hasPermisson/:rfid/:doorid', async (req, res) => {
    const { rfid, doorid } = req.params;
    const user = await UserPackage.find({ rfid: rfid });
    const userPermission = user[0].permissions;
    let hasId = await userPermission.includes(doorid);
    console.log(hasId);
    const log = new Log({
        rfid: rfid,
        doorid: doorid,
        user: user[0],
        isOpen: hasId
    })
    log.save().then((data) => {
        //res.send({ hasId })
        res.json({
            "hasId": hasid
        })
    }).catch((err) => {
        res.json(err)
    });

})

router.post('/getUsersByName', (req, res) => {
    const { fullName } = req.body;
    Products.find({ name: { $options: 'i', $regex: fullName } }).then((data) => {
        res.json(data);
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

router.get('/getUsers', (req, res) => {
    UserPackage.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

router.get('/getLog', (req, res) => {
    Log.find().then((data) => {
        console.log(data)
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

router.put('/updateUserInfo/:id', (req, res) => {
    //
    UserPackage.findByIdAndUpdate(req.body._id, {
        permissions: req.body.permissions,
        fullName: req.body.fullName,
        rfid: req.body.rfid
    }, {
        multi: true
    }, (err, data) => {
        if (err) {
            res.send(err)
        }
        res.json(data)
    })
})
module.exports = router;