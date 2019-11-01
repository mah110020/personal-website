const express = require("express");
const app = express();

app.get("/api/test", function (req, res) {
	return res.send("This is a test.");
});

app.listen(8080);
