import React from "react";
import Scene from "./Scene.jsx";
import "./App.scss";

class App extends React.Component {
	render() {
		return (
			<Scene radians={Math.PI/16} />
		);
	}
}

export default App;
