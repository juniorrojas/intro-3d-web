var scene;
var camera;
var renderer;
var light;
var objects;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);

	renderer = new THREE.WebGLRenderer();
	var canvas = renderer.domElement;
	document.body.appendChild(canvas);

	objects = [];
	for (var i = 0; i < 100; i++) {
		addObject();
	}

	light = addLight();

	window.addEventListener("resize", window_onResize);
	window_onResize();
	renderLoop();
}

function addObject() {
	var geometry;
	var r = Math.random();
	if (r < 1 / 3) geometry = new THREE.BoxGeometry(
		5 + Math.random() * 20,
		30,
		5 + Math.random() * 20
	);
	else geometry = new THREE.SphereGeometry(5 + Math.random() * 20, 32, 32);

	var material = new THREE.MeshPhongMaterial({
		color: 0xff0000
	});
	var mesh = new THREE.Mesh(geometry, material);
	resetConfig(mesh);
	scene.add(mesh);
	objects.push(mesh);
	return mesh;
}

function resetConfig(mesh) {
	mesh.position.y = -300;
	mesh.rotationSpeed = 0.001 + Math.random() * Math.PI / 10;
	mesh.orbitT = Math.random() * 2 * Math.PI;
	mesh.orbitRadius = 10 + Math.random() * 300;
	mesh.orbitSpeed = 0.01 + Math.random() * Math.PI / 30;
	mesh.verticalSpeed = 1 + Math.random() * 5;
	mesh.material.color.setRGB(Math.random(), Math.random(), Math.random());
	mesh.blendSpeed = 0.1;
	mesh.blendSign = 1;
	var r = Math.random();
	if (r < 1 / 3) mesh.blendChannel = "r";
	else if (r < 2 / 3) mesh.blendChannel = "g";
	else mesh.blendChannel = "b";
}

function addLight() {
	var light = new THREE.PointLight(0xffffff, 1, 0);
	light.position.set(50, 0, 0);
	scene.add(light);
	return light;
}

function window_onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
}

function renderLoop() {
	for (var i = 0; i < objects.length; i++) {
		var object = objects[i];

		object.rotation.y += object.rotationSpeed;
		object.orbitT += object.orbitSpeed;

		object.position.y += object.verticalSpeed;
		object.position.x = Math.cos(object.orbitT) * object.orbitRadius;
		object.position.z = -500 + Math.sin(object.orbitT) * object.orbitRadius;

		var blendChannel = object.blendChannel;
		object.material.color[blendChannel] += object.blendSign * object.blendSpeed;
		if (object.material.color[blendChannel] > 1) {
			object.material.color[blendChannel] = 1;
			object.blendSign *= -1;
		} else
		if (object.material.color[blendChannel] < 0) {
			object.material.color[blendChannel] = 0;
			object.blendSign *= -1;
		}

		if (object.position.y > 300) {
			resetConfig(object);
		}
	}

	renderer.render(scene, camera);
	requestAnimationFrame(renderLoop);
}

init();