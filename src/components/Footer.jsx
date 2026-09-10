import React from 'react';
import { Globe, MessageSquare } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>AssetBridge</h3>
          <p>Privacy-preserving cross-chain asset transfers powered by Zero-Knowledge proofs.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Product</h4>
            <a href="#">Bridge</a>
            <a href="#feedback">Feedback</a>
          </div>
          <div className="link-group">
            <h4>Resources</h4>
            <a href="https://github.com/thanchanb/AssetBridge#readme" target="_blank" rel="noopener noreferrer">Documentation</a>
            <a href="https://github.com/thanchanb/AssetBridge" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://github.com/thanchanb/AssetBridge" target="_blank" rel="noreferrer" className="social-link" title="GitHub Repository">
            <Globe size={20} />
          </a>
          <a href="#feedback" className="social-link" title="In-App Telemetry">
            <MessageSquare size={20} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AssetBridge Protocol. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
