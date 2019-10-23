import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const items = [];//Array(50).fill("").map( item => "0123456789abcefghijklmnopqrstuvwxyz" );

class Sidebar extends React.Component {

	state = { expanded: true };

	toggle = () => this.setState({ expanded: !this.state.expanded });

	render(){
		return (
			<div className="sidebar">
				<div className={`sidebar-slider ${this.state.expanded ? "expanded" : ""}`}>
					{items.map( item => (
						<button className="topic" onClick={this.toggle}>
							{item}
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

export default Experiments;
