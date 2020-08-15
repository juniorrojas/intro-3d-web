function init() {
  const scene = window.scene = new THREE.Scene();
  scene.background = new THREE.Color(0x31403b);
  window.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);

  window.renderer = new THREE.WebGLRenderer();
  const canvas = renderer.domElement;
  document.body.appendChild(canvas);

  window.rgb0 = [0.47, 0.74, 0.01];
  window.rgb1 = [0.64, 0.85, 0.51];
  window.objects = [];
  for (let i = 0; i < 100; i++) {
    addObject();
  }

  addPointLight();
  addAmbientLight();

  window.addEventListener("resize", onWindowResize);
  onWindowResize();
  renderLoop();
}

function addObject() {
  const scene = window.scene;
  const objects = window.objects;

  let geometry;
  const r = Math.random();
  if (r < 1 / 3) {
    geometry = new THREE.BoxGeometry(
      5 + Math.random() * 20,
      30,
      5 + Math.random() * 20
    );
  } else {
    geometry = new THREE.SphereGeometry(5 + Math.random() * 20, 32, 32);
  }

  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000
  });
  const mesh = new THREE.Mesh(geometry, material);
  resetMesh(mesh);
  scene.add(mesh);
  objects.push(mesh);
  return mesh;
}

function resetMesh(mesh) {
  mesh.position.y = -300;
  mesh.rotationSpeed = 0.001 + Math.random() * Math.PI / 10;
  mesh.orbitT = Math.random() * 2 * Math.PI;
  mesh.orbitRadius = 10 + Math.random() * 300;
  mesh.orbitSpeed = 0.01 + Math.random() * Math.PI / 30;
  mesh.verticalSpeed = 1 + Math.random() * 5;
  
  const rgb0 = window.rgb0;
  const rgb1 = window.rgb1;
  mesh.material.color.setRGB(
    rgb0[0] + (rgb1[0] - rgb0[0]) * Math.random(),
    rgb0[1] + (rgb1[1] - rgb0[1]) * Math.random(),
    rgb0[2] + (rgb1[2] - rgb0[2]) * Math.random()
  );
}

function addPointLight() {
  const scene = window.scene;
  const light = new THREE.PointLight(0xffffff, 0.5, 0);
  light.position.set(50, 0, 0);
  scene.add(light);
  return light;
}

function addAmbientLight() {
  const light = new THREE.AmbientLight(0xaaaaaa);
  scene.add(light);
  return light;
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

function renderLoop() {
  const scene = window.scene;
  const renderer = window.renderer;
  const camera = window.camera;
  const objects = window.objects;

  objects.forEach((object) => {
    object.rotation.y += object.rotationSpeed;
    object.orbitT += object.orbitSpeed;

    object.position.y += object.verticalSpeed;
    object.position.x = Math.cos(object.orbitT) * object.orbitRadius;
    object.position.z = -500 + Math.sin(object.orbitT) * object.orbitRadius;

    if (object.position.y > 400) {
      resetMesh(object);
    }
  });

  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}

init();
