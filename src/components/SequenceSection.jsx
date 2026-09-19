import React from 'react';

const SequenceSection = () => {
  return (
    <section className="sequence" id="how">
      <div className="sequence-head">
        <h2>One deposit, one proof, one shielded asset.</h2>
        <p>Three steps happen every time you bridge — two on your device, one on the ledger.</p>
      </div>
      <div className="steps">
        <div className="step">
          <span className="step-num">01</span>
          <h4>Deposit publicly</h4>
          <p>You send a public asset to the bridge contract, the same as any on-chain transaction.</p>
        </div>
        <div className="step">
          <span className="step-num">02</span>
          <h4>Prove privately</h4>
          <p>Your browser compiles a zk-SNARK witness — the math that proves the transaction is valid without exposing its contents.</p>
        </div>
        <div className="step">
          <span className="step-num">03</span>
          <h4>Receive, shielded</h4>
          <p>The Compact ledger records only a commitment hash. You hold the shielded asset; no one else can see how much.</p>
        </div>
      </div>
    </section>
  );
};

export default SequenceSection;
