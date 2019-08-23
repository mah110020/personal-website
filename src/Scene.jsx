import React from "react";
import * as THREE from "three";
import * as MathUtils from "./mathUtils.js";
import faces from "./faces.js";
import parametricTransforms from "./parametricTransforms.js";
import "./Scene.scss";

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

			// describes behavior evolution
			const parametricTransform = parametricTransforms[key];

			meshMap[key] = {
				mesh,
				parametricTransform: radians => {
					resetTransforms(mesh);
					const transform = parametricTransform(radians);
					mesh.applyMatrix(new THREE.Matrix4().set( ...transform ));
				}
			};
			return meshMap;
		}, {});

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
