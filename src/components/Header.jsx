import React, { useState } from 'react';
import { Wallet, Shield } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [connected, setConnected] = useState(false);

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
          <a href="#" className="nav-link">Docs</a>
        </nav>

        <button 
          className={`btn ${connected ? 'btn-outline' : 'btn-primary'}`}
          onClick={() => setConnected(!connected)}
        >
          <Wallet size={18} />
          {connected ? '0x71C...976F' : 'Connect Wallet'}
        </button>
      </div>
    </header>
  );
};

export default Header;
