import React from 'react';
import { Globe, MessageSquare } from 'lucide-react';
import './Footer.css';

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
            <a href="https://x.com/AssetBridgeZK" target="_blank" rel="noopener noreferrer">Product X Profile</a>
          </div>
          <div className="link-group">
            <h4>Resources</h4>
            <a href="https://github.com/thanchanb/AssetBridge#readme" target="_blank" rel="noopener noreferrer">Documentation</a>
            <a href="https://github.com/thanchanb/AssetBridge" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://x.com/AssetBridgeZK" target="_blank" rel="noopener noreferrer" className="social-link" title="Product X (@AssetBridgeZK)">
            <XIcon size={18} />
          </a>
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
