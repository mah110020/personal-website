import React from "react";
import { connect } from "react-redux";
import { navigateURL } from "../actions.js";
import onPress from "../onPress.js";
import "./LaunchingPad.scss";

class LaunchingPad extends React.Component {

	aboutHandler = onPress(this.props.navigateURL.bind(null, "/about"));

	render() {
		return (
			<div className="launching-pad">
				<h1>Explore More</h1>
				<div className="portal-row">
					<button {...this.aboutHandler} className="portal button1">About Me</button>
					<button className="portal button2">Experiments</button>
					<button className="portal button3">Resume</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	navigateURL: url => dispatch(navigateURL(url))
});

export default connect(
	null,
	mapDispatchToProps
)(LaunchingPad);
