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

	state = { expanded: true };

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
		return (
			<div className="sidebar">
				<div className={`sidebar-slider ${this.state.expanded ? "expanded" : ""}`}>
					{this.experiments.map( item => (
						<button key={item.route} className="topic" {...item.loadHandler}>
							{item.description}
						</button>
					))}
				</div>
				<div className="toggler">
					{this.state.expanded && <button onClick={this.toggle}><FontAwesomeIcon icon="times" className="times" size="3x"/></button> }
					{!this.state.expanded && <button onClick={this.toggle}><FontAwesomeIcon icon="bars" className="bars" size="3x"/></button> }
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
