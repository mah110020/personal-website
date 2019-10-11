import React from "react";
import * as THREE from "three";
import * as MathUtils from "./mathUtils.js";
import faces from "./faces.js";
import styling from "./styling.js";
import parametricTransforms from "./parametricTransforms.js";
import faceTypeFont from "./optimer_regular.typeface.json";
import "./Scene.scss";

let fold = null;

class Scene extends React.Component {
	ref = React.createRef();

	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevProps.radians !== this.props.radians){
			const {radians} = this.props;
			fold(radians);
		}
	}

	componentDidMount(){
		const {radians: initAngle} = this.props;

		const scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xa6deff );
		const camera = new THREE.PerspectiveCamera( 75, this.ref.current.clientWidth/this.ref.current.clientHeight, 0.1, 1000 );

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize( this.ref.current.clientWidth, this.ref.current.clientHeight );
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
				color: styling[key]
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

		// create text geometry
		const loader = new THREE.FontLoader();
		const font = loader.parse(faceTypeFont);
		const textGeometry = new THREE.TextGeometry( "Something", {
			font: font,
			size: 1,
			height: 0
		});
		const textMaterial = new THREE.MeshPhongMaterial({
			color: 0xff0000,
			specular: 0xffffff
		});
		const textMesh = new THREE.Mesh( textGeometry, textMaterial );

		textGeometry.center();
		textGeometry.rotateX(-Math.PI/2);
		textGeometry.rotateZ(Math.PI);
		textGeometry.translate(8.5/2, -0.001, 11/4);

		// add the text mesh to the meshMap
		meshMap["handleText"] = {
			mesh: textMesh,
			parametricTransform: radians => {
				textMesh.rotation.x = -radians;
			}
		};

		for( const {mesh, parametricTransform} of Object.values(meshMap) ){
			scene.add(mesh);
			parametricTransform(initAngle);
		}

		const light1 = new THREE.PointLight( 0xffffff, 1, 150 );
		light1.position.set( 10, 10, 10 );
		scene.add( light1 );

		const light2 = new THREE.PointLight( 0xffffff, 1, 150 );
		light2.position.set( -10, -10, -10 );
		scene.add( light2 );

		//const axesHelper = new THREE.AxesHelper( 100 );
		//scene.add( axesHelper );

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

		fold = radians => {
			for( const {mesh, parametricTransform} of Object.values(meshMap) ){
				parametricTransform(radians);
			}
		};
	}

	render() {
		return (
			<div className="scene" ref={this.ref} />
		);
	}
}

export default Scene;
