/*grid, particles, rings*/
   function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x020408, 0.0012);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 35);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- NEON GRID FLOOR ---
    const gridExtent = 160;
    const gridDivisions = 70;
    const gridColor2 = new THREE.Color(0x081428);
    const gridHelper = new THREE.GridHelper(gridExtent, gridDivisions, gridColor2, gridColor2);
    gridHelper.position.set(0, -10, 0);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
    scene.add(gridHelper);

    // --- PARTICLES ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 220;
        posArray[i + 1] = (Math.random() - 0.5) * 120;
        posArray[i + 2] = (Math.random() - 0.5) * 100 - 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00d4ff, size: 0.14, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // --- RINGS & CORE ---
    const torusGeometry = new THREE.TorusGeometry(3.5, 0.06, 32, 120);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.18 });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    const torus2Geometry = new THREE.TorusGeometry(5.5, 0.04, 32, 160);
    const torus2Material = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.12 });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    scene.add(torus2);

    const sphereGeometry = new THREE.SphereGeometry(1.8, 24, 24);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.07, wireframe: true });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // --- MOUSE PARALLAX ---
    let targetX = 0, targetY = 0, mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
    });

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        if (document.hidden) return;
        time += 0.004;

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        particlesMesh.rotation.y = time * 0.04;
        particlesMesh.rotation.x = time * 0.015;
        torus.rotation.x = time * 0.25;
        torus.rotation.y = time * 0.4;
        torus2.rotation.x = time * 0.15;
        torus2.rotation.z = time * 0.35;
        sphere.rotation.y = time * 0.2;

        gridHelper.position.z = (time * 12) % (gridExtent / gridDivisions);
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY + 5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}