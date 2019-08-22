const express = require('express');
const helmet = require('helmet');

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

module.exports = server;