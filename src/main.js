import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import { World } from './world';

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0c0);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-32, 16, -32);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();

const scene = new THREE.Scene();

const world = new World();
world.generate();
scene.add(world);

function setupLights () {
  const light1 = new THREE.DirectionalLight();
  light1.position.set(1, 1, 1);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight();
  light1.position.set(-1, 1, -0.5);
  scene.add(light2);

  const light3 = new THREE.AmbientLight();
  light1.intensity = 0.1;
  scene.add(light3);
}

function animate () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

setupLights();
animate();