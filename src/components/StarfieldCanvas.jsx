import React, { useEffect, useRef } from 'react';

const OCTAHEDRON_VERTICES = [
  [0, 1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, -1, 0]
];

const OCTAHEDRON_EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [5, 1], [5, 2], [5, 3], [5, 4],
  [1, 2], [2, 3], [3, 4], [4, 1]
];

const StarfieldCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, stars = [], zkNodes = [];
    let animationFrameId;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight * 1.4;
      stars = [];
      const count = Math.min(140, Math.floor((w * h) / 9000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.3,
          depth: Math.random() * 0.6 + 0.2,
          tw: Math.random() * Math.PI * 2
        });
      }

      // Generate floating 3D ZK wireframe nodes
      zkNodes = [];
      const nodeCount = 7;
      for (let n = 0; n < nodeCount; n++) {
        zkNodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 24 + 18,
          rx: Math.random() * Math.PI * 2,
          ry: Math.random() * Math.PI * 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          rotSpeedX: (Math.random() - 0.5) * 0.015,
          rotSpeedY: (Math.random() - 0.5) * 0.015,
          depth: Math.random() * 0.5 + 0.3,
          color: n % 2 === 0 ? 'rgba(255, 178, 56,' : 'rgba(255, 107, 53,'
        });
      }
    }

    window.addEventListener('resize', resize);
    resize();

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const handleMouseMove = (e) => {
      tmx = (e.clientX / window.innerWidth - 0.5);
      tmy = (e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    function draw(t) {
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;
      ctx.clearRect(0, 0, w, h);

      // Render Starfield
      for (const s of stars) {
        const tw = 0.55 + Math.sin(t * 0.001 + s.tw) * 0.45;
        const ox = mx * 26 * s.depth;
        const oy = my * 16 * s.depth;
        ctx.beginPath();
        ctx.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,230,250,${tw * 0.85})`;
        ctx.fill();
      }

      // Render 3D Floating Wireframe ZK Nodes
      for (const node of zkNodes) {
        node.x += node.speedX;
        node.y += node.speedY;
        node.rx += node.rotSpeedX;
        node.ry += node.rotSpeedY;

        if (node.x < -50) node.x = w + 50;
        if (node.x > w + 50) node.x = -50;
        if (node.y < -50) node.y = h + 50;
        if (node.y > h + 50) node.y = -50;

        const ox = node.x + mx * 40 * node.depth;
        const oy = node.y + my * 30 * node.depth;

        // Project 3D vertices
        const projected = OCTAHEDRON_VERTICES.map(([vx, vy, vz]) => {
          // Rotate around X
          let y1 = vy * Math.cos(node.rx) - vz * Math.sin(node.rx);
          let z1 = vy * Math.sin(node.rx) + vz * Math.cos(node.rx);
          // Rotate around Y
          let x2 = vx * Math.cos(node.ry) + z1 * Math.sin(node.ry);
          let z2 = -vx * Math.sin(node.ry) + z1 * Math.cos(node.ry);

          const scale = node.size;
          return {
            x: ox + x2 * scale,
            y: oy + y1 * scale,
            z: z2
          };
        });

        // Draw wireframe edges
        ctx.strokeStyle = `${node.color}${0.18 * node.depth})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (const [i, j] of OCTAHEDRON_EDGES) {
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    }
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        className="glow-field"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: `
            radial-gradient(ellipse 900px 600px at 78% 8%, rgba(255,150,30,0.20), transparent 60%),
            radial-gradient(ellipse 700px 500px at 12% 80%, rgba(255,107,53,0.08), transparent 60%)
          `,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default StarfieldCanvas;
