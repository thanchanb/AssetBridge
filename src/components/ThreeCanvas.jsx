import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let animationFrameId;
    let renderer, scene, camera, group;
    const disposables = [];

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.z = 6.2;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);

      function sizeRenderer() {
        if (!host) return;
        const s = host.clientWidth || 400;
        renderer.setSize(s, s, false);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      }
      sizeRenderer();

      // Lighting Setup
      const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.7);
      scene.add(ambientLight);

      const goldLight = new THREE.PointLight(0xffb238, 3.5, 30);
      goldLight.position.set(4, 4, 4);
      scene.add(goldLight);

      const emberLight = new THREE.PointLight(0xff6b35, 3.0, 30);
      emberLight.position.set(-4, -4, 4);
      scene.add(emberLight);

      const cyanRimLight = new THREE.PointLight(0x06b6d4, 2.0, 30);
      cyanRimLight.position.set(0, -4, -4);
      scene.add(cyanRimLight);

      group = new THREE.Group();
      scene.add(group);

      // 1. Glossy Metallic TorusKnot Energy Ring
      const knotGeo = new THREE.TorusKnotGeometry(1.65, 0.1, 128, 32, 2, 3);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0xffb238,
        roughness: 0.15,
        metalness: 0.85,
        wireframe: false,
        emissive: 0x3d1f05,
        emissiveIntensity: 0.2
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      group.add(knotMesh);
      disposables.push(knotGeo, knotMat);

      // 2. Outer Holographic Wireframe Geodesic Shell
      const shellGeo = new THREE.IcosahedronGeometry(2.35, 2);
      const shellMat = new THREE.MeshBasicMaterial({
        color: 0xffb238,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      group.add(shellMesh);
      disposables.push(shellGeo, shellMat);

      // 3. Molten Ember ZK Core Sphere
      const coreGeo = new THREE.SphereGeometry(0.75, 32, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        roughness: 0.2,
        metalness: 0.5,
        emissive: 0xff4500,
        emissiveIntensity: 0.6
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);
      disposables.push(coreGeo, coreMat);

      // 4. Core Outer Glow Aura
      const glowGeo = new THREE.SphereGeometry(1.05, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xffb238,
        transparent: true,
        opacity: 0.18
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      group.add(glowMesh);
      disposables.push(glowGeo, glowMat);

      // 5. Swirling Spiral Galaxy Particle Vortex
      const particleCount = 450;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const palette = [
        [1.0, 0.70, 0.22],  // gold
        [1.0, 0.42, 0.21],  // ember
        [0.98, 0.88, 0.65], // pale warm
        [0.02, 0.71, 0.83]  // cyan accent
      ];

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.4 + Math.random() * 1.8;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 2.2;

        positions[i * 3] = radius * Math.cos(angle);
        positions[i * 3 + 1] = height;
        positions[i * 3 + 2] = radius * Math.sin(angle);

        const pick = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = pick[0];
        colors[i * 3 + 1] = pick[1];
        colors[i * 3 + 2] = pick[2];
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);
      disposables.push(particleGeo, particleMat);

      let pmx = 0, pmy = 0, ptx = 0, pty = 0;
      const handleMouseMove = (e) => {
        const r = host.getBoundingClientRect();
        ptx = ((e.clientX - r.left) / r.width - 0.5);
        pty = ((e.clientY - r.top) / r.height - 0.5);
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('resize', sizeRenderer);

      const animate = (t) => {
        animationFrameId = requestAnimationFrame(animate);

        // Counter-rotations for realistic multi-layered depth
        knotMesh.rotation.x += 0.005;
        knotMesh.rotation.y += 0.008;

        shellMesh.rotation.y -= 0.003;
        shellMesh.rotation.z += 0.002;

        particleSystem.rotation.y -= 0.002;

        // Core pulse wave
        const pulse = 1 + Math.sin(t * 0.002) * 0.07;
        coreMesh.scale.setScalar(pulse);
        glowMesh.scale.setScalar(pulse * 1.05);

        // Smooth mouse responsiveness
        pmx += (ptx - pmx) * 0.05;
        pmy += (pty - pmy) * 0.05;
        group.rotation.y += pmx * 0.015;
        group.rotation.x = pmy * 0.015;

        camera.position.x += (pmx * 0.8 - camera.position.x) * 0.04;
        camera.position.y += (-pmy * 0.6 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

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
      console.warn('3D hero visual failed to init:', err);
    }
  }, []);

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

export default ThreeCanvas;
