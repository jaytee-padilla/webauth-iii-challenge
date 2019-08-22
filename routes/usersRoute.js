const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// setup route
const router = express.Router();

// database
const db = require('../models/usersModel');

// CRUD
// GET
// get users if logged in
router.get('/users', (req, res) => {
	db.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(400).json({message: 'Unable to retrieve users from database'});
		})
});

// get JSON web token
router.get('/token', (req, res) => {
	// add you name to the token's payload
	const payload = {
		// subject is usually the user's id (who/what the token describes)
		subject: "me", // translates into the "sub" property on the token
		me: "Jaytee"
	};

	const secret = "this is a secret";

	const options = {
		expiresIn: "8h"
	}

	// use jsonwebtoken to produce a token
	const token = jwt.sign(payload, secret, options);

	// return the token to the client
	res.status(200).json(token);
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

module.exports = router;