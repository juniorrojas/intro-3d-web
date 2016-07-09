var scene;
var camera;
var renderer;
var box;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);

	renderer = new THREE.WebGLRenderer();
	var canvas = renderer.domElement;
	document.body.appendChild(canvas);

	box = addBox();

	window.addEventListener("resize", window_onResize);
	window_onResize();
	renderLoop();
}

function addBox() {
	var geometry = new THREE.BoxGeometry(30, 30, 30);
	var material = new THREE.MeshBasicMaterial({
		color: 0xff0000,
		wireframe: true
	});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.z = -100;
	mesh.rotation.y = 1;
	scene.add(mesh);
	return mesh;
}

function window_onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
}

function renderLoop() {
	box.rotation.y += 0.05;
	renderer.render(scene, camera);
	requestAnimationFrame(renderLoop);
}

init();
