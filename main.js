import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// New Scene (Imagine a movie set)
const scene = new THREE.Scene();

/* 
  Create Globe
  3 is the radius of the globe 
  64 and 64 are segments, width and height
*/
const geometry = new THREE.SphereGeometry(3, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});

/* 
  Mesh is the combination 
  of geometry and material 
  The scene adds the mesh
*/
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Size for screen
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/*
  Add lights to see the globe
*/
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

/* 
  Add Camera
  It is basically what we see
  First parameter: FOV (Field of view)
  Second parameter: Aspect-ratio 
  Camera position is how close the item is to the camera,
  i.e if it is 30, the globe will be closer to camera
*/
const camera = new THREE.PerspectiveCamera(45, size.width / size.height);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  // Update camera
  camera.updateProjectionMatrix();
  camera.aspect = size.width / size.height;
  renderer.setSize(size.width, size.height);
});

// Control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
control.enableDamping = false;
control.enableZoom = false;
control.autoRotate = true;
control.autoRotateSpeed = 5;

const loop = () => {
  control.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// Timeline
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// Mouse animation color
let mouseDown = false;
let rgb = [12, 23, 55];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseup = false));

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / size.height) * 255),
      Math.round((e.pageY / size.height) * 255),
      150,
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, { 
      r: newColor.r,
      g: newColor.g,
      b: newColor.b
    })
  }
});