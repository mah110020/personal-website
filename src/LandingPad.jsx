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
					<span className="name-expander">
						<span>matthew.h</span>
						<span className="text-expand">enderso</span>
						<span>n</span>
					</span>
				</div>

				<div className="slice align-center">
					<FontAwesomeIcon icon="chevron-down" className="chevron-down" size="6x"/>
				</div>
			</div>
		);
	}
}

export default LandingPad;
