var express = require('express');
var router = express.Router();

const UserPackage = require('../models/User');

router.post('/addUser', (req, res) => {
    const { fullName, email, password, permissions } = req.body;
    const user = new UserPackage({
        fullName,
        email,
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

router.get('/get', (req, res) => {
    UserPackage.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})
router.get('/getSelectedBlog/:id', (req, res) => {
    UserPackage.find({ _id: req.params.id }).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router;