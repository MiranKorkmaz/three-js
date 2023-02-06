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

/* 
  Add Camera
  It is basically what we see
  First parameter: FOV (Field of view)
  Second parameter: Aspect-ratio 
*/
const camera = new THREE.PerspectiveCamera(45, 800, 600);
scene.add(camera);
