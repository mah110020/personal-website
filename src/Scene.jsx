import React from "react";
import * as THREE from "three";
import * as MathUtils from "./mathUtils.js";
import shapes from "./data.js";
import "./Scene.scss";

const faces = Object.fromEntries(
	Object.entries(shapes).map(([key, points]) => {
		const vertices = points.map( ([x, y, z]) => ({ x, y, z }));
		const face = MathUtils.get2DFrom3DPolygon(vertices);
		return [key, face];
	})
);

class Scene extends React.Component {
	constructor(props){
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount(){
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		this.ref.current.appendChild( renderer.domElement );

		const resetTransforms = mesh => {
			mesh.position.set( 0, 0, 0 );
			mesh.rotation.set( 0, 0, 0 );
			mesh.scale.set( 1, 1, 1 );
			mesh.updateMatrix();
		};

		const meshMap = Object.entries(faces).reduce((meshMap, [key, value]) => {

			const shape = new THREE.Shape(
				value.points.map( point => new THREE.Vector2(point.x,point.y) )
			);

			const geometry = new THREE.ShapeGeometry(shape);

			const material = new THREE.MeshPhongMaterial({
				side: THREE.DoubleSide,
				color: Math.random()*0xFFFFFF|0
			});

			const mesh = new THREE.Mesh(geometry, material);

			const matrix = new THREE.Matrix4().set(
				...value.transform.flat().map( scl => Math.abs(scl) < 0.00001 ? 0.00001 : scl )
			);

			mesh.matrixAutoUpdate = false;
			mesh.applyMatrix(matrix);

			// reset the position, rotation, and scale

			geometry.applyMatrix( mesh.matrix );
			resetTransforms(mesh);

			meshMap[key] = {
				mesh,
				parametricTransform: null
			};
			return meshMap;
		}, {});

		// describes behavior evolution, and default behavior
		const parametricTransforms = new Proxy({
			handle2dd6: radians => {
				// top left side-roof
				const {mesh} = meshMap.handle2dd6;
				resetTransforms(mesh);

				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2dd5.vertices);
				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2dd6.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // most-forward bottom of side-roof
				const p2i = { x: minB.x, y: minB.y, z: minB.z }; // most-back bottom of side-roof
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of side-roof
				const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of roof corners

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2dd5: radians => {
				// bottom left side-roof
				const {mesh} = meshMap.handle2dd5;
				resetTransforms(mesh);

				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2dd5.vertices);
				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2dd6.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // most-forward bottom of side-roof
				const p2i = { x: minB.x, y: minB.y, z: minB.z }; // most-back bottom of side-roof
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of side-roof
				const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of roof corners

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2062: radians => {
				// top of left 4-trangle square
				const {mesh} = meshMap.handle2062;
				resetTransforms(mesh);

				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2062.vertices);
				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2063.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // bottom of top side-pair
				const p2i = { x: minB.x, y: maxB.y, z: maxB.z }; // forward-most top of top side-pair
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // back-most top of top side-pair
				const p4i = { x: minT.x, y: minB.y, z: minT.z }; // union point of side-quad

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2063: radians => {
				// forward-most of left 4-trangle square
				const {mesh} = meshMap.handle2063;
				resetTransforms(mesh);

				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2062.vertices);
				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2063.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // bottom of top side-pair
				const p2i = { x: minB.x, y: maxB.y, z: maxB.z }; // forward-most top of top side-pair
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // back-most top of top side-pair
				const p4i = { x: minT.x, y: minB.y, z: minT.z }; // union point of side-quad

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2061: radians => {
				// bottom of left 4-trangle square
				const {mesh} = meshMap.handle2061;
				resetTransforms(mesh);

				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2060.vertices);
				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2061.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // forward-most bottom of bottom side-pair
				const p2i = { x: minB.x, y: minB.y, z: minB.z }; // back-most bottom of bottom side-pair
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of bottom side-pair
				const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of side-quad

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2060: radians => {
				// back-most of left 4-trangle square
				const {mesh} = meshMap.handle2060;
				resetTransforms(mesh);

				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2060.vertices);
				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2061.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // forward-most bottom of bottom side-pair
				const p2i = { x: minB.x, y: minB.y, z: minB.z }; // back-most bottom of bottom side-pair
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of bottom side-pair
				const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of side-quad

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2d71: radians => {
				// bottom roof
				const {mesh} = meshMap.handle2d71;
				resetTransforms(mesh);

				const {min: minRT, max: maxRT} = MathUtils.boundingBox(faces.handle2d72.vertices);
				const {min: minRB, max: maxRB} = MathUtils.boundingBox(faces.handle2d71.vertices);

				const p1i = { x: minRB.x, y: maxRB.y, z: minRB.z }; // bottom right of bottom roof
				const p2i = { x: maxRB.x, y: maxRB.y, z: minRB.z }; // bottom left of bottom roof
				const p3i = { x: minRT.x, y: minRT.y, z: maxRT.z }; // bottom right of top roof
				const p4i = { x: minRT.x, y: maxRT.y, z: minRT.z }; // right union point of roof corners

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2d72: radians => {
				// top roof
				const {mesh} = meshMap.handle2d72;
				resetTransforms(mesh);

				const {min: minRT, max: maxRT} = MathUtils.boundingBox(faces.handle2d72.vertices);
				const {min: minRB, max: maxRB} = MathUtils.boundingBox(faces.handle2d71.vertices);

				const p1i = { x: minRT.x, y: minRT.y, z: maxRT.z }; // top right of top roof
				const p2i = { x: maxRT.x, y: minRT.y, z: maxRT.z }; // top left of top roof
				const p3i = { x: minRB.x, y: maxRB.y, z: minRB.z }; // top right of bottom roof
				const p4i = { x: minRT.x, y: maxRT.y, z: minRT.z }; // right union point of roof corners

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).max; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2b3c: radians => {
				// top of right 4-trangle square
				const {mesh} = meshMap.handle2b3c;
				resetTransforms(mesh);

				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2b3c.vertices);
				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2b3d.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // bottom of top side-pair
				const p2i = { x: minB.x, y: maxB.y, z: maxB.z }; // forward-most top of top side-pair
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // back-most top of top side-pair
				const p4i = { x: minT.x, y: minB.y, z: minT.z }; // union point of side-quad

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2b3d: radians => {
				// forward-most of right 4-trangle square
				const {mesh} = meshMap.handle2b3d;
				resetTransforms(mesh);

				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2b3c.vertices);
				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2b3d.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // bottom of top side-pair
				const p2i = { x: minB.x, y: maxB.y, z: maxB.z }; // forward-most top of top side-pair
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // back-most top of top side-pair
				const p4i = { x: minT.x, y: minB.y, z: minT.z }; // union point of side-quad

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2b3b: radians => {
				// bottom of right 4-trangle square
				const {mesh} = meshMap.handle2b3b;
				resetTransforms(mesh);

				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2b3a.vertices);
				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2b3b.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // forward-most bottom of bottom side-pair
				const p2i = { x: minB.x, y: minB.y, z: minB.z }; // back-most bottom of bottom side-pair
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of bottom side-pair
				const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of side-quad

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2b3a: radians => {
				// back-most of right 4-trangle square
				const {mesh} = meshMap.handle2b3a;
				resetTransforms(mesh);

				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2b3a.vertices);
				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2b3b.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // forward-most bottom of bottom side-pair
				const p2i = { x: minB.x, y: minB.y, z: minB.z }; // back-most bottom of bottom side-pair
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of bottom side-pair
				const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // union point of side-quad

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2066: radians => {
				// bottom right side-roof
				const {mesh} = meshMap.handle2066;
				resetTransforms(mesh);

				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2066.vertices);
				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2067.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // most-forward bottom of side-roof
				const p2i = { x: minB.x, y: minB.y, z: minB.z }; // most-back bottom of side-roof
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of side-roof
				const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // right union point of roof corners

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p1i, p2i, p4i, p1f, p2f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			},
			handle2067: radians => {
				// top right side-roof
				const {mesh} = meshMap.handle2067;
				resetTransforms(mesh);

				const {min: minB, max: maxB} = MathUtils.boundingBox(faces.handle2066.vertices);
				const {min: minT, max: maxT} = MathUtils.boundingBox(faces.handle2067.vertices);

				const p1i = { x: minB.x, y: maxB.y, z: minB.z }; // most-forward bottom of side-roof
				const p2i = { x: minB.x, y: minB.y, z: minB.z }; // most-back bottom of side-roof
				const p3i = { x: minT.x, y: minT.y, z: maxT.z }; // top of side-roof
				const p4i = { x: minT.x, y: maxT.y, z: maxB.z }; // right union point of roof corners

				const p1f = { x: p1i.x, y: p1i.y + p1i.z * Math.sin(radians), z: p1i.z * Math.cos(radians) };
				const p2f = { x: p2i.x, y: p2i.y + p2i.z * Math.sin(radians), z: p2i.z * Math.cos(radians) };
				const p3f = { x: p3i.x, y: p3i.y + p3i.z * Math.sin(radians), z: p3i.z * Math.cos(radians) };

				const r1 = MathUtils.dist(p1i, p4i);
				const r2 = MathUtils.dist(p2i, p4i);
				const r3 = MathUtils.dist(p3i, p4i);

				const [p4fa, p4fb] = MathUtils.threeSphereIntersection( p1f, r1, p2f, r2, p3f, r3 );
				const p4f = MathUtils.minMax([p4fa, p4fb]).min; // fold outward

				const transform = MathUtils.getRigidTransformByPlane( p2i, p3i, p4i, p2f, p3f, p4f );

				mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
			}
		}, {
			// default parametric transformation, which describes most behavior
			get: (target, key) => target[key] || (radians => {
				const {mesh} = meshMap[key];
				resetTransforms(mesh);

				mesh.applyMatrix(new THREE.Matrix4().set(
					1,0,0,0,
					0,1,Math.sin(radians),0,
					0,0,Math.cos(radians),0,
					0,0,0,1
				));
			})
		});

		for( const handle in meshMap ){
			meshMap[handle].parametricTransform = parametricTransforms[handle];
		}

		for( const {mesh, parametricTransform} of Object.values(meshMap) ){
			scene.add(mesh);
			parametricTransform(Math.PI/16);
		}

		const light1 = new THREE.PointLight( 0xffffff, 1, 100 );
		light1.position.set( 10, 10, 10 );
		scene.add( light1 );

		const light2 = new THREE.PointLight( 0xffffff, 1, 100 );
		light2.position.set( -10, -10, -10 );
		scene.add( light2 );

		const axesHelper = new THREE.AxesHelper( 100 );
		scene.add( axesHelper );

		let angle = 0;
		const animate = function () {
			requestAnimationFrame( animate );

			camera.position.set(2*Math.sin(angle),7+2*Math.cos(angle),5);
			// for( const {mesh, parametricTransform} of Object.values(meshMap) ){
			// 	scene.add(mesh);
			// 	parametricTransform(angle/4%(Math.PI/2));
			// }

			camera.up.set(0,0,1);
			camera.lookAt(new THREE.Vector3(8.5/2,5.5/2,5.5/2));
			angle += 0.01;

			renderer.render( scene, camera );
		};

		animate();
	}

	render() {
		return (
			<div className="scene" ref={this.ref} />
		);
	}
}

export default Scene;
