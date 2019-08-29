import React from "react";
import Scene from "./Scene.jsx";
import Sketch from "./Sketch.jsx";
import "./Parallax.scss";

const panelFadePortion = (scrollContainer, stickyContainer, stickyPanel) => {
	const panelFadeInPos = stickyContainer.offsetTop - scrollContainer.offsetTop;
	const panelFadeOutPos = panelFadeInPos + stickyContainer.offsetHeight - stickyPanel.offsetHeight;
	const panelFadeFraction = (scrollContainer.scrollTop - panelFadeInPos) / (panelFadeOutPos - panelFadeInPos);
	const panelFadePortion = Math.max(0, Math.min(1, panelFadeFraction ));
	return panelFadePortion;
};

class Parallax extends React.Component {
	state = { portion: 0 };

	sliderRef = React.createRef();
	panelRef = React.createRef();

	handleScroll = evt => {
		const portion = panelFadePortion(evt.target, this.sliderRef.current, this.panelRef.current);
		this.setState({ portion });
	};

	render() {
		return (
			<div className="parallax" onScroll={this.handleScroll}>

				<div className="panel panel1">
					<Sketch />
				</div>

				<div className="slider" ref={this.sliderRef}>
					<div ref={this.panelRef}>
						<Scene radians={Math.PI/2 * 0.95 * (1 - this.state.portion)} />
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
