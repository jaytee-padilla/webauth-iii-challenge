const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	// check if token is valid
	if(token) {
		jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
			if(error) {
				// token is invalid
				res.status(401).json({message:'Invalid token provided'});
			} else {
				// token is good
				req.user = {username: decodedToken.username};
				next();
			}
		})
	} else {
		res.status(400).json({message: 'No authorization token has been provided'});
	}
}