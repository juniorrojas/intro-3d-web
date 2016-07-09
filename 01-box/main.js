var scene;
var camera;
var renderer;
var box;

function init() {
	var width = 500;
	var height = 400;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	box = addBox();

	renderer.render(scene, camera);
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

init();
