import faces from "./faces.js";
import * as MathUtils from "./mathUtils.js";

const defaultPointFold = (radians, vertices) => vertices.map( vertex => ({
	x: vertex.x,
	y: vertex.z * Math.sin(radians) + vertex.y,
	z: vertex.z * Math.cos(radians)
}));

// default parametric transformation, which describes most behavior
const defaultParametricTransform = radians => {
	return [
		1, 0, 0, 0,
		0, 1, Math.sin(radians), 0,
		0, 0, Math.cos(radians), 0,
		0, 0, 0, 1
	];
};

const parametricTransforms = new Proxy({
	handle2dd6: radians => {
		// top left side-roof

		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2dd5.vertices);
		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2dd6.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // most-forward bottom of side-roof
		const p2i = { x: minB.x, y: minB.y, z: minB.z }; // most-back bottom of side-roof
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of side-roof
		const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of roof corners

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

		return transform;
	},
	handle2dd5: radians => {
		// bottom left side-roof

		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2dd5.vertices);
		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2dd6.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // most-forward bottom of side-roof
		const p2i = { x: minB.x, y: minB.y, z: minB.z }; // most-back bottom of side-roof
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of side-roof
		const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of roof corners

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

		return transform;
	},
	handle2062: radians => {
		// top of left 4-trangle square

		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2062.vertices);
		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2063.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // bottom of top side-pair
		const p2i = { x: minB.x, y: maxB.y, z: maxB.z }; // forward-most top of top side-pair
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // back-most top of top side-pair
		const p4i = { x: minT.x, y: minB.y, z: minT.z }; // union point of side-quad

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

		return transform;
	},
	handle2063: radians => {
		// forward-most of left 4-trangle square

		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2062.vertices);
		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2063.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // bottom of top side-pair
		const p2i = { x: minB.x, y: maxB.y, z: maxB.z }; // forward-most top of top side-pair
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // back-most top of top side-pair
		const p4i = { x: minT.x, y: minB.y, z: minT.z }; // union point of side-quad

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

		return transform;
	},
	handle2061: radians => {
		// bottom of left 4-trangle square

		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2060.vertices);
		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2061.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // forward-most bottom of bottom side-pair
		const p2i = { x: minB.x, y: minB.y, z: minB.z }; // back-most bottom of bottom side-pair
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of bottom side-pair
		const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of side-quad

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

		return transform;
	},
	handle2060: radians => {
		// back-most of left 4-trangle square

		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2060.vertices);
		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2061.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // forward-most bottom of bottom side-pair
		const p2i = { x: minB.x, y: minB.y, z: minB.z }; // back-most bottom of bottom side-pair
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of bottom side-pair
		const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of side-quad

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

		return transform;
	},
	handle2d71: radians => {
		// bottom roof

		const {min: minRT, max: maxRT} = MathUtils.boundingBox(faces.handle2d72.vertices);
		const {min: minRB, max: maxRB} = MathUtils.boundingBox(faces.handle2d71.vertices);

		const p1i = { x: minRB.x, y: maxRB.y, z: minRB.z }; // bottom right of bottom roof
		const p2i = { x: maxRB.x, y: maxRB.y, z: minRB.z }; // bottom left of bottom roof
		const p3i = { x: minRT.x, y: minRT.y, z: maxRT.z }; // bottom right of top roof
		const p4i = { x: minRT.x, y: maxRT.y, z: minRT.z }; // right union point of roof corners

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

		return transform;
	},
	handle2d72: radians => {
		// top roof

		const {min: minRT, max: maxRT} = MathUtils.boundingBox(faces.handle2d72.vertices);
		const {min: minRB, max: maxRB} = MathUtils.boundingBox(faces.handle2d71.vertices);

		const p1i = { x: minRT.x, y: minRT.y, z: maxRT.z }; // top right of top roof
		const p2i = { x: maxRT.x, y: minRT.y, z: maxRT.z }; // top left of top roof
		const p3i = { x: minRB.x, y: maxRB.y, z: minRB.z }; // top right of bottom roof
		const p4i = { x: minRT.x, y: maxRT.y, z: minRT.z }; // right union point of roof corners

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

		return transform;
	},
	handle2b3c: radians => {
		// top of right 4-trangle square

		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2b3c.vertices);
		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2b3d.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // bottom of top side-pair
		const p2i = { x: minB.x, y: maxB.y, z: maxB.z }; // forward-most top of top side-pair
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // back-most top of top side-pair
		const p4i = { x: minT.x, y: minB.y, z: minT.z }; // union point of side-quad

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

		return transform;
	},
	handle2b3d: radians => {
		// forward-most of right 4-trangle square

		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2b3c.vertices);
		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2b3d.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // bottom of top side-pair
		const p2i = { x: minB.x, y: maxB.y, z: maxB.z }; // forward-most top of top side-pair
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // back-most top of top side-pair
		const p4i = { x: minT.x, y: minB.y, z: minT.z }; // union point of side-quad

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

		return transform;
	},
	handle2b3b: radians => {
		// bottom of right 4-trangle square

		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2b3a.vertices);
		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2b3b.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // forward-most bottom of bottom side-pair
		const p2i = { x: minB.x, y: minB.y, z: minB.z }; // back-most bottom of bottom side-pair
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of bottom side-pair
		const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of side-quad

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

		return transform;
	},
	handle2b3a: radians => {
		// back-most of right 4-trangle square

		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2b3a.vertices);
		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2b3b.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // forward-most bottom of bottom side-pair
		const p2i = { x: minB.x, y: minB.y, z: minB.z }; // back-most bottom of bottom side-pair
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of bottom side-pair
		const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of side-quad

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

		return transform;
	},
	handle2066: radians => {
		// bottom right side-roof

		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2066.vertices);
		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2067.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // most-forward bottom of side-roof
		const p2i = { x: minB.x, y: minB.y, z: minB.z }; // most-back bottom of side-roof
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of side-roof
		const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // right union point of roof corners

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

		return transform;
	},
	handle2067: radians => {
		// top right side-roof

		const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2066.vertices);
		const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2067.vertices);

		const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // most-forward bottom of side-roof
		const p2i = { x: minB.x, y: minB.y, z: minB.z }; // most-back bottom of side-roof
		const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of side-roof
		const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // right union point of roof corners

		const [p1f, p2f, p3f] = defaultPointFold(radians, [p1i, p2i, p3i]);

		const r1 = MathUtils.dist(p1i, p4i);
		const r2 = MathUtils.dist(p2i, p4i);
		const r3 = MathUtils.dist(p3i, p4i);

		const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
		const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

		const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

		return transform;
	}
}, {
	get: (target, key) => target[key] || defaultParametricTransform
});

export default parametricTransforms;
