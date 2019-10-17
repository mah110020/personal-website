import React from "react";
import { connect } from "react-redux";
import { navigateURL } from "../actions.js";
import onPress from "../onPress.js";
import "./LaunchingPad.scss";

class LaunchingPad extends React.Component {

	aboutHandler = onPress(this.props.navigateURL.bind(null, "/about"));
	experimentsHandler = onPress(this.props.navigateURL.bind(null, "/experiments"));

	render() {
		return (
			<div className="launching-pad">
				<h1>Explore More</h1>
				<div className="navigation-row navbuttons">
					<button {...this.aboutHandler} className="navlink about-button buffered-button">About Me</button>
					<button {...this.experimentsHandler} className="navlink experiments-button buffered-button">Experiments</button>
					<button className="navlink resume-button buffered-button">Résumé</button>
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
