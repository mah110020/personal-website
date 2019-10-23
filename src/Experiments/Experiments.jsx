import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar.jsx";
import LightsOut from "../LightsOut/LightsOut.jsx";
import { navigateURL } from "../actions.js";
import onPress from "../onPress.js";
import "./Experiments.scss";

const items = {
	"lights-out": <LightsOut />
};

class Experiments extends React.Component {

	render() {
		return (
			<div className="experiments">
				<Sidebar />

				<div className="primary-content">
					{items[this.props.experiment]}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	// e.g. "/experiments/lights-out" -> "lights-out"
	experiment: state.url.split("/experiments/")[1] || ""
});

export default connect(
	mapStateToProps,
	null
)(Experiments);
