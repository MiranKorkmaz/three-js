import * as THREE from "three";

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
  height: window.innerHeight
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
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);