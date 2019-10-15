import React from "react";
import { connect } from "react-redux";
import { navigateURL } from "../actions.js";
import onPress from "../onPress.js";
import "./Navbar.scss";
import "../Navbuttons.scss";

class Navbar extends React.Component {

	homeHandler = onPress(this.props.navigateURL.bind(null, "/"));
	aboutHandler = onPress(this.props.navigateURL.bind(null, "/about"));
	//experimentsHandler = onPress(this.props.navigateURL.bind(null, "/experiments"));

	render() {
		return (
			<div className="navbar navbuttons">
				<button className={`navlink home-button ${this.props.url === "/" ? "active" : ""}`} {...this.homeHandler}>Home</button>
				<button className={`navlink about-button ${this.props.url === "/about" ? "active" : ""}`} {...this.aboutHandler}>About</button>
				<button className={`navlink experiments-button ${this.props.url === "/experiments" ? "active" : ""}`}>Experiments</button>
				<button className="navlink resume-button">Résumé</button>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	url: state.url
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	navigateURL: url => dispatch(navigateURL(url))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
