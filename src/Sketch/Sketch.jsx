import React from "react";
import lines from "./lines.js";
import "./Sketch.scss";
import house from "./croppedHouse.jpg";

// coordinate in sketch of center of image
const linesOrigin = { x: 0, y: 0 };

const imageRatio = 1132 / 840; // width / height
const imageHeightScale = 6.6;

const imageSize = { width: imageHeightScale, height: imageHeightScale / imageRatio };

// symmetrical border box where center aligned with linesOrigin
const sketchSize = {
	width: 2 * Math.max(imageSize.width/2, ...lines.map( ({from, to}) => [Math.abs(from.x - linesOrigin.x), Math.abs(to.x - linesOrigin.x)] ).flat()),
	height: 2 * Math.max(imageSize.height/2, ...lines.map( ({from, to}) => [Math.abs(from.y - linesOrigin.y), Math.abs(to.y - linesOrigin.y)] ).flat())
};

const sketchRatio = sketchSize.width / sketchSize.height;

const imagePotion = { x: imageSize.width/sketchSize.width, y: imageSize.height/sketchSize.height };

class Sketch extends React.Component {

	containerRef = React.createRef();

	state = {
		heightScale: 0 // [pixels] control scale of sketch by changing relative to height of container, while maintaining aspect ratio
	};

	fade = () => {
		const root = this.containerRef.current;
		const {clientWidth, clientHeight} = root;
		const rootRatio = clientWidth / clientHeight;

		// as container aspect ratio gets smaller, inner component should have width 100% to be fully visible
		// as container aspect ratio gets bigger, inner component should have height 100% to be fully visible
		const initSketchHeightScale = rootRatio > imageRatio ? clientHeight / imagePotion.y : clientWidth / imageRatio / imagePotion.y;
		const finalSketchHeightScale = rootRatio > sketchRatio ? clientHeight : clientWidth / sketchRatio;

		const heightScale = initSketchHeightScale * (1 - this.props.portion) + finalSketchHeightScale * this.props.portion;
		this.setState({heightScale});
	};

	componentDidMount(){
		this.fade();
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (prevProps.portion !== this.props.portion){
			this.fade();
		}
	}

	render() {
		return (
			<div ref={this.containerRef} className="sketch">
				<div className="overlay-container" style={{width: `${sketchRatio * this.state.heightScale}px`, height: `${this.state.heightScale}px`}}>
					<div className="overlay" style={{opacity: 1 - this.props.portion}}>
						<SketchImage />
					</div>
					<div className="overlay" style={{opacity: this.props.portion}}>
						<SketchLines />
					</div>
				</div>

				<span
					className="floating-label1"
					style={{opacity: Math.min(0.5, this.props.portion)*2}}
				>
					Let's
				</span>
				<span
					className="floating-label2"
					style={{opacity: Math.max(0.5, this.props.portion)*2-1}}
				>
					Build
				</span>
			</div>
		);
	}
}

class SketchLines extends React.Component {
	shouldComponentUpdate(nextProps, nextState){
		return false;
	}

	render() {
		return (
			<svg width="100%" height="100%" viewBox={`0 0 ${sketchSize.width} ${sketchSize.height}`}>
				{lines.map( ({from, to}, index) =>
					<line
						key={index /*`lines` never changes*/}
						x1={from.x - linesOrigin.x + sketchSize.width/2}
						y1={sketchSize.height - (from.y - linesOrigin.y + sketchSize.height/2)}
						x2={to.x - linesOrigin.x + sketchSize.width/2}
						y2={sketchSize.height - (to.y - linesOrigin.y + sketchSize.height/2)}
						style={{strokeWidth:0.03}}
					/>
				)}
			</svg>
		);
	}
}

class SketchImage extends React.Component {
	shouldComponentUpdate(nextProps, nextState){
		return false;
	}

	render() {
		return (
			<svg width="100%" height="100%" viewBox={`0 0 ${sketchSize.width} ${sketchSize.height}`}>
				<image
					href={house}
					x={sketchSize.width/2 - imageSize.width/2}
					y={sketchSize.height/2 - imageSize.height/2}
					{...imageSize} />
			</svg>
		);
	}
}

export default Sketch;
