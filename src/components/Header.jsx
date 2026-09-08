import React, { useState } from 'react';
import { Wallet, Shield } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [network, setNetwork] = useState('Preprod');

  return (
    <header className="header animate-fade-in">
      <div className="container header-content">
        <div className="logo">
          <Shield className="logo-icon" size={28} />
          <span className="logo-text text-gradient">AssetBridge</span>
        </div>
        
        <nav className="nav-links">
          <a href="#" className="nav-link active">Bridge</a>
          <a href="#" className="nav-link">Transactions</a>
          <a href="#feedback" className="nav-link">Feedback</a>
          <a href="https://github.com/thanchanb/AssetBridge#readme" target="_blank" rel="noopener noreferrer" className="nav-link">Docs</a>
        </nav>

        <div className="header-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            className="btn btn-outline network-badge"
            title="Click to toggle network between Cardano Preprod and Preview Network"
            onClick={() => setNetwork(prev => prev === 'Preprod' ? 'Preview' : 'Preprod')}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', borderColor: 'var(--primary)' }}
          >
            ⚡ {network} Net
          </button>

          <button 
            className={`btn ${connected ? 'btn-outline' : 'btn-primary'}`}
            onClick={() => setConnected(!connected)}
          >
            <Wallet size={18} />
            {connected ? 'addr_test1...976f' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
