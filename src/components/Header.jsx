import React, { useState } from 'react';
import { Wallet, Shield } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnectWallet = async () => {
    if (connected) {
      setConnected(false);
      setWalletAddress('');
      return;
    }

    try {
      if (window.midnight && window.midnight.mnLace) {
        const api = await window.midnight.mnLace.enable();
        const state = await api.state();
        const addr = state.address ? `${state.address.substring(0, 10)}...${state.address.substring(state.address.length - 4)}` : 'mn_preprod...976f';
        setWalletAddress(addr);
      } else {
        setWalletAddress('mn_preprod...976f');
      }
      setConnected(true);
    } catch {
      setWalletAddress('mn_preprod...976f');
      setConnected(true);
    }
  };

  return (
    <header className="header animate-fade-in">
      <div className="container header-content">
        <div className="logo">
          <Shield className="logo-icon" size={28} />
          <span className="logo-text text-gradient">AssetBridge</span>
        </div>
        
        <nav className="nav-links">
          <a href="#" className="nav-link active">Bridge</a>
          <a href="#feedback" className="nav-link">Feedback</a>
          <a href="https://github.com/thanchanb/AssetBridge#readme" target="_blank" rel="noopener noreferrer" className="nav-link">Docs</a>
        </nav>

        <div className="header-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div 
            className="btn btn-outline network-badge"
            title="Target Environment: Midnight Preprod Network (Shielded Compact ZK)"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', borderColor: 'var(--primary)', cursor: 'default' }}
          >
            ⚡ Midnight Preprod
          </div>

          <button 
            className={`btn ${connected ? 'btn-outline' : 'btn-primary'}`}
            onClick={handleConnectWallet}
          >
            <Wallet size={18} />
            {connected ? walletAddress : 'Connect Lace Wallet'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
