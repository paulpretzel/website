import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

// 1. SETUP THE SCENE
const scene = new THREE.Scene();

// 2. CAMERA (The user's eye)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. RENDERER (Draws the scene to the canvas)
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Allows CSS background to show through
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 4. LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x66fcf1, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 5. OBJECTS (This is where your robot will go)
// For now, a "Placeholder" wireframe geometry
const geometry = new THREE.IcosahedronGeometry(1.5, 0);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x66fcf1, 
    wireframe: true 
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// 6. RESPONSIVENESS (Resize handling)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7. ANIMATION LOOP
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotate the shape
    shape.rotation.y = elapsedTime * 0.5;
    shape.rotation.x = elapsedTime * 0.2;

    renderer.render(scene, camera);
}

animate();
