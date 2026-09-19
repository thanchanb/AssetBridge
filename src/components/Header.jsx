import React from 'react';
import { Wallet, Shield } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import './Header.css';

const formatAddress = (addr) => {
  if (!addr) return '';
  const str = typeof addr === 'string' ? addr : (addr?.address || addr?.unshieldedAddress || String(addr));
  return str.length > 12 ? `${str.slice(0, 8)}...${str.slice(-4)}` : str;
};

const Header = () => {
  const { connected, connecting, walletAddress, walletError, connect, disconnect, clearError } = useWallet();

  const handleToggleWallet = () => {
    if (connected) {
      disconnect();
    } else {
      connect();
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

          <div className="wallet-connector-wrapper" style={{ position: 'relative' }}>
            <button 
              className={`btn ${connected ? 'btn-outline' : 'btn-primary'}`}
              onClick={handleToggleWallet}
              disabled={connecting}
            >
              <Wallet size={18} />
              {connecting 
                ? 'Connecting Lace...' 
                : connected 
                  ? formatAddress(walletAddress) 
                  : 'Connect Lace Wallet'}
            </button>
            {walletError && (
              <div 
                className="wallet-error-tooltip"
                role="alert"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#1a1012',
                  border: '1px solid #ef4444',
                  color: '#fca5a5',
                  fontSize: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  zIndex: 200,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>⚠️ {walletError}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); clearError(); }} 
                  style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1 }}
                  title="Dismiss"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
