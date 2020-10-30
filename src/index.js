//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json
 

//Llamada de la librerias
const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');
 /*****************************START ADDED CODE***************/
      import { Examples, ParticleEngine } from 'js/ParticleEngine.js';
     /*****************************FINISH ADDED CODE**************/




import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//Model loaders
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//Basis Texture loader
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js';

import CameraControls from 'camera-controls';


// CameraControls.install( { THREE: THREE } );
const canvas = document.getElementById('canvas');
const clock = new THREE.Clock();
 // Optional: Pre-fetch Draco WASM/JS module.
// dracoLoader.preload();
//Scene and render
var renderer, scene, bgScene, camera, cameraControls;
var bgMesh;
var engine;
var controls;
var mixer, mixer2,mixerCap;
//Lights
var spotLight, light, hemisLight;
var spotLightHelper;
//Skybox
var materiall;
var Skybox;
var video=[];
//Interface
var gui;
var obj;
var stats;
var childd=[];
var childdd;
//DownLoader
var INTERSECTED = null;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2( Infinity, Infinity );
var group = new THREE.Object3D();
var Gltf_number=0;
var indexmodel=0;
var action;
function init() 
{
	
	//DAT GUI
	gui = new dat.gui.GUI();
	obj = {
		explode: function () {
		alert('Bang!');
		},
	
		//spotlight
		posX: -25, 
		posY: 8, 
		posZ: 7,
		colorL: "#ffffff", // RGB array
		penunmbra: 0.2,
		helpSpot:true,
		intSpot:1,
		
		intAmbien:1,
		color0: "#443333", 
		intHemis:1,
		colorg: "#111122", 
	};
	
	renderer = new THREE.WebGLRenderer({ canvas });
	scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x443333, 1, 4 );
 /*****************************START ADDED CODE***************/
       var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 5000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
     /*****************************FINISH ADDED CODE**************/
		
	
	
	//Lights
	// spotLight = new THREE.SpotLight( 0xffff00 );
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg, 1 );
	

	stats = new Stats();
}

function addLights() 
{
	
	//Hemisphere light
	scene.add( hemisLight );
	spotLight = new THREE.SpotLight();
    spotLight.angle = Math.PI / 16;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	scene.add( spotLight );
	spotLightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( spotLightHelper );
	//fireworklight
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
}


function main() {

	
	//Renderer
	renderer.setClearColor(0x222222);
	renderer.autoClearColor = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	//renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
   // renderer.shadowMap.enabled = true;
//	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild( renderer.domElement );
	//Camera
	camera.position.x = 14;
	camera.position.y = 2;
	camera.position.z = 6;
	camera.lookAt( 0, 0.1, 0 );
    controls = new OrbitControls( camera, renderer.domElement );

	addLights();




	loadFBX('model/fbx/avatar1.fbx', [2, 0, 10], [0.01, 0.01, 0.01]).then(function(obj1){
		console.log('termine!');
		mixer = new THREE.AnimationMixer( obj1 );
	var action = mixer.clipAction( obj1.animations[ 0 ] );
		action.play();

	})
	
	loadModels();
	//*/
	 /*****************************START ADDED CODE***************/
	 
	 //action.play();
	 boxes();
        var floorTexture = new THREE.TextureLoader().load( 'images/checkerboard.jpg' )
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	
	var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 30, 30 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010, map: floorTexture, side: THREE.DoubleSide} )
		);
    plane.rotation.x = - Math.PI / 2;
   

		scene.add( plane );
	
     /*****************************FINISH ADDED CODE**************/
	
	 //renderer.domElement.addEventListener( 'click', onMouseClick );
}
 /*****************************START ADDED CODE***************/

     /*****************************FINISH ADDED CODE**************/


 /*****************************START ADDED CODE***************/
     function boxes(){
		
		var geometry = new THREE.BoxBufferGeometry( 5, 5 );
		var material = new THREE.MeshLambertMaterial( { color: 0xdd3322 } );
		var box = new THREE.Mesh( geometry, material );
  box.position.set( - 10, 0, 0 );
 box.link = document.createElement('a');
box.link.download = "Amanecer.mp4";
box.link.href = "images/Amanecer.mp4";
		group.add( box );
  
		material = new THREE.MeshLambertMaterial( { color: 0x22dd33 } );
		box = new THREE.Mesh( geometry, material );
  box.position.set( 0, 0, 0 );
  box.link = document.createElement('a');
box.link.download = "checkerboard.jpg";
box.link.href = "images/checkerboard.jpg";

		group.add( box );
  
  material = new THREE.MeshLambertMaterial( { color: 0x3322dd } );
		box = new THREE.Mesh( geometry, material );
  box.position.set( 10, 0, 0 );
  box.link = document.createElement('a');
box.link.download = "fibranet.pdf";
box.link.href = "images/fibranet.pdf";
		group.add( box );
  
  scene.add( group )
  renderer.domElement.addEventListener( 'click', onMouseClick );
  renderer.domElement.addEventListener( 'mousemove', onMouseMove );
	 }
     /*****************************FINISH ADDED CODE**************/
function loadFBX(path,pos,scale) {
	const promise = new Promise(function (resolve, reject) {
		var loader = new FBXLoader();
		loader.load( path, function ( object ) {
	
			console.log(object);
			object.scale.set(scale[0], scale[1], scale[2]);
			object.position.set(pos[0], pos[1], pos[2]);
				
			object.traverse( function ( child ) {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
				//childd[Gltf_number]=child;// Downloader
			} );
			scene.add( object );
			//childd[Gltf_number]=object;// Downloader
			console.log(object);
			if (object == null) {
				reject();
			}else{
				resolve(object);
			}
	
		} );
		
	})
	

	return promise;
}

 /*****************************START ADDED CODE***************/
     



function displayWindowSize(){
	// Get width and height of the window excluding scrollbars
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	// Display result inside a div element
	// console.log("Width: " + w + ", " + "Height: " + h);
	renderer.setSize(w, h);
	// camera.fov = Math.atan(window.innerHeight / 2 / camera.position.z) * 2 * THREE.Math.RAD2DEG;
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);


function animate() 
{
	

  requestAnimationFrame(animate);
  
  raycast();
  render();
  renderer.render(scene, camera);
  controls.update();
  stats.update();
  var dt = clock.getDelta();
  
}


function render() 
{
	const delta = clock.getDelta();
	//Para la animacion
	if ( mixer ) mixer.update( delta );
	if ( mixer2 ) mixer2.update( delta );
	if ( mixerCap ) mixerCap.update( delta );
	
	
}
//------------------------------------------------------------download
function raycast() {
      
	raycaster.setFromCamera( mouse, camera );
	
  var intersects = raycaster.intersectObjects(group.children );
  
		  if ( intersects.length > 0 ) {
  
			  if ( INTERSECTED != intersects[ 0 ].object ) {
	
				  if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
	  
				  INTERSECTED = intersects[ 0 ].object;
				 // INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
				 // INTERSECTED.material.color.setHex( 0xd4d4d4 );
	  
			  }
	
		  } else {
  
			  if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
	
			  INTERSECTED = null;
	
		  }
		  //if(indexmodel==2){indexmodel=0;}
	

}
function onMouseMove( event ) {
      
	event.preventDefault();
  
		  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onMouseClick( event ) {

	if ( INTERSECTED !== null ) INTERSECTED.link.click(); 
}

	  
function loadModels() {

	const loader = new GLTFLoader();
	var dracoLoader = new DRACOLoader();
		// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
		dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
		loader.setDRACOLoader( dracoLoader );
		
	const onLoad = (gltf, position,scale,path,name) => {
		
	  const model = gltf.scene.children[0];
	  model.scale.set(scale[0], scale[1], scale[2]);
	  model.position.copy(position);
	 
	
	  model.castShadow = true;
	  model.receiveShadow = true;
	  
	  model.traverse( function ( child ) {
		  if ( child.isMesh ) {
			  child.castShadow = true;
			  child.receiveShadow = true;
			  
		  

		  }
		  //childd[Gltf_number]=child;// Downloader
	  } );

	  scene.add(model);
	  model.animations; // Array<THREE.AnimationClip>
	  model.scene; // THREE.Group
	  model.scenes; // Array<THREE.Group>
	  model.cameras; // Array<THREE.Camera>
	  model.asset; // Object
	 
	 
			
	  var link = document.createElement('a');
	  link.download = name;
	  link.href = path;
	  
  
	  function clicked( event ) {
	  
		  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			  
		raycaster.setFromCamera( mouse, camera );
	  
		  var intersects = raycaster.intersectObject(model, true);
	  
		console.log(intersects.length)
  
		if (intersects.length > 0) {
			
			var position = {
				x: controls.target.x,
				y: controls.target.y,
				z: controls.target.z
			  };
			
			console.log("position", position);
	
			var target = {
			  x: intersects[0].point.x,
			  y: intersects[0].point.y,
			  z: intersects[0].point.z
			}
	
			console.log("target", target);
			console.log("clicked");
	

		 
		  link.click();
		} else {
		
  
		  INTERSECTED = null;
		}
	  }
  
	  renderer.domElement.addEventListener('click', function(event) {
		// find intersections
  
		clicked(event);
		//camera.updateMatrixWorld();
  
  
	  });
  
	};
  
  
	const onProgress = (xhr) => {console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );};
  
  
	const onError = (errorMessage) => {
		console.log( 'An error happened' );
		reject(errorMessage);
	};
  
  
	const parrotPosition = new THREE.Vector3(0, 2, 15);
	loader.load('https://threejs.org/examples/models/gltf/Parrot.glb', gltf => onLoad(gltf, parrotPosition,[0.01, 0.01, 0.01] , "images/Lluvia.mp4","Lluvia.mp4"), onProgress, onError);
  
	const flamingoPosition = new THREE.Vector3(0, 2, 10);
	loader.load('https://threejs.org/examples/models/gltf/Flamingo.glb', gltf => onLoad(gltf, flamingoPosition,[0.01, 0.01, 0.01] ,"images/Sky.mp4","Sky.mp4"), onProgress, onError);
  
	const storkPosition = new THREE.Vector3(0, 2, 5);
	loader.load('https://threejs.org/examples/models/gltf/Stork.glb', gltf => onLoad(gltf, storkPosition,[0.01, 0.01, 0.01]  ,"images/crate.gif", "crate.gif"), onProgress, onError);
  
	
  
  
	const GLTFMAPPosition = new THREE.Vector3(10,  0.001, 10);
	loader.load('model/gltf/GLTFMATCAP/scene.gltf', gltf => onLoad(gltf, GLTFMAPPosition,[0.1, 0.1, 0.1] ,"images/fibranet.pdf","fibranet.pdf"), onProgress, onError);
  
	const miguelangeloPosition = new THREE.Vector3(-10,  0.001, 10);
	loader.load('model/gltf/miguelangelo/scene.gltf', gltf => onLoad(gltf, miguelangeloPosition,[0.1, 0.1, 0.1]  ,"images/Amanecer.mp4", "grass-512.jpg"), onProgress, onError);
  
	
	const CapoeiraPosition = new THREE.Vector3(1, 0, 10);
	loader.load('model/gltf/capoeira/Capoeira.gltf', gltf => onLoad(gltf, CapoeiraPosition,[0.01, 0.01, 0.01] , "images/Lluvia.mp4","moondust-xneg.png"), onProgress, onError);
		
  
	
  }
  
init();
main();
animate();
