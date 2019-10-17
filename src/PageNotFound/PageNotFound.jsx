import React from "react";
import { connect } from "react-redux";
import "./PageNotFound.scss";
import "../Navbuttons.scss";
import { navigateURL } from "../actions.js";
import onPress from "../onPress.js";

class PageNotFound extends React.Component {

	homeHandler = onPress(this.props.navigateURL.bind(null, "/"));

	render() {
		return (
			<div className="page-not-found navbuttons">
				<span className="not-found-text">Page not found.</span>
				<button
					className="navlink buffered-button home-button"
					{...this.homeHandler}
				>
					Return to Home
				</button>
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
)(PageNotFound);
