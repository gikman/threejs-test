import * as THREE from "https://cdn.jsdelivr.net/npm/three@v0.108.0/build/three.module.js";
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@v0.108.0/examples/jsm/controls/OrbitControls.js";
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@v0.108.0/examples/jsm/libs/dat.gui.module.js';
		
const renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.appendChild(renderer.domElement);
		
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 2, 1, 10000 );
camera.position.set(20, 20, 20);
		
const controls = new OrbitControls(camera);
			
scene.add(new THREE.AmbientLight(0x999999));
			
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 20, 0);
scene.add(light);
			
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( {
	color: 0x156289,
	emissive: 0x072534,
	flatShading: true,
	vertexColors: true,
	shininess: 0
} );

const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, transparent: true } );

let cube = new THREE.Mesh( geometry, material );
let wireframe = new THREE.Mesh( geometry, wireframeMaterial );
cube.add( wireframe );
scene.add( cube );
	
function resizeRendererToDisplaySize(renderer) {
const canvas = renderer.domElement;
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const needResize = canvas.width !== width || canvas.height !== height;
if (needResize) {
	renderer.setSize(width, height, false);
}
return needResize;
}

var guiControls = new function() {
	this.scaleX = 1;
	this.scaleY = 1;
	this.scaleZ = 1;
}
		
var gui = new GUI();
gui.add(guiControls, 'scaleX', 1, 10);
gui.add(guiControls, 'scaleY', 1, 10);
gui.add(guiControls, 'scaleZ', 1, 10);
		
function render() {
	if (resizeRendererToDisplaySize(renderer)) {
	const canvas = renderer.domElement;
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
}
		  
	cube.scale.x = guiControls.scaleX;
	cube.scale.y = guiControls.scaleY;
	cube.scale.z = guiControls.scaleZ;
		
	renderer.render( scene, camera );
	requestAnimationFrame(render);
}
requestAnimationFrame(render);
