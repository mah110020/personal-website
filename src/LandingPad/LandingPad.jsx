import React from "react";
import "./LandingPad.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LandingPad extends React.Component {

	render() {
		return (
			<div className="landing-pad">

				<div className="slice align-center">
				</div>

				<div className="slice align-center">
					<div className="name-expander">
						<span className="text-static">matthew.h</span>
						<span className="text-expand">enderso</span>
						<span className="text-static">n</span>
					</div>
					<div>
						A sandbox site for my own stuff.
					</div>
				</div>

				<div className="slice align-center">
					<FontAwesomeIcon icon="chevron-down" className="chevron-down" size="6x"/>
				</div>
			</div>
		);
	}
}

export default LandingPad;
