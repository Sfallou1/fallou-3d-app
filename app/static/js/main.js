const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setSize(window.innerWidth, window.innerHeight);

const torus = new THREE.Mesh(new THREE.TorusGeometry(1, 0.3, 16, 100), new THREE.MeshStandardMaterial({ color: 0xff6b6b, wireframe: true }));
scene.add(torus);

const starsGeometry = new THREE.BufferGeometry();
const starsPositions = new Float32Array(3000 * 3);
for (let i = 0; i < 3000 * 3; i += 3) {
    starsPositions[i] = (Math.random() - 0.5) * 100;
    starsPositions[i+1] = (Math.random() - 0.5) * 100;
    starsPositions[i+2] = (Math.random() - 0.5) * 100;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
const stars = new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 }));
scene.add(stars);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    stars.rotation.y += 0.0002;
    camera.position.x = Math.sin(Date.now() * 0.0005) * 5;
    camera.lookAt(0, 1, 0);
    renderer.render(scene, camera);
}
animate();
