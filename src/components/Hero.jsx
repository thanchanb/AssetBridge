import React from 'react';
import ThreeCanvas from './ThreeCanvas';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <div className="hero-tag">◐ Zero-knowledge, by default</div>
          <h1>Bridge assets<br /><em>into the dark.</em></h1>
          <p className="sub">
            ETH and ADA go in. Shielded zETH and sADA come out. Everything in between — 
            your balance, your address, your history — stays in your private state, 
            proven but never revealed.
          </p>
          <div className="hero-ctas">
            <a href="#bridge" className="btn btn-primary">Open the bridge</a>
            <a 
              href="https://github.com/thanchanb/AssetBridge#readme" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-ghost"
            >
              Read the contract
            </a>
          </div>
        </div>
        <div className="hero-visual" id="orbHost">
          <ThreeCanvas />
        </div>
      </div>
    </section>
  );
};

export default Hero;
