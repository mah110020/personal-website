const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const jwtSecret = crypto.randomBytes(64).toString("hex"); // changes on server restarts
const cookieName = "jwtAuthToken";

const expiresIn = 24 * 3600; // [seconds] 1 day;

const init = (req, res, next) => {

	const login = payload => {
		res.clearCookie(cookieName); // remove the auth cookie
		const token = jwt.sign(payload, jwtSecret, {expiresIn}); // generate the token
		res.cookie(cookieName, token); // set the auth cookie
	};

	req.login = login;

	// relies on cookieParser middleware
	const token = req.cookies[cookieName] || "";

	// set payload null if user unauthorized
	jwt.verify(token, jwtSecret, (err, payload) => {
		if (err) { // throws error when invalid
			req.payload = null; // falsy payload
		} else {
			req.payload = payload; // attach payload for handling
		}
	});

	next();
};

const active = (req, res, next) => {

	if( !req.payload ){
		res.clearCookie(cookieName); // clear invalid cookie
		next( new Error("Unauthorized.") );
	} else {
		next();
	}

};

module.exports = {
	init,
	active
};
