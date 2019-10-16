import React from "react";
import * as THREE from "three";
import * as MathUtils from "./mathUtils.js";
import faces from "./faces.js";
import styling from "./styling.js";
import parametricTransforms from "./parametricTransforms.js";
import faceTypeFont from "./optimer_regular.typeface.json";
import "./Scene.scss";

// translate portion to fold angle
const getAngle = portion => {
	return Math.PI/2 * 0.95 * (1 - portion);
}

class Scene extends React.Component {
	ref = React.createRef();

	fold = null;

	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevProps.portion !== this.props.portion){
			this.fold(this.props.portion);
		}
	}

	componentDidMount(){
		const initAngle = getAngle(this.props.portion);

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

		const textGeometry1 = new THREE.TextGeometry( "Something", {
			font: font,
			size: 1,
			height: 0
		});
		const textMaterial1 = new THREE.MeshPhongMaterial({
			color: 0x50858f,
			specular: 0xffffff
		});
		const textMesh1 = new THREE.Mesh( textGeometry1, textMaterial1 );

		textGeometry1.center();
		textGeometry1.rotateX(-Math.PI/2);
		textGeometry1.rotateZ(Math.PI);
		textGeometry1.translate(8.5/2, -0.001, 11/4);

		// add the text mesh to the meshMap
		meshMap["handleText1"] = {
			mesh: textMesh1,
			parametricTransform: radians => {
				textMesh1.rotation.x = -radians;
			}
		};

		const textGeometry2 = new THREE.TextGeometry( "Interesting.", {
			font: font,
			size: 1,
			height: 0
		});
		const textMaterial2 = new THREE.MeshPhongMaterial({
			color: 0x12b017,
			specular: 0xffffff
		});
		const textMesh2 = new THREE.Mesh( textGeometry2, textMaterial2 );

		textGeometry2.center();
		textGeometry2.rotateZ(Math.PI);
		textGeometry2.translate(8.5/2, 11/2*3/4, 0.001);

		// add the text mesh to the meshMap
		scene.add(textMesh2);
		meshMap["handleText2"] = {
			mesh: textMesh2,
			parametricTransform: radians => {} // doesn't transform
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

		var light = new THREE.AmbientLight( 0x222222 );
		scene.add( light );

		//const axesHelper = new THREE.AxesHelper( 100 );
		//scene.add( axesHelper );

		this.fold = portion => {
			for( const {mesh, parametricTransform} of Object.values(meshMap) ){
				parametricTransform(getAngle(portion));
				camera.position.set(
					-9 * Math.sin(Math.PI/2*portion*0.4) + 8.5/2,
					9 * Math.cos(Math.PI/2*portion*0.4),
					5
				);
			}
			camera.up.set(0,0,1);
			camera.lookAt(new THREE.Vector3(8.5/2,5.5/2,5.5/4));

			renderer.render( scene, camera );
		};

		this.fold(this.props.portion);
	}

	render() {
		return (
			<div className="scene" ref={this.ref} />
		);
	}
}

export default Scene;
