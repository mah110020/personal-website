import React from "react";
import "./LaunchingPad.scss";

class LaunchingPad extends React.Component {

	render() {
		return (
			<div className="launching-pad">
				<h1>Explore More</h1>
				<div className="portal-row">
					<button className="portal button1">About Me</button>
					<button className="portal button2">Experiments</button>
					<button className="portal button3">Resume</button>
				</div>
			</div>
		);
	}
}

export default LaunchingPad;
