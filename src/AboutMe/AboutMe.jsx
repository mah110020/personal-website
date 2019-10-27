import React from "react";
import "./AboutMe.scss";

class AboutMe extends React.Component {

	render() {
		return (
			<div className="about-me">
				<div className="text-column">
					<p>
						This is not a resume. This section is intended as a chance to get to know me a little.
					</p>
					<p>
						Hi. I am Matthew Henderson. I currently work as a contractor for NASA Goddard.
						NASA Goddard is located in Greenbelt, Maryland just outside the D.C. beltway.
						I Initially moved to the D.C. area while my girlfriend Abby did graduate work
						at the near-by university. I worked on-site for two years before moving to Texas
						and continuing development for our projects in a remote capacity.
					</p>
				</div>
			</div>
		);
	}
}

export default AboutMe;
