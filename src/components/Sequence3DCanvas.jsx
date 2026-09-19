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

      // Ambient + Directional Lights for realistic specular depth
      const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambLight);

      const light1 = new THREE.PointLight(0xffb238, 2.5, 30);
      light1.position.set(3, 3, 3);
      scene.add(light1);

      const light2 = new THREE.PointLight(0xff6b35, 2.0, 30);
      light2.position.set(-3, -3, 3);
      scene.add(light2);

      group = new THREE.Group();
      scene.add(group);

      let meshA, meshB, meshC, particles;

      if (step === 1) {
        // Step 1: Public Vault — Metallic Golden TorusKnot & Glowing Core
        const knotGeo = new THREE.TorusKnotGeometry(1.1, 0.08, 96, 16, 2, 3);
        const knotMat = new THREE.MeshStandardMaterial({
          color: 0xffb238,
          roughness: 0.2,
          metalness: 0.8,
          emissive: 0x3a1e05,
          emissiveIntensity: 0.3
        });
        meshA = new THREE.Mesh(knotGeo, knotMat);
        group.add(meshA);
        disposables.push(knotGeo, knotMat);

        const innerGeo = new THREE.SphereGeometry(0.55, 32, 32);
        const innerMat = new THREE.MeshStandardMaterial({
          color: 0xc9a15a,
          emissive: 0xffb238,
          emissiveIntensity: 0.5
        });
        meshB = new THREE.Mesh(innerGeo, innerMat);
        group.add(meshB);
        disposables.push(innerGeo, innerMat);

        const ringGeo = new THREE.TorusGeometry(1.65, 0.02, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffb238, transparent: true, opacity: 0.5 });
        meshC = new THREE.Mesh(ringGeo, ringMat);
        meshC.rotation.x = Math.PI / 3;
        group.add(meshC);
        disposables.push(ringGeo, ringMat);
      } else if (step === 2) {
        // Step 2: Prove Privately — Interlocking Dual ZK Witness Torus Knots
        const outerGeo = new THREE.TorusKnotGeometry(1.2, 0.06, 96, 16, 3, 4);
        const outerMat = new THREE.MeshStandardMaterial({
          color: 0xffb238,
          wireframe: true,
          roughness: 0.1,
          metalness: 0.9
        });
        meshA = new THREE.Mesh(outerGeo, outerMat);
        group.add(meshA);
        disposables.push(outerGeo, outerMat);

        const innerGeo = new THREE.TorusKnotGeometry(0.85, 0.05, 96, 16, 2, 5);
        const innerMat = new THREE.MeshStandardMaterial({
          color: 0xff6b35,
          wireframe: true,
          roughness: 0.1,
          metalness: 0.9
        });
        meshB = new THREE.Mesh(innerGeo, innerMat);
        meshB.rotation.z = Math.PI / 2;
        group.add(meshB);
        disposables.push(innerGeo, innerMat);

        // Particle stream
        const pCount = 100;
        const pPositions = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          const r = 1.4 + Math.random() * 0.9;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pPositions[i * 3 + 2] = r * Math.cos(phi);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.045, color: 0xffb238, transparent: true, opacity: 0.8 });
        particles = new THREE.Points(pGeo, pMat);
        group.add(particles);
        disposables.push(pGeo, pMat);
      } else {
        // Step 3: Shielded ZK Asset — Emerald-Ember Core & 3 Intersecting Forcefield Rings
        const coreGeo = new THREE.IcosahedronGeometry(0.75, 1);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0x7be08a,
          roughness: 0.2,
          metalness: 0.6,
          emissive: 0x22c55e,
          emissiveIntensity: 0.6
        });
        meshA = new THREE.Mesh(coreGeo, coreMat);
        group.add(meshA);
        disposables.push(coreGeo, coreMat);

        const r1Geo = new THREE.TorusGeometry(1.4, 0.025, 16, 64);
        const r1Mat = new THREE.MeshBasicMaterial({ color: 0x7be08a, transparent: true, opacity: 0.65 });
        meshB = new THREE.Mesh(r1Geo, r1Mat);
        meshB.rotation.x = Math.PI / 4;
        group.add(meshB);
        disposables.push(r1Geo, r1Mat);

        const r2Geo = new THREE.TorusGeometry(1.45, 0.025, 16, 64);
        const r2Mat = new THREE.MeshBasicMaterial({ color: 0xffb238, transparent: true, opacity: 0.5 });
        meshC = new THREE.Mesh(r2Geo, r2Mat);
        meshC.rotation.y = Math.PI / 3;
        group.add(meshC);
        disposables.push(r2Geo, r2Mat);
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

        group.rotation.y += 0.007;
        group.rotation.x = Math.sin(t * 0.0006) * 0.15 + mouseY;
        group.rotation.y += mouseX * 0.05;

        if (step === 1) {
          meshA.rotation.x += 0.006;
          meshA.rotation.y += 0.008;
          meshB.scale.setScalar(1 + Math.sin(t * 0.002) * 0.08);
          meshC.rotation.z -= 0.005;
        } else if (step === 2) {
          meshA.rotation.x += 0.005;
          meshA.rotation.y += 0.007;
          meshB.rotation.y -= 0.01;
          meshB.rotation.z += 0.006;
          if (particles) particles.rotation.y += 0.002;
        } else if (step === 3) {
          meshA.rotation.y += 0.008;
          meshA.scale.setScalar(1 + Math.sin(t * 0.0025) * 0.07);
          meshB.rotation.z += 0.008;
          meshC.rotation.x += 0.006;
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
