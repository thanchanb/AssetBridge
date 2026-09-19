import React, { useRef } from 'react';
import Sequence3DCanvas from './Sequence3DCanvas';

const StepCard = ({ num, title, description, stepIndex }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateZ(0)`;
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
        <div className="step-3d-visual">
          <Sequence3DCanvas step={stepIndex} />
        </div>
        <span className="step-num">{num}</span>
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
        <h2>One deposit, one proof, one shielded asset.</h2>
        <p>Three steps happen every time you bridge — two on your device, one on the ledger.</p>
      </div>
      <div className="steps">
        <StepCard 
          stepIndex={1}
          num="01" 
          title="Deposit publicly" 
          description="You send a public asset to the bridge contract, the same as any on-chain transaction." 
        />
        <StepCard 
          stepIndex={2}
          num="02" 
          title="Prove privately" 
          description="Your browser compiles a zk-SNARK witness — the math that proves the transaction is valid without exposing its contents." 
        />
        <StepCard 
          stepIndex={3}
          num="03" 
          title="Receive, shielded" 
          description="The Compact ledger records only a commitment hash. You hold the shielded asset; no one else can see how much." 
        />
      </div>
    </section>
  );
};

export default SequenceSection;
