function init() {
  const width = 500;
  const height = 400;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

init();
