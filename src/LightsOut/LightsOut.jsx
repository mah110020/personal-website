import React from "react";
import "./LightsOut.scss";

class LightsOut extends React.Component {

	ref = React.createRef();

	componentDidMount(){
		this.forceUpdate();
	}

	render() {
		const parentMin = !this.ref.current
			? 0
			: Math.min(this.ref.current.clientWidth, this.ref.current.clientHeight);

		return (
			<div className="lights-out" ref={this.ref}>
				<iframe
					title="Lights Out!"
					style={{width: `${parentMin}px`, height: `${parentMin}px`}}
					src={process.env.PUBLIC_URL + '/LightsOut.html'}
				/>
			</div>
		);
	}
}

export default LightsOut;
