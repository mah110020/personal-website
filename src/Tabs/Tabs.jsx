import React from "react";
import onPress from "../onPress.js";
import "./Tabs.scss";

// e.g.
/*
	<Tabs>
		<Tab key="panel1" header="hey1">Hello1</Tab>
		<Tab key="panel2" header="hey2">Hello2</Tab>
	</Tabs>
*/

class Tabs extends React.Component {
	state = {tabIndex: 0};

	render() {
		const children = [].concat(...[this.props.children]).filter(Boolean);

		return (
			<div className="tabs">
				<div className="tabs-headers">
					{children.map( (child, index) =>
						<TabName
							key={child.key || index}
							active={index === this.state.tabIndex}
							onPressHooks={onPress(()=>{this.setState({tabIndex: index})})}
						>
							{child.props.header || ""}
						</TabName>
					)}
				</div>
				<div className="tabs-content">
					{children.map( (child, index) =>
						<div
							key={child.key || index}
							className={`tabs-content-wrapper ${index === this.state.tabIndex ? "" : "hide"}`}
						>
							{child}
						</div>
					)}
				</div>
			</div>
		);
	}
}

class TabName extends React.Component {
	render(){
		return (
			<div className={`tabs-header ${this.props.active ? "active" : ""}`}>
				<div className="tabs-header-content" {...(this.props.onPressHooks || {})}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

class Tab extends React.Component {
	render() {
		return (
			<div className="tab">
				{this.props.children}
			</div>
		);
	}
}

export {
	Tabs,
	Tab
}
