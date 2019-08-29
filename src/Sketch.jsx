import React from "react";
import lines from "./lines.js";
import "./Sketch.scss";
import house from'./d57f8263788dba01c275e578cde6066a.jpg';

const houseDims = { x: 1416, y: 1064 };
const houseOrigin = { x: 850, y: 420 };
const houseOffsetFraction = { x: houseOrigin.x/houseDims.x, y: houseOrigin.y/houseDims.y };
const houseRatio = houseDims.y/houseDims.x;
const houseHeightScale = 41;

class Sketch extends React.Component {

	render() {
		return (
			<div className="sketch">
				<svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
					<image href={house} x={50-houseOffsetFraction.x*houseHeightScale} y={50-houseOffsetFraction.y*houseRatio*houseHeightScale} height={houseRatio*houseHeightScale} width={houseHeightScale} />;
					{lines.map( ({from, to}) =>
						<line x1={50+5*from.x} y1={50+5*-from.y} x2={50+5*to.x} y2={50+5*-to.y} style={{stroke:"rgb(0,0,0)",strokeWidth:0.075}} />
					)}
				</svg>
			</div>
		);
	}
}

export default Sketch;
