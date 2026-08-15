import React, { useState, useEffect } from 'react';
import { ArrowDown, Settings, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import './Bridge.css';

const Bridge = () => {
  const [amount, setAmount] = useState('0.0');
  const [status, setStatus] = useState('idle'); // idle, generating, confirming, success
  const [txHash, setTxHash] = useState('');

  const handleBridge = () => {
    if (parseFloat(amount) <= 0) return;
    
    setStatus('generating');
    
    // Simulate ZK proof generation
    setTimeout(() => {
      setStatus('confirming');
      
      // Simulate network confirmation
      setTimeout(() => {
        setStatus('success');
        setTxHash('0x' + Math.random().toString(16).substr(2, 40));
      }, 3000);
    }, 2500);
  };

  return (
    <section className="bridge-section container animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="bridge-card glass-panel">
        <div className="bridge-header">
          <h2>Bridge Assets</h2>
          <button className="icon-btn"><Settings size={20} /></button>
        </div>

        <div className="input-group">
          <label>From: Ethereum Mainnet</label>
          <div className="input-box">
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              disabled={status !== 'idle'}
            />
            <div className="token-selector">
              <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" alt="ETH" className="token-icon" />
              <span>ETH</span>
            </div>
          </div>
        </div>

        <div className="bridge-divider">
          <div className="divider-line"></div>
          <button className="swap-btn"><ArrowDown size={18} /></button>
          <div className="divider-line"></div>
        </div>

        <div className="input-group">
          <label>To: Midnight Network (Shielded)</label>
          <div className="input-box">
            <input 
              type="number" 
              value={amount} 
              readOnly 
              placeholder="0.0"
            />
            <div className="token-selector">
              <img src="https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029" alt="Midnight" className="token-icon" style={{ filter: 'hue-rotate(180deg)' }} />
              <span>zETH</span>
            </div>
          </div>
        </div>

        {status === 'idle' && (
          <div className="privacy-notice">
            <ShieldAlert size={16} className="text-primary" />
            <span>Transactions are shielded using Zero-Knowledge proofs.</span>
          </div>
        )}

        <button 
          className="btn btn-primary bridge-submit-btn" 
          onClick={handleBridge}
          disabled={status !== 'idle' || parseFloat(amount) <= 0}
        >
          {status === 'idle' ? 'Generate ZK Proof & Bridge' : 'Processing...'}
        </button>

        {status !== 'idle' && (
          <div className="tx-status-box">
            <div className={`status-step ${status === 'generating' || status === 'confirming' || status === 'success' ? 'active' : ''}`}>
              {status === 'generating' ? <Loader2 className="spin" size={18} /> : <CheckCircle2 size={18} />}
              <span>Generating ZK Proof</span>
            </div>
            <div className={`status-step ${status === 'confirming' || status === 'success' ? 'active' : ''} ${status === 'generating' ? 'pending' : ''}`}>
              {status === 'confirming' ? <Loader2 className="spin" size={18} /> : (status === 'success' ? <CheckCircle2 size={18} /> : <div className="dot"></div>)}
              <span>Confirming on Preprod</span>
            </div>
            
            {status === 'success' && (
              <div className="success-message animate-fade-in">
                <p>Bridge Successful!</p>
                <a href={`https://preprod.cardanoscan.io/transaction/${txHash}`} target="_blank" rel="noreferrer" className="tx-link">
                  View TX: {txHash.substring(0, 10)}...
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bridge;
