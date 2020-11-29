var express = require('express');
const Log = require('../models/Log');
var router = express.Router();
const jwt = require("jsonwebtoken");
const UserPackage = require('../models/User');
const bcrypt = require("bcryptjs");

router.post('/addUser', (req, res) => {
	const { fullName, email, password, permissions } = req.body;
	bcrypt.hash(password, 10).then((hash) => {
		console.log(hash)
		const user = new UserPackage({
			fullName,
			email,
			password: hash,
			permissions
		})
		user.save().then((data) => {
			res.json(data)
		}).catch((err) => {
			res.json(err)
		})
	})
})

router.post('/login', async (req, res, next) => {

	const { password, email } = req.body;

	UserPackage.findOne({ email: email })
	.populate('permissions')
	.then((user) => {
		console.log(user)
		if (user) {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result === true) {
					const payload = {
						_id: user._id
					};
					const userToken = jwt.sign(payload, process.env.JWT_KEY, {
						expiresIn: 720000 //  720 = 12 saat
					});
					user.userToken = userToken;
					UserPackage.findByIdAndUpdate(payload, { userToken }, (err, data) => {
						if (err) {
							res.send("token update edilmedi" + err)
						} else {
							res.json({
								userToken,
								user
							});
						}
					})
				} else {
					res.json("Şifre Yanlış");
				}
			});
		} else {
			res.json("Mail Yanlış")
		}
	}).catch(() => {
		res.json(null);
	});

});

router.post('/hasPermisson', async (req, res) => {
	const { userId, doorId } = req.body;
	const user = await UserPackage.find({ _id: userId }).select("_id permissions fullName email");

	const log = new Log({
		doorId: doorId,
		user: user[0],
		isOpen: true
	})
	log.save().then((data) => {
		//res.send({ hasId })
		res.json(true)
	}).catch((err) => {
		res.json(err)
	});

})
router.get('/hasPermisson/:rfid/:doorId', async (req, res) => {
	const { rfid, doorId } = req.params;
	const user = await UserPackage.find({ rfid: rfid });
	if (user.length !== 0) {
		let isCanOpen = await user[0].permissions.includes(doorId);
		const log = new Log({
			rfid: rfid,
			doorId: doorId,
			user: user[0],
			isOpen: isCanOpen
		})
		log.save().then((data) => {
			//res.send({ hasId })
			res.send(isCanOpen)
		}).catch((err) => {
			res.json(err)
		});
	} else {
		res.json(false);
	}
})

router.post('/getUsersByName', (req, res) => {
	const { fullName } = req.body;
	Products.find({ name: { $options: 'i', $regex: fullName } }).then((data) => {
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