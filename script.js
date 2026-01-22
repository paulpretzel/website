import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

// 1. SETUP SCENE
const scene = new THREE.Scene();
// Optional: Add fog to fade objects into the black background
scene.fog = new THREE.FogExp2(0x000000, 0.05);

// 2. CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. RENDERER
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 4. LIGHTING (Neon Green & Cyan lights)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ff41, 2); // Matrix Green Light
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const rimLight = new THREE.PointLight(0x00ffff, 2); // Cyan Rim Light
rimLight.position.set(-5, 5, -5);
scene.add(rimLight);

// 5. OBJECTS
// Using an Icosahedron (20-sided die shape) for a tech feel
const geometry = new THREE.IcosahedronGeometry(1.8, 0);

// WIREFRAME MATERIAL (The Matrix Grid Look)
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff41, // Neon Green
    wireframe: true 
});

const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// 6. ANIMATION LOOP
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate
    shape.rotation.y = elapsedTime * 0.3;
    shape.rotation.x = elapsedTime * 0.1;
    
    // Pulse effect (Breathing size)
    const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
    shape.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
}
animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
