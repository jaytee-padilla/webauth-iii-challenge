//database
const db = require('../data/db-config');

module.exports = {
	get,
	getById,
	add
}

function get() {
	return db('users');
}

function getById(id) {
	return db('users')
		.where('user_id', id);
}

function add(userAcc) {
	return db('users')
		.insert(userAcc);
}