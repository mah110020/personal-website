import lineData from "./lineData.js";

const lines = lineData.map( ([[x1,y1], [x2,y2]]) => ({
	from: { x: x1, y: y1 },
	to: { x: x2, y: y2 }
}));

export default lines;
