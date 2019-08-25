import React from "react";
import Scene from "./Scene.jsx";
import "./Parallax.scss";

class Parallax extends React.Component {
	render() {
		return (
			<div className="parallax">

				<div className="panel panel1">
					<span>Hello</span>
				</div>

				<div className="slider">
					<Scene radians={Math.PI/16} />
				</div>

				<div className="panel panel3">
					<span>Welcome</span>
				</div>

				<div className="panel panel4">
					<span>Back</span>
				</div>

			</div>
		);
	}
}

export default Parallax;
