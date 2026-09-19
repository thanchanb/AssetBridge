import React from 'react';
import { ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero container animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <ThreeCanvas />
      
      <div className="hero-content">
        <div className="badge">
          <ShieldCheck size={16} className="badge-icon" />
          <span>Zero-Knowledge Privacy Core</span>
          <span className="badge-dot"></span>
        </div>
        
        <h1 className="hero-title">
          Bridge Assets with <br />
          <span className="text-primary-gradient">Absolute Privacy</span>
        </h1>
        
        <p className="hero-subtitle">
          AssetBridge leverages client-side ZK-SNARK witness compilation on the 
          <strong> Midnight Network</strong> to ensure your cross-chain asset parameters 
          remain completely confidential.
        </p>

        <div className="hero-actions">
          <a href="#bridge" className="btn btn-primary btn-large">
            Start Bridging <ArrowRight size={20} />
          </a>
          <a 
            href="https://github.com/thanchanb/AssetBridge#readme" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline btn-large"
          >
            <Lock size={18} /> Protocol Specs
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
