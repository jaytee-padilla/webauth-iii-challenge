const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

// setup server
const server = express();
server.use(helmet());
server.use(express.json());

// routes
const usersRoute = require('./routes/usersRoute');
server.use('/api', usersRoute);

// check if API is running
server.get('/', (req, res) => {
	res.status(200).json({api: 'running'});
});

// get JSON web token
server.get('/token', (req, res) => {
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

module.exports = server;