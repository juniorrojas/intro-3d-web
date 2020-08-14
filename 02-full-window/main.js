function init() {
  window.scene = new THREE.Scene();
  window.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);

  window.renderer = new THREE.WebGLRenderer();
  const canvas = renderer.domElement;
  document.body.appendChild(canvas);

  addBox();

  window.addEventListener("resize", onWindowResize);
  onWindowResize();
}

function addBox() {
  const geometry = new THREE.BoxGeometry(30, 30, 30);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -100;
  mesh.rotation.y = 1;
  scene.add(mesh);
}

function onWindowResize() {
  const scene = window.scene;
  const renderer = window.renderer;
  const camera = window.camera;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}

init();
