//database
const db = require('../data/db-config');

module.exports = {
	get,
	getById,
	findByUsername,
	add
}

function get() {
	return db('users')
		.select('user_id', 'username')
		.orderBy('user_id');
}

function getById(id) {
	return db('users')
		.where('user_id', id);
}

function findByUsername(username) {
	return db('users')
		.where('username', username)
		.first();
}

function add(userAcc) {
	return db('users')
		.insert(userAcc);
}