import React, { useEffect, useRef } from 'react';

const StarfieldCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, stars = [];
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
      for (const s of stars) {
        const tw = 0.55 + Math.sin(t * 0.001 + s.tw) * 0.45;
        const ox = mx * 26 * s.depth;
        const oy = my * 16 * s.depth;
        ctx.beginPath();
        ctx.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,230,250,${tw * 0.85})`;
        ctx.fill();
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
