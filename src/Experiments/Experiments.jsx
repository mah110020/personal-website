import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar.jsx";
import { navigateURL } from "../actions.js";
import onPress from "../onPress.js";
import "./Experiments.scss";

class Experiments extends React.Component {

	render() {
		return (
			<div className="experiments">
				<Sidebar />

				<div className="primary-content">
					{/*TODO: add some cool stuff.*/}
				</div>
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
)(Experiments);
