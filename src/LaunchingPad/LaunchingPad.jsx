import React from "react";
import "./LaunchingPad.scss";

class LaunchingPad extends React.Component {

	render() {
		return (
			<div className="launching-pad">
				<h1>Explore More</h1>
				<div className="portal-row">
					<span className="portal button1">About Me</span>
					<span className="portal button2">Experiments</span>
					<span className="portal button3">Resume</span>
				</div>
			</div>
		);
	}
}

export default LaunchingPad;
