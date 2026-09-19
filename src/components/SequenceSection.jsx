import React, { useRef } from 'react';
import Sequence3DCanvas from './Sequence3DCanvas';

const StepCard = ({ num, title, description, badge, stepIndex }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(0)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div 
      className="step-card-wrapper" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <div className="step step-3d" ref={cardRef}>
        <div className="step-card-header">
          <span className="step-num">{num}</span>
          <span className="step-badge">{badge}</span>
        </div>
        
        <div className="step-3d-visual">
          <div className="visual-glow-halo"></div>
          <Sequence3DCanvas step={stepIndex} />
        </div>

        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

const SequenceSection = () => {
  return (
    <section className="sequence" id="how">
      <div className="sequence-head">
        <div className="hero-tag" style={{ marginBottom: '16px', opacity: 1, animation: 'none' }}>
          <span>⚡ Three-Stage Zero-Knowledge Lifecycle</span>
        </div>
        <h2>One deposit, one proof, one shielded asset.</h2>
        <p>Three steps happen every time you bridge — two on your device, one on the ledger.</p>
      </div>

      <div className="steps">
        <StepCard 
          stepIndex={1}
          num="01" 
          badge="Public Deposit"
          title="Deposit publicly" 
          description="You send a public asset to the bridge contract, the same as any on-chain transaction." 
        />
        <StepCard 
          stepIndex={2}
          num="02" 
          badge="ZK Witness Proving"
          title="Prove privately" 
          description="Your browser compiles a zk-SNARK witness — the math that proves the transaction is valid without exposing its contents." 
        />
        <StepCard 
          stepIndex={3}
          num="03" 
          badge="Ledger Shielding"
          title="Receive, shielded" 
          description="The Compact ledger records only a commitment hash. You hold the shielded asset; no one else can see how much." 
        />
      </div>
    </section>
  );
};

export default SequenceSection;
