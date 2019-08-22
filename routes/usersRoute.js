const express = require('express');
const bcrypt = require('bcryptjs');

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