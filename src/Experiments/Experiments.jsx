import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar.jsx";
import LightsOut from "../LightsOut/LightsOut.jsx";
import { navigateURL } from "../actions.js";
import "./Experiments.scss";

const ExperimentsHome = () => {
	return (
		<div className="experiments-home">
			<span style={{fontWeight:"bold"}}>Welcome to the experiments area.</span>
			<div className="text-column">
				<p>
					This is a creative space for me to explore ideas & technology,
					in ways that I might otherwise not be able to in everyday
					professional work.
				</p>
				<p>
					Those are available in the left sidebar. Though there isn't much here yet!
				</p>
			</div>
		</div>
	);
};

const items = {
	"": <ExperimentsHome />,
	"lights-out": <LightsOut />
};

class Experiments extends React.Component {

	render() {
		return (
			<div className="experiments">
				<Sidebar />

				<div className="primary-content sidebar-blur">
					<div className="new-block-formatting-context">
						{items[this.props.experiment]}
					</div>
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
