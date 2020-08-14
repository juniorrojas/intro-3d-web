function init() {
  const width = 500;
  const height = 400;

  window.scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  addBox();

  renderer.render(scene, camera);
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

init();
