const express = require("express");
const path = require("path");
const app = express();

app.get("/api/test", (req, res) => {
	res.send("This is a test.");
});

// catch routes to files served as from the root url
app.use("/", express.static(path.join(__dirname, "../build")));

// failed API routes shouldn't serve the app
app.get("/api/*", (req, res) => {
	res.status(404).send("API not found.");
});
app.get("/api/", (req, res) => {
	res.status(404).send("API not found.");
});

// catch-all: serve the web app.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(8080, () => {
	console.log("Server initialized.");
});
