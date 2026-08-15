import React from 'react';
import { Github, Twitter, MessageSquare } from 'lucide-react';
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
            <a href="#">Explorer</a>
            <a href="#">Ecosystem</a>
          </div>
          <div className="link-group">
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">Whitepaper</a>
            <a href="#">GitHub</a>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://x.com/AssetBridgeZK" target="_blank" rel="noreferrer" className="social-link">
            <Twitter size={20} />
          </a>
          <a href="https://github.com/AssetBridge" target="_blank" rel="noreferrer" className="social-link">
            <Github size={20} />
          </a>
          <a href="#" className="social-link">
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
