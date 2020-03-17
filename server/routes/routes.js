const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Booking = require('../models/booking');
const bcrypt = require('bcrypt');

const router = new express.Router();

router.get('/', ( req, res ) => {
	res.send(' welcome to nodejs servers');
});

router.post('/login', async( req, res ) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email  });
	try{
		if(user){
			const compare = bcrypt.compare( password, user.password);
			compare.then((data) => {
				if(data){
					const token = jwt.sign({ id: user._id.toString() }, 'secret-key' );
					res.send({ user, token });
				}else {
					throw 'Wrong password, unable to login';
				}
			}).catch((e) =>{
				throw 'Unable to login';
			});
		}else {
			throw 'User not found'
		}
	} catch(err) {
		res.status(500).send(err);
	}
});
router.post('/register', async ( req, res ) => {
	const userExist = await User.findOne( { email: req.body.email } );
	const user =  new User(req.body);
	try {
		if(userExist){
			throw 'User Already Exists'
		}else {
			await user.save();
			res.send(user);
		}
	} catch(err) {
		res.status(500).send(err);
	}
});

router.post('/booking', async (req, res) => {
	const { email } = await req.body;
	const user = await User.findOne({ email  });
	const booking = new Booking(req.body);
	try {
		if(!user) {
			throw 'Please Register to confirm the booking'
		}else {
			await booking.save();
			res.send(booking)
		}
	} catch(err) {
		res.status(500).send(err)
	}
});
router.post('/user', async(req, res) => {
	const email = req.body.email;
	const user = await User.findOne({ email });
	try{
		if(!user){
			throw 'Please login to continue'
		}else {
			res.send({ user });
		}
	} catch(err){
		res.status(500).send(err);
	}
});

module.exports = router;
