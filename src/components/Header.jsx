import React from 'react';
import { useWallet } from '../context/WalletContext';

const formatAddress = (addr) => {
  if (!addr) return '';
  const str = typeof addr === 'string' ? addr : (addr?.address || addr?.unshieldedAddress || String(addr));
  return str.length > 14 ? `${str.slice(0, 10)}...${str.slice(-4)}` : str;
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
    <nav>
      <a href="#" className="brand">
        <span className="brand-mark"></span> AssetBridge
      </a>
      
      <div className="nav-links">
        <a href="#bridge">Bridge</a>
        <a href="#how">How it works</a>
        <a href="#feedback">Feedback</a>
        <a href="https://github.com/thanchanb/AssetBridge#readme" target="_blank" rel="noopener noreferrer">Docs</a>
      </div>

      <div className="nav-right">
        <span className="pill" title="Target Network: Midnight Preprod (Shielded Compact ZK)">
          <span className="dot"></span> Preprod
        </span>

        <div className="wallet-connector-wrapper" style={{ position: 'relative' }}>
          <button 
            className={`btn ${connected ? 'btn-ghost' : 'btn-primary'}`}
            onClick={handleToggleWallet}
            disabled={connecting}
            style={{ fontSize: '13.5px', padding: '9px 18px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            title={connected ? `Connected: ${walletAddress}. Click to disconnect.` : 'Click to connect Lace wallet'}
          >
            {connecting ? (
              'Connecting Lace...'
            ) : connected ? (
              <>
                <span className="dot" style={{ background: '#7be08a', boxShadow: '0 0 10px #7be08a' }}></span>
                {formatAddress(walletAddress)}
              </>
            ) : (
              'Connect Lace Wallet'
            )}
          </button>

          {walletError && (
            <div 
              className="wallet-error-tooltip"
              role="alert"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: '#130f09',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                fontSize: '12px',
                padding: '8px 12px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>⚠️ {walletError}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); clearError(); }} 
                style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
