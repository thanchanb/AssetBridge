import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Sequence3DCanvas = ({ step = 1 }) => {
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
      camera.position.z = 5.2;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);

      function sizeRenderer() {
        if (!host) return;
        const w = host.clientWidth || 180;
        const h = host.clientHeight || 180;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      sizeRenderer();

      group = new THREE.Group();
      scene.add(group);

      let meshA, meshB, meshC, particles;

      if (step === 1) {
        // Step 1: Public Vault 3D Cube & Orbit Ring
        const cubeGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        const cubeMat = new THREE.MeshBasicMaterial({ color: 0xc9a15a, wireframe: true, transparent: true, opacity: 0.65 });
        meshA = new THREE.Mesh(cubeGeo, cubeMat);
        group.add(meshA);
        disposables.push(cubeGeo, cubeMat);

        const innerGeo = new THREE.SphereGeometry(0.55, 16, 16);
        const innerMat = new THREE.MeshBasicMaterial({ color: 0xffb238 });
        meshB = new THREE.Mesh(innerGeo, innerMat);
        group.add(meshB);
        disposables.push(innerGeo, innerMat);

        const ringGeo = new THREE.TorusGeometry(1.5, 0.025, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffb238, transparent: true, opacity: 0.5 });
        meshC = new THREE.Mesh(ringGeo, ringMat);
        meshC.rotation.x = Math.PI / 3;
        group.add(meshC);
        disposables.push(ringGeo, ringMat);
      } else if (step === 2) {
        // Step 2: ZK-SNARK Witness Hypercube Matrix (Nested Polyhedra)
        const outerGeo = new THREE.IcosahedronGeometry(1.4, 0);
        const outerMat = new THREE.MeshBasicMaterial({ color: 0xffb238, wireframe: true, transparent: true, opacity: 0.7 });
        meshA = new THREE.Mesh(outerGeo, outerMat);
        group.add(meshA);
        disposables.push(outerGeo, outerMat);

        const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
        const innerMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, wireframe: true, transparent: true, opacity: 0.85 });
        meshB = new THREE.Mesh(innerGeo, innerMat);
        group.add(meshB);
        disposables.push(innerGeo, innerMat);

        // Particle cloud
        const pCount = 80;
        const pPositions = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          const r = 1.6 + Math.random() * 0.8;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pPositions[i * 3 + 2] = r * Math.cos(phi);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffb238, transparent: true, opacity: 0.75 });
        particles = new THREE.Points(pGeo, pMat);
        group.add(particles);
        disposables.push(pGeo, pMat);
      } else {
        // Step 3: Shielded ZK Commitment Orb & Protective Dual Forcefield
        const coreGeo = new THREE.SphereGeometry(0.7, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x7be08a });
        meshA = new THREE.Mesh(coreGeo, coreMat);
        group.add(meshA);
        disposables.push(coreGeo, coreMat);

        const shieldGeo1 = new THREE.TorusGeometry(1.45, 0.03, 16, 64);
        const shieldMat1 = new THREE.MeshBasicMaterial({ color: 0x7be08a, transparent: true, opacity: 0.6 });
        meshB = new THREE.Mesh(shieldGeo1, shieldMat1);
        meshB.rotation.x = Math.PI / 4;
        group.add(meshB);
        disposables.push(shieldGeo1, shieldMat1);

        const shieldGeo2 = new THREE.TorusGeometry(1.5, 0.03, 16, 64);
        const shieldMat2 = new THREE.MeshBasicMaterial({ color: 0xffb238, transparent: true, opacity: 0.45 });
        meshC = new THREE.Mesh(shieldGeo2, shieldMat2);
        meshC.rotation.y = Math.PI / 3;
        group.add(meshC);
        disposables.push(shieldGeo2, shieldMat2);
      }

      let mouseX = 0, mouseY = 0;
      const handleMouseMove = (e) => {
        const r = host.getBoundingClientRect();
        mouseX = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
        mouseY = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('resize', sizeRenderer);

      const animate = (t) => {
        animationFrameId = requestAnimationFrame(animate);

        group.rotation.y += 0.006;
        group.rotation.x = Math.sin(t * 0.0006) * 0.15 + mouseY;
        group.rotation.y += mouseX * 0.05;

        if (step === 1) {
          meshA.rotation.z += 0.003;
          meshB.scale.setScalar(1 + Math.sin(t * 0.002) * 0.08);
          meshC.rotation.z -= 0.005;
        } else if (step === 2) {
          meshA.rotation.y += 0.004;
          meshB.rotation.y -= 0.008;
          meshB.rotation.z += 0.004;
          if (particles) particles.rotation.y += 0.002;
        } else if (step === 3) {
          meshA.scale.setScalar(1 + Math.sin(t * 0.002) * 0.06);
          meshB.rotation.z += 0.006;
          meshC.rotation.x += 0.004;
        }

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
      console.warn(`3D Sequence canvas step ${step} failed to init:`, err);
    }
  }, [step]);

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

export default Sequence3DCanvas;
