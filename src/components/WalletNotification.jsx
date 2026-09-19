import React from 'react';
import { CheckCircle2, Shield, X, Loader2 } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const formatAddress = (addr) => {
  if (!addr) return '';
  const str = typeof addr === 'string' ? addr : (addr?.address || addr?.unshieldedAddress || String(addr));
  return str.length > 14 ? `${str.slice(0, 10)}...${str.slice(-4)}` : str;
};

const WalletNotification = () => {
  const { connected, connecting, walletAddress, connectionSuccess, dismissSuccess } = useWallet();

  if (connecting) {
    return (
      <div 
        className="wallet-pending-toast animate-rise"
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: 'min(500px, 92vw)',
          background: 'linear-gradient(180deg, #1f1910, #130f09)',
          border: '1px solid rgba(255, 178, 56, 0.5)',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 12px 40px -10px rgba(255, 150, 30, 0.4), 0 0 0 1px rgba(255,255,255,0.05) inset',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontFamily: 'var(--font-display)'
        }}
      >
        <div 
          style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '50%', 
            background: 'radial-gradient(circle, rgba(255, 178, 56, 0.3), transparent 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(255, 178, 56, 0.5)',
            flexShrink: 0
          }}
        >
          <Loader2 className="spin" size={24} color="#FFB238" />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#FFB238', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            <Shield size={12} />
            LACE EXTENSION AUTHORIZATION PENDING
          </div>
          <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#f7f1e8', marginTop: '2px', lineHeight: 1.4 }}>
            Please check your Lace extension window or click the Lace icon 🦊 in your browser toolbar to approve connection.
          </div>
        </div>
      </div>
    );
  }

  if (!connectionSuccess || !connected) return null;

  return (
    <div 
      className="wallet-success-toast animate-rise"
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'min(460px, 92vw)',
        background: 'linear-gradient(180deg, #131b14, #0a0e0b)',
        border: '1px solid rgba(123, 224, 138, 0.45)',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 12px 40px -10px rgba(123, 224, 138, 0.45), 0 0 0 1px rgba(255,255,255,0.05) inset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        fontFamily: 'var(--font-display)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div 
          style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '50%', 
            background: 'radial-gradient(circle, rgba(123, 224, 138, 0.3), transparent 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(123, 224, 138, 0.5)',
            flexShrink: 0
          }}
        >
          <CheckCircle2 size={24} color="#7be08a" />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7be08a', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            <Shield size={12} />
            LACE WALLET CONNECTED
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#f7f1e8', marginTop: '2px' }}>
            Connected Successfully!
          </div>
          <div style={{ fontSize: '12.5px', color: '#a89a80', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            Address: <span style={{ color: '#FFB238' }}>{formatAddress(walletAddress)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={dismissSuccess}
        style={{
          background: 'none',
          border: 'none',
          color: '#a89a80',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s ease'
        }}
        title="Dismiss Notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default WalletNotification;
