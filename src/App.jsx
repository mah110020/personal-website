import React from "react";
import Parallax from "./Parallax.jsx";
import "./App.scss";
import "./iconLibrary.js";

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Parallax />
			</div>
		);
	}
}

export default App;
