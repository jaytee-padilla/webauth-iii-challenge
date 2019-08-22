const express = require('express');
const bcrypt = require('bcrypt');

// setup route
const router = express.Router();

// database
const db = require('../data/db-config');

module.exports = router;