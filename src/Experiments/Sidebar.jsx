import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import onPress from "../onPress.js";
import { navigateURL } from "../actions.js";
import "./Sidebar.scss";

const items = [{
	route: "",
	description: "Experiments Home"
},{
	route: "lights-out",
	description: "CSS-Only Game"
}];//Array(50).fill("").map( item => ({route:null, description: "0123456789abcefghijklmnopqrstuvwxyz"}) );

class Sidebar extends React.Component {

	state = { expanded: false };

	toggle = () => this.setState({ expanded: !this.state.expanded });

	experiments = items.map( ({route, description}) => ({
		route,
		description,
		loadHandler: onPress( evt => {
			this.toggle();
			this.props.navigateURL(`/experiments/${route}`);
		})
	}));

	render(){
		const toggleIcon = this.state.expanded ? "times" : "bars";

		return (
			<div className={`sidebar ${this.state.expanded ? "expanded" : ""}`}>
				<div
					className="sidebar-screen"
					onClick={this.toggle}
				></div>
				<div className="sidebar-slider">
					{this.experiments.map( item => (
						<button key={item.route} className="topic" {...item.loadHandler}>
							{item.description}
						</button>
					))}
				</div>
				<div className="toggler">
					<button onClick={this.toggle}><FontAwesomeIcon icon={toggleIcon} className={toggleIcon} size="3x"/></button>
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
)(Sidebar);
