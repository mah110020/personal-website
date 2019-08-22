export const add = (p1, p2) => ({
	x: p1.x + p2.x,
	y: p1.y + p2.y,
	z: p1.z + p2.z
});

export const multi = (scalar, p1) => ({
	x: scalar * p1.x,
	y: scalar * p1.y,
	z: scalar * p1.z
});

export const sub = (p1, p2) => add(p1, multi(-1, p2));
export const dot = (p1, p2) => p1.x * p2.x + p1.y * p2.y + p1.z * p2.z;
export const mag = p1 => Math.hypot(p1.x, p1.y, p1.z);
export const dist = (p1, p2) => mag( sub(p1, p2) );

export const minMax = vertices => {
	return vertices.reduce((rdc, vertex) => {
		const hyp = mag(vertex);
		if( !(hyp >= rdc.mag.min) ){
			rdc.vertex.min = vertex;
			rdc.mag.min = hyp;
		}
		if( !(hyp <= rdc.mag.max) ){
			rdc.vertex.max = vertex;
			rdc.mag.max = hyp;
		}
		return rdc;
	}, {
		vertex: { min: null, max: null },
		mag: { min: NaN, max: NaN }
	}).vertex;
};

export const unit = p1 => {
	const hyp = mag(p1);
	return {
		x: p1.x / hyp,
		y: p1.y / hyp,
		z: p1.z / hyp
	};
};

export const cross = (p1, p2) => ({
	x: p1.y * p2.z - p1.z * p2.y,
	y: p1.z * p2.x - p1.x * p2.z,
	z: p1.x * p2.y - p1.y * p2.x
});

export const getLocalCoords = (p1, p2, p3) => {

	const diff2 = sub(p2, p1);
	const diff3 = sub(p3, p1);
	const crossZ = cross(diff2, diff3);
	const crossY = cross(crossZ, diff2);

	const localX = unit(diff2);
	const localY = unit(crossY);
	const localZ = unit(crossZ);

	const u = dot(diff2, localX);
	const vx = dot(diff3, localX);
	const vy = dot(diff3, localY);

	return {
		t1: {x: 0, y: 0, z: 0},
		t2: {x: u, y: 0, z: 0},
		t3: {x: vx, y: vy, z: 0},
		localX,
		localY,
		localZ,
		origin: p1
	};
};

// find intersection of three spheres, which is zero, one, or two points
// https://en.wikipedia.org/wiki/True_range_multilateration#Three_Cartesian_dimensions,_three_measured_slant_ranges
export const threeSphereIntersection = (p1, r1, p2, r2, p3, r3) => {

	const {t2, t3, localX, localY, localZ} = getLocalCoords(p1, p2, p3);

	const u = t2.x;
	const vx = t3.x;
	const vy = t3.y;

	const x = (r1**2 - r2**2 + u**2) / (2*u);
	const y = (r1**2 - r3**2 + vx**2 + vy**2 - 2*vx*x) / (2*vy);
	const z1 = Math.sqrt(r1**2 - x**2 - y**2) || 0; // assumption: solution exists
	const z2 = -z1;

	const cent = add(p1, add(multi(x, localX), multi(y, localY)));
	const p4a = add(cent, multi(z1, localZ));
	const p4b = add(cent, multi(z2, localZ));

	return [p4a, p4b];
};

// https://math.stackexchange.com/questions/2306319/transforming-point-between-euclidean-coordinate-systems/2306382#2306382
export const getRigidTransformByPlane = (i1, i2, i3, f1, f2, f3) => {

	const local1 = getLocalCoords(i1, i2, i3);
	const local2 = getLocalCoords(f1, f2, f3);

	const local1X = local1.localX;
	const local1Y = local1.localY;
	const local1Z = local1.localZ;
	const origin1 = local1.origin;

	const local2X = local2.localX;
	const local2Y = local2.localY;
	const local2Z = local2.localZ;
	const origin2 = local2.origin;

	// transform global to local1
	const m1 = [
		local1X.x, local1X.y, local1X.z, -1*dot(local1X, origin1),
		local1Y.x, local1Y.y, local1Y.z, -1*dot(local1Y, origin1),
		local1Z.x, local1Z.y, local1Z.z, -1*dot(local1Z, origin1),
		0, 0, 0, 1
	];

	// express local1 with local2 rotation/offset into global
	const m2 = [
		local2X.x, local2Y.x, local2Z.x, origin2.x,// - origin1.x,
		local2X.y, local2Y.y, local2Z.y, origin2.y,// - origin1.y,
		local2X.z, local2Y.z, local2Z.z, origin2.z,// - origin1.z,
		0, 0, 0, 1
	];

	// multiply the transformation matrices together: m2*m1
	return Array(16).fill(0).map((zero, index) => { // e.g. 10 or 12 or 2
		const rowOffset = Math.floor(index/4) * 4; // e.g. 8 or 12 or 0
		const colOffset = index % 4; // e.g. 2 or 0 or 2
		return m2[rowOffset+0] * m1[colOffset+0]
			+ m2[rowOffset+1] * m1[colOffset+4]
			+ m2[rowOffset+2] * m1[colOffset+8]
			+ m2[rowOffset+3] * m1[colOffset+12];
	});
};

export const get2DFrom3DPolygon = vertices => {
	const [p1, p2, p3] = vertices.slice(0,3);
	const {localX, localY, localZ} = getLocalCoords(p1, p2, p3);

	// project points into its local coordinate frame
	const localVertices = vertices.map( point => ({
		x: dot(point, localX),
		y: dot(point, localY),
		z: 0
	}));

	const [t1, t2, t3] = localVertices.slice(0,3);
	const transformation = getRigidTransformByPlane(t1, t2, t3, p1, p2, p3); // 2d to 3d

	return {
		points: localVertices, // 2d points
		transform: transformation, // matrix to transform it back into 3d space
		vertices, // 3d points
		normal: localZ // normal of 3d polygon
	};
};

export const boundingBox = vertices => {
	return vertices.reduce((box, vertex) => {
		box.min.x = vertex.x >= box.min.x ? box.min.x : vertex.x;
		box.min.y = vertex.y >= box.min.y ? box.min.y : vertex.y;
		box.min.z = vertex.z >= box.min.z ? box.min.z : vertex.z;

		box.max.x = vertex.x <= box.max.x ? box.max.x : vertex.x;
		box.max.y = vertex.y <= box.max.y ? box.max.y : vertex.y;
		box.max.z = vertex.z <= box.max.z ? box.max.z : vertex.z;

		return box;
	}, {
		min: { x: NaN, y: NaN, z: NaN },
		max: { x: NaN, y: NaN, z: NaN }
	});
};
