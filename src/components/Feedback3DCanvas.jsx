import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Feedback3DCanvas = ({ rating = 5 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let animationFrameId;
    let renderer, scene, camera, group, crystalGeo, crystalMat, innerCoreGeo, innerCoreMat, ringGeo, ringMat, particles, particleGeo, particleMat;

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

      group = new THREE.Group();
      scene.add(group);

      // Outer 3D ZK Crystal Dodecahedron Wireframe
      crystalGeo = new THREE.DodecahedronGeometry(1.6, 0);
      crystalMat = new THREE.MeshBasicMaterial({
        color: 0xffb238,
        wireframe: true,
        transparent: true,
        opacity: 0.65
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      group.add(crystalMesh);

      // Inner Glowing Core (Tetrahedron)
      innerCoreGeo = new THREE.OctahedronGeometry(0.8, 1);
      innerCoreMat = new THREE.MeshBasicMaterial({
        color: 0xff6b35,
        transparent: true,
        opacity: 0.75
      });
      const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      group.add(innerCoreMesh);

      // Orbiting ZK Energy Ring
      ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
      ringMat = new THREE.MeshBasicMaterial({
        color: 0xffb238,
        transparent: true,
        opacity: 0.4
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      group.add(ringMesh);

      // Orbiting ZK Data Stream Particles
      const particleCount = 120;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const gold = [1.0, 0.7, 0.22];
      const ember = [1.0, 0.42, 0.21];

      for (let i = 0; i < particleCount; i++) {
        const r = 2.0 + Math.random() * 1.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        const pick = Math.random() > 0.4 ? gold : ember;
        colors[i * 3] = pick[0];
        colors[i * 3 + 1] = pick[1];
        colors[i * 3 + 2] = pick[2];
      }

      particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      particleMat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });
      particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

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

        // Dynamic rotation speeds based on user rating
        const ratingSpeedMultiplier = 0.8 + (rating / 5) * 0.5;

        group.rotation.y += 0.005 * ratingSpeedMultiplier;
        group.rotation.x = Math.sin(t * 0.0005) * 0.2 + targetY;
        group.rotation.y += targetX * 0.1;

        innerCoreMesh.rotation.y -= 0.01;
        ringMesh.rotation.z += 0.003;
        particles.rotation.y -= 0.0015;

        const pulseScale = 1 + Math.sin(t * 0.002) * 0.08 * (rating / 5);
        innerCoreMesh.scale.setScalar(pulseScale);

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
        crystalGeo?.dispose();
        crystalMat?.dispose();
        innerCoreGeo?.dispose();
        innerCoreMat?.dispose();
        ringGeo?.dispose();
        ringMat?.dispose();
        particleGeo?.dispose();
        particleMat?.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('3D feedback crystal failed to init:', err);
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
