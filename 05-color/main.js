function init() {
	window.scene = new THREE.Scene();
	window.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);

	window.renderer = new THREE.WebGLRenderer();
	const canvas = renderer.domElement;
	document.body.appendChild(canvas);

	window.box = addBox();
	addLight();
	window.blendSign = 1;

	window.addEventListener("resize", onWindowResize);
	onWindowResize();
	renderLoop();
}

function addBox() {
	const geometry = new THREE.BoxGeometry(30, 30, 30);
	const material = new THREE.MeshPhongMaterial({
		color: 0xff0000
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.z = -100;
	mesh.rotation.y = 1;
	scene.add(mesh);
	return mesh;
}

function addLight() {
	const light = new THREE.PointLight(0xffffff, 1, 0);
	light.position.set(50, 0, 0);
	scene.add(light);
	return light;
}

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
}

function renderLoop() {
	box.rotation.y += 0.05;
	box.material.color.g += blendSign * 0.01;
	if (box.material.color.g > 1) {
		box.material.color.g = 1;
		blendSign *= -1;
	} else
	if (box.material.color.g < 0) {
		box.material.color.g = 0;
		blendSign *= -1;
	}
	renderer.render(scene, camera);
	requestAnimationFrame(renderLoop);
}

init();
