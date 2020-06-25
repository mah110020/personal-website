import React from "react";
import "./AboutMe.scss";
import dog from "./space-dog.jpg";

class AboutMe extends React.Component {

	render() {
		return (
			<div className="about-me">
				<div className="side-panel">
					<div className="no-flow center">
						<figure>
							<img src={dog} alt="Dog in astronaut suit"/>
							<figcaption>Art in L'Enfant Plaza, D.C. Metro</figcaption>
						</figure>
					</div>
				</div>
				<div className="text-column primary-panel">
					<p>
						Hello! I am Matthew Henderson.
					</p>
					<p>
						I currently work at NASA Goddard Space Flight Center. I am a contractor doing software development.
						NASA Goddard is located in Greenbelt, Maryland just outside the D.C. beltway.
						I initially moved to the D.C. area while my girlfriend Abby attended grad school at the
						University of Maryland. I worked on-site at the center for two years before moving to Texas
						and continuing development for our projects in a remote capacity.
					</p>
					<p>
						NASA Goddard is a very lively place to work. It is a large campus, with many buildings, and a
						lot of history hidden throughout. Many building atriums function as small museums, filled with
						plaques, depictions, and exhibits to science and NASA missions. You may see your own face looking
						back in the mirrors of a model space telescope, or in the polish of a Nobel prize.
						Large prints of nebulas adorn the cafeteria. There is also a dedicated museum outside the gate.
						As you stroll through the rocket garden, you will find the center is separated by
						greenery, and surrounded by forest.
						Many deer and geese take up safe residence within the fence line, and emerge at dusk to obstruct
						the roads.
					</p>
					<p>
						There are many NASA affiliated centers, each with personnel performing a wide assortment of duties.
						A large chunk of which are contractors like myself.
						Not everyone is a rocket scientist.
						Working at NASA has always been a dream of mine, and I consider it an honor to support the
						agency and the mission however I can.
					</p>
				</div>
				<div className="side-panel">
				</div>
			</div>
		);
	}
}

export default AboutMe;
