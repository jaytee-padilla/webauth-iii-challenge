const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

// setup route
const router = express.Router();

// database
const db = require('../models/usersModel');

// middleware
const restricted = require('../auth/restricted-middleware');

// CRUD
// GET
// get users if logged in
router.get('/users', restricted, (req, res) => {
	db.get()
		.then(users => {
			res.status(200).json({loggedInUser: req.user.username, users});
		})
		.catch(error => {
			res.status(400).json({message: 'Unable to retrieve users from database'});
		})
});

// POST
// add user
router.post('/register', (req, res) => {
	const userAcc = req.body;

	// hash new account password
	let hash = bcrypt.hashSync(userAcc.password);
	userAcc.password = hash;

	db.add(userAcc)
		.then(createdAcc => {
			res.status(201).json({message: 'New account registered successfully'});
		})
		.catch(error => {
			res.status(400).json({message: 'Error adding new user to database'});
		});
});

// login
router.post('/login', (req, res) => {
	const userAcc = req.body;

	db.findByUsername(userAcc.username)
		.then(user => {
			if(user && bcrypt.compareSync(userAcc.password, user.password)) {
				const token = getJwt(user);

				res.status(200).json({
					message: `Welcome ${user.username}`,
					token
				});
			} else {
				res.status(401).json({message: 'Invalid login credentials'})
			}
		})
		.catch(error => {
			res.status(400).json({message: 'Error accessing database'});
		});
})

// logout


// functions
function getJwt(user) {
	const payload = {
		subject: user.id,
		username: user.username
	};

	const options = {
		expiresIn: "8h"
	};

	return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;