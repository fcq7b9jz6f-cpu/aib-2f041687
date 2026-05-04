import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.getElementById('webgl-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xa47e5f, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Particles
const particleCount = 7000;
const positions = new Float32Array(particleCount * 3);
const particleGeometry = new THREE.BufferGeometry();
const particleMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: new THREE.Color('#a47e5f'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.7
});

const radius = 3;
for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = THREE.MathUtils.randFloatSpread(360);
    
    positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
    positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i3 + 2] = radius * Math.cos(phi);
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

// Mouse tracking
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

function onMouseMove(event) {
    target.x = (event.clientX - windowHalf.x) * 0.001;
    target.y = (event.clientY - windowHalf.y) * 0.001;
}
document.addEventListener('mousemove', onMouseMove);

// Animation loop
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update mouse effect
    mouse.x += (target.x - mouse.x) * 0.05;
    mouse.y += (target.y - mouse.y) * 0.05;

    // Animate particles
    particleSystem.rotation.y = elapsedTime * 0.05;
    particleSystem.rotation.x = mouse.y * 0.5;
    particleSystem.rotation.y += mouse.x * 0.5;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();

// Resize handler
window.addEventListener('resize', () => {
    windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});