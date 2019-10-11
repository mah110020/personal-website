import React from "react";
import LandingPad from "./LandingPad/LandingPad.jsx";
import Scene from "./Scene/Scene.jsx";
import Sketch from "./Sketch/Sketch.jsx";
import "./Parallax.scss";

const panelFadePortion = (scrollContainer, stickyContainer, stickyPanel) => {
	const panelFadeInPos = stickyContainer.offsetTop - scrollContainer.offsetTop;
	const panelFadeOutPos = panelFadeInPos + stickyContainer.offsetHeight - stickyPanel.offsetHeight;
	const panelFadeFraction = (scrollContainer.scrollTop - panelFadeInPos) / (panelFadeOutPos - panelFadeInPos);
	const panelFadePortion = Math.max(0, Math.min(1, panelFadeFraction ));
	return panelFadePortion;
};

class Parallax extends React.Component {
	state = { portion1: 0, portion2: 0 };

	slider1Ref = React.createRef();
	panel2Ref = React.createRef();
	slider2Ref = React.createRef();
	panel1Ref = React.createRef();

	handleScroll = evt => {
		const portion1 = panelFadePortion(evt.target, this.slider1Ref.current, this.panel1Ref.current);
		const portion2 = panelFadePortion(evt.target, this.slider2Ref.current, this.panel2Ref.current);
		this.setState({ portion1, portion2 });
	};

	render() {
		return (
			<div className="parallax" onScroll={this.handleScroll}>

				<div className="panel panel1">
					<LandingPad />
				</div>

				<div className="slider" ref={this.slider1Ref}>
					<div ref={this.panel1Ref}>
						<Sketch portion={this.state.portion1} />
					</div>
				</div>

				<div className="slider" ref={this.slider2Ref}>
					<div ref={this.panel2Ref}>
						<Scene radians={Math.PI/2 * 0.95 * (1 - this.state.portion2)} />
					</div>
				</div>

				<div className="panel panel3">
					<span>Welcome</span>
				</div>

				<div className="panel panel4">
					<span>Back</span>
				</div>

			</div>
		);
	}
}

export default Parallax;
