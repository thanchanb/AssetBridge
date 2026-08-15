import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero container animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="hero-content">
        <div className="badge">
          <ShieldCheck size={16} className="badge-icon" />
          <span>Zero-Knowledge Privacy Core</span>
        </div>
        <h1 className="hero-title">
          Bridge Assets with <br />
          <span className="text-primary-gradient">Absolute Privacy</span>
        </h1>
        <p className="hero-subtitle">
          AssetBridge leverages cutting-edge ZK proofs to ensure your cross-chain transfers 
          remain completely confidential. No traces, just secure bridging.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-large">
            Start Bridging <ArrowRight size={20} />
          </button>
          <button className="btn btn-outline btn-large">
            Read Whitepaper
          </button>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="visual-circle circle-1"></div>
        <div className="visual-circle circle-2"></div>
        <div className="visual-circle circle-3"></div>
      </div>
    </section>
  );
};

export default Hero;
