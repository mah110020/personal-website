// login authentication has been disabled

const express = require("express");
const path = require("path");
//const fs = require("fs");
const cookieParser = require("cookie-parser");

//const auth = require("./jwt.js");
//const {authenticate} = require("./authenticate.js");

const PORT = 8080;

const app = express();

app.use(express.json()); // makes json request body available as object
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // makes cookies available as object

//app.use(auth.init); // exposes `req.login` and `req.payload`; auth exposes middleware

// api to login
/*app.post("/", (req, res) => {
	const {token} = req.body;

	// attempt login
	if( authenticate(token) ){
		// success
		req.login({ date: new Date().getTime() });
	}

	res.set("Content-Type", "text/html");
	if( req.payload ){ // authorized
		res.sendFile(path.join(__dirname, "../build/index.html"));
	} else { // not authorized
		res.sendFile(path.join(__dirname, "./login.html"));
	}
});*/

// intercept any unauthorized requests, send login page
/*app.use((req, res, next) => {
	const unauthorized = !req.payload;
	if( unauthorized ){
		res.set("Content-Type", "text/html");
		res.sendFile(path.join(__dirname, "./login.html"));
	} else {
		next();
	}
});*/

// failed API routes shouldn't serve the app
app.get("/api/*"/*, auth.active*/, (req, res) => {
	res.status(404).send("API not found.");
});
app.get("/api/"/*, auth.active*/, (req, res) => {
	res.status(404).send("API not found.");
});

// catch routes to files served as from the root url
app.use("/", [/*auth.active,*/ express.static(path.join(__dirname, "../build"))]);

// catch-all: serve the web app.
app.get("*"/*, auth.active*/, (req, res) => {
	res.set("Content-Type", "text/html");
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server initialized on port ${PORT}.`);
});
