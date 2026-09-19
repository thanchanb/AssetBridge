import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Feedback3DCanvas = ({ rating = 5 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let animationFrameId;
    let renderer, scene, camera, group;
    const disposables = [];

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 5.5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);

      function sizeRenderer() {
        if (!host) return;
        const width = host.clientWidth || 240;
        const height = host.clientHeight || 240;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      sizeRenderer();

      // Dynamic Shading Lights
      const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambLight);

      const goldLight = new THREE.PointLight(0xffb238, 3.0, 30);
      goldLight.position.set(3, 3, 3);
      scene.add(goldLight);

      const emberLight = new THREE.PointLight(0xff6b35, 2.5, 30);
      emberLight.position.set(-3, -3, 3);
      scene.add(emberLight);

      group = new THREE.Group();
      scene.add(group);

      // 1. Glossy Metallic TorusKnot ZK Gem
      const gemGeo = new THREE.TorusKnotGeometry(1.25, 0.15, 100, 24, 2, 3);
      const gemMat = new THREE.MeshStandardMaterial({
        color: 0xffb238,
        roughness: 0.15,
        metalness: 0.85,
        emissive: 0x4a2505,
        emissiveIntensity: 0.3
      });
      const gemMesh = new THREE.Mesh(gemGeo, gemMat);
      group.add(gemMesh);
      disposables.push(gemGeo, gemMat);

      // 2. Inner Glowing Octahedron Core
      const coreGeo = new THREE.OctahedronGeometry(0.7, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        emissive: 0xff4500,
        emissiveIntensity: 0.7
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);
      disposables.push(coreGeo, coreMat);

      // 3. Orbiting ZK Ring
      const ringGeo = new THREE.TorusGeometry(2.1, 0.025, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xffb238, transparent: true, opacity: 0.45 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      group.add(ringMesh);
      disposables.push(ringGeo, ringMat);

      // 4. Stardust Particles
      const particleCount = 160;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const gold = [1.0, 0.7, 0.22];
      const ember = [1.0, 0.42, 0.21];

      for (let i = 0; i < particleCount; i++) {
        const r = 2.0 + Math.random() * 1.3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        const pick = Math.random() > 0.35 ? gold : ember;
        colors[i * 3] = pick[0];
        colors[i * 3 + 1] = pick[1];
        colors[i * 3 + 2] = pick[2];
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);
      disposables.push(particleGeo, particleMat);

      let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
      const handleMouseMove = (e) => {
        const rect = host.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('resize', sizeRenderer);

      const animate = (t) => {
        animationFrameId = requestAnimationFrame(animate);

        targetX += (mouseX - targetX) * 0.06;
        targetY += (mouseY - targetY) * 0.06;

        const ratingSpeedMultiplier = 0.8 + (rating / 5) * 0.5;

        gemMesh.rotation.x += 0.005 * ratingSpeedMultiplier;
        gemMesh.rotation.y += 0.008 * ratingSpeedMultiplier;

        group.rotation.x = Math.sin(t * 0.0005) * 0.15 + targetY;
        group.rotation.y += targetX * 0.1;

        coreMesh.rotation.y -= 0.01;
        ringMesh.rotation.z += 0.004;
        particles.rotation.y -= 0.002;

        const pulseScale = 1 + Math.sin(t * 0.002) * 0.08 * (rating / 5);
        coreMesh.scale.setScalar(pulseScale);

        renderer.render(scene, camera);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', sizeRenderer);
        if (host && renderer.domElement && host.contains(renderer.domElement)) {
          host.removeChild(renderer.domElement);
        }
        disposables.forEach(d => d?.dispose());
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('3D feedback canvas failed to init:', err);
    }
  }, [rating]);

  return (
    <div 
      ref={mountRef} 
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    />
  );
};

export default Feedback3DCanvas;
