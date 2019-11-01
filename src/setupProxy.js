// https://create-react-app.dev/docs/proxying-api-requests-in-development/
// Used by webpack dev server to intelligently route requests to server. Should have as dev dependency?
// the dumb proxy routing is stuck by the 404 page served at the api route. Can I block?
// in prod, the server routes itself first and then issues the client.
const proxy = require("http-proxy-middleware");
module.exports = function(app) {
	app.use(
		"/api",
		proxy({
			target: "http://localhost:8080",
			changeOrigin: true,
		})
	);
};
