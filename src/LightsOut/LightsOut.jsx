import React from "react";
import "./LightsOut.scss";

class LightsOut extends React.Component {
	render() {
		return (
			<div className="lights-out">
				<iframe
					title="Lights Out!"
					src={process.env.PUBLIC_URL + '/LightsOut.html'}
				/>
			</div>
		);
	}
}

export default LightsOut;
