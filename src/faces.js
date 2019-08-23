import shapes from "./data.js";
import {get2DFrom3DPolygon} from "./mathUtils.js";

const faces = Object.fromEntries(
	Object.entries(shapes).map(([key, shape]) => {
		const {
			points, // 2d points
			vertices, // 3d points
			transform, // matrix to transform the 2d points back into the 3d points
			normal // normal of 3d polygon
		} = get2DFrom3DPolygon(
			shape.map( ([x, y, z]) => ({ x, y, z }) )
		);

		return [key, { points, vertices, transform, normal }];
	})
);

export default faces;
