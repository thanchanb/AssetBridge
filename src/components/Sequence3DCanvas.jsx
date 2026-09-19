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
      camera.position.z = 4.8;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      host.appendChild(renderer.domElement);

      function sizeRenderer() {
        if (!host) return;
        const w = host.clientWidth || 240;
        const h = host.clientHeight || 220;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      sizeRenderer();

      const resizeObserver = new ResizeObserver(() => {
        sizeRenderer();
      });
      resizeObserver.observe(host);

      // Multi-Light Shading Setup
      const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambLight);

      const light1 = new THREE.PointLight(0xffb238, 4.0, 30);
      light1.position.set(4, 4, 4);
      scene.add(light1);

      const light2 = new THREE.PointLight(0xff6b35, 3.5, 30);
      light2.position.set(-4, -4, 4);
      scene.add(light2);

      const cyanLight = new THREE.PointLight(0x06b6d4, 2.5, 30);
      cyanLight.position.set(0, -4, -4);
      scene.add(cyanLight);

      group = new THREE.Group();
      scene.add(group);

      let meshA, meshB, meshC, particles;

      if (step === 1) {
        // Step 1: Public Vault Hex Prism & Double Orbit Rings
        const prismGeo = new THREE.CylinderGeometry(1.15, 1.15, 1.15, 6);
        const prismMat = new THREE.MeshStandardMaterial({
          color: 0xffb238,
          roughness: 0.15,
          metalness: 0.85,
          emissive: 0x5a2d06,
          emissiveIntensity: 0.4
        });
        meshA = new THREE.Mesh(prismGeo, prismMat);
        group.add(meshA);
        disposables.push(prismGeo, prismMat);

        const coreGeo = new THREE.SphereGeometry(0.58, 32, 32);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0xff6b35,
          emissive: 0xffa500,
          emissiveIntensity: 0.8
        });
        meshB = new THREE.Mesh(coreGeo, coreMat);
        group.add(meshB);
        disposables.push(coreGeo, coreMat);

        const r1Geo = new THREE.TorusGeometry(1.75, 0.035, 16, 64);
        const r1Mat = new THREE.MeshBasicMaterial({ color: 0xffb238, transparent: true, opacity: 0.75 });
        meshC = new THREE.Mesh(r1Geo, r1Mat);
        meshC.rotation.x = Math.PI / 3;
        group.add(meshC);
        disposables.push(r1Geo, r1Mat);

        // Gold deposit particles
        const pCount = 90;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          pPos[i * 3] = (Math.random() - 0.5) * 3.2;
          pPos[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
          pPos[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.055, color: 0xffb238, transparent: true, opacity: 0.9 });
        particles = new THREE.Points(pGeo, pMat);
        group.add(particles);
        disposables.push(pGeo, pMat);
      } else if (step === 2) {
        // Step 2: ZK Witness Hypercube & Helical Particles
        const knotGeo = new THREE.TorusKnotGeometry(1.28, 0.13, 128, 32, 2, 3);
        const knotMat = new THREE.MeshStandardMaterial({
          color: 0xffb238,
          roughness: 0.1,
          metalness: 0.9,
          emissive: 0x4a2505,
          emissiveIntensity: 0.45
        });
        meshA = new THREE.Mesh(knotGeo, knotMat);
        group.add(meshA);
        disposables.push(knotGeo, knotMat);

        const shellGeo = new THREE.IcosahedronGeometry(1.95, 1);
        const shellMat = new THREE.MeshBasicMaterial({
          color: 0xff6b35,
          wireframe: true,
          transparent: true,
          opacity: 0.45
        });
        meshB = new THREE.Mesh(shellGeo, shellMat);
        group.add(meshB);
        disposables.push(shellGeo, shellMat);

        // Helical ZK witness particles
        const pCount = 130;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          const t = (i / pCount) * Math.PI * 4;
          pPos[i * 3] = Math.cos(t) * 1.65;
          pPos[i * 3 + 1] = (i / pCount - 0.5) * 3.3;
          pPos[i * 3 + 2] = Math.sin(t) * 1.65;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.06, color: 0xffb238, transparent: true, opacity: 0.95 });
        particles = new THREE.Points(pGeo, pMat);
        group.add(particles);
        disposables.push(pGeo, pMat);
      } else {
        // Step 3: Shielded Emerald ZK Crystal & Triple Forcefield
        const gemGeo = new THREE.DodecahedronGeometry(1.15);
        const gemMat = new THREE.MeshStandardMaterial({
          color: 0x7be08a,
          roughness: 0.15,
          metalness: 0.65,
          emissive: 0x16a34a,
          emissiveIntensity: 0.8
        });
        meshA = new THREE.Mesh(gemGeo, gemMat);
        group.add(meshA);
        disposables.push(gemGeo, gemMat);

        const r1Geo = new THREE.TorusGeometry(1.65, 0.035, 16, 64);
        const r1Mat = new THREE.MeshBasicMaterial({ color: 0x7be08a, transparent: true, opacity: 0.75 });
        meshB = new THREE.Mesh(r1Geo, r1Mat);
        meshB.rotation.x = Math.PI / 4;
        group.add(meshB);
        disposables.push(r1Geo, r1Mat);

        const r2Geo = new THREE.TorusGeometry(1.7, 0.035, 16, 64);
        const r2Mat = new THREE.MeshBasicMaterial({ color: 0xffb238, transparent: true, opacity: 0.6 });
        meshC = new THREE.Mesh(r2Geo, r2Mat);
        meshC.rotation.y = Math.PI / 3;
        group.add(meshC);
        disposables.push(r2Geo, r2Mat);

        // Shield aura particles
        const pCount = 100;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          const r = 1.85 + Math.random() * 0.6;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pPos[i * 3 + 2] = r * Math.cos(phi);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.055, color: 0x7be08a, transparent: true, opacity: 0.9 });
        particles = new THREE.Points(pGeo, pMat);
        group.add(particles);
        disposables.push(pGeo, pMat);
      }

      // Global Viewport Cursor Tracking
      let targetYaw = 0, targetPitch = 0, currentYaw = 0, currentPitch = 0;
      const handleGlobalMouseMove = (e) => {
        const ndcX = (e.clientX / window.innerWidth - 0.5) * 2;
        const ndcY = (e.clientY / window.innerHeight - 0.5) * 2;
        targetYaw = ndcX * 1.2;
        targetPitch = -ndcY * 0.8;
      };

      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });

      const animate = (t) => {
        animationFrameId = requestAnimationFrame(animate);

        currentYaw += (targetYaw - currentYaw) * 0.08;
        currentPitch += (targetPitch - currentPitch) * 0.08;

        group.rotation.y = currentYaw;
        group.rotation.x = currentPitch;

        if (step === 1) {
          meshA.rotation.y += 0.01;
          meshA.rotation.x += 0.005;
          meshB.scale.setScalar(1 + Math.sin(t * 0.003) * 0.08);
          meshC.rotation.z -= 0.006;
          if (particles) particles.rotation.y += 0.003;
        } else if (step === 2) {
          meshA.rotation.x += 0.006;
          meshA.rotation.y += 0.008;
          meshB.rotation.y -= 0.005;
          meshB.rotation.z += 0.004;
          if (particles) particles.rotation.y += 0.005;
        } else if (step === 3) {
          meshA.rotation.y += 0.008;
          meshA.rotation.x += 0.004;
          meshA.scale.setScalar(1 + Math.sin(t * 0.0025) * 0.07);
          meshB.rotation.z += 0.008;
          meshC.rotation.x += 0.006;
          if (particles) particles.rotation.y -= 0.003;
        }

        renderer.render(scene, camera);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        window.removeEventListener('mousemove', handleGlobalMouseMove);
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
