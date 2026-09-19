import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let animationFrameId;
    let renderer, scene, camera, group, shellGeo, shellMat, innerGeo, innerMat, coreGeo, coreMat, coreGlowGeo, coreGlowMat, particleGeo, particleMat;

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

      group = new THREE.Group();
      scene.add(group);

      // Outer wireframe shell — the "eclipsed" edge
      shellGeo = new THREE.IcosahedronGeometry(2.15, 1);
      shellMat = new THREE.MeshBasicMaterial({
        color: 0xffb238, wireframe: true, transparent: true, opacity: 0.55
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      group.add(shell);

      // Inner faint solid shell for depth
      innerGeo = new THREE.IcosahedronGeometry(2.0, 1);
      innerMat = new THREE.MeshBasicMaterial({
        color: 0x2a1508, transparent: true, opacity: 0.55
      });
      group.add(new THREE.Mesh(innerGeo, innerMat));

      // Molten core
      coreGeo = new THREE.SphereGeometry(0.62, 32, 32);
      coreMat = new THREE.MeshBasicMaterial({ color: 0xff6b35 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      coreGlowGeo = new THREE.SphereGeometry(0.95, 32, 32);
      coreGlowMat = new THREE.MeshBasicMaterial({
        color: 0xffb238, transparent: true, opacity: 0.16
      });
      group.add(new THREE.Mesh(coreGlowGeo, coreGlowMat));

      // Orbiting particle field — gold, ember, with a few cool teal accents
      const particleCount = 260;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const palette = [
        [1.0, 0.70, 0.22],   // gold
        [1.0, 0.42, 0.21],   // ember
        [0.97, 0.85, 0.60],  // pale warm
        [0.31, 0.82, 0.77]   // teal accent, sparingly
      ];
      const weights = [0.42, 0.34, 0.18, 0.06];

      for (let i = 0; i < particleCount; i++) {
        const r = 2.6 + Math.random() * 1.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        let roll = Math.random(), acc = 0, pick = palette[0];
        for (let p = 0; p < palette.length; p++) {
          acc += weights[p];
          if (roll <= acc) { pick = palette[p]; break; }
        }
        colors[i * 3] = pick[0];
        colors[i * 3 + 1] = pick[1];
        colors[i * 3 + 2] = pick[2];
      }

      particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleMat = new THREE.PointsMaterial({
        size: 0.055, vertexColors: true, transparent: true, opacity: 0.85
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      let pmx = 0, pmy = 0, ptx = 0, pty = 0;
      const handleMouseMove = (e) => {
        const r = host.getBoundingClientRect();
        ptx = ((e.clientX - r.left) / r.width - 0.5);
        pty = ((e.clientY - r.top) / r.height - 0.5);
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('resize', sizeRenderer);

      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const animate = (t) => {
        animationFrameId = requestAnimationFrame(animate);
        if (!reduced) {
          group.rotation.y += 0.0028;
          group.rotation.x = Math.sin(t * 0.00018) * 0.12;
          particles.rotation.y -= 0.0009;
          core.scale.setScalar(1 + Math.sin(t * 0.0016) * 0.06);
        }
        pmx += (ptx - pmx) * 0.05;
        pmy += (pty - pmy) * 0.05;
        group.rotation.y += pmx * 0.01;
        camera.position.x += (pmx * 0.9 - camera.position.x) * 0.04;
        camera.position.y += (-pmy * 0.7 - camera.position.y) * 0.04;
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
        shellGeo?.dispose();
        shellMat?.dispose();
        innerGeo?.dispose();
        innerMat?.dispose();
        coreGeo?.dispose();
        coreMat?.dispose();
        coreGlowGeo?.dispose();
        coreGlowMat?.dispose();
        particleGeo?.dispose();
        particleMat?.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('3D orb failed to init:', err);
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
