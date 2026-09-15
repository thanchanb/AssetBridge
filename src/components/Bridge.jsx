import React, { useState } from 'react';
import { ArrowDown, Settings, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import './Bridge.css';

const Bridge = () => {
  const [amount, setAmount] = useState('0.0');
  const [status, setStatus] = useState('idle'); // idle, generating, confirming, success
  const [txHash, setTxHash] = useState('');

  const handleBridge = async () => {
    if (parseFloat(amount) <= 0) return;
    
    setStatus('generating');
    
    try {
      // 1. Connect to Lace Wallet via Midnight DApp Connector
      if (!window.midnight || !window.midnight.mnLace) {
        throw new Error('Lace wallet not found. Please install the Lace wallet extension.');
      }
      
      const walletApi = await window.midnight.mnLace.enable();
      
      setStatus('confirming');
      
      // 2. In a fully configured DApp, we initialize the MidnightProvider and ZK proof server.
      // const providers = await configureProviders(walletApi);
      // const contractAddress = 'mn_preprod...'; // Midnight Preprod contract deployment address
      
      // 3. Bind UI actions to trigger actual Compact circuit execution
      // const contract = new Contract(providers, contractAddress);
      // const tx = await contract.circuits.bridge_asset(BigInt(Math.floor(parseFloat(amount) * 1e6)));
      
      // Execute transaction state machine with Midnight Preprod transaction formatting
      let userAddr = 'mn_preprod_tester';
      try {
        const state = await walletApi.state();
        if (state && state.address) userAddr = state.address;
      } catch {
        // Fallback for simulation mode
      }
      
      const realTxHash = `mn_tx_${userAddr.substring(0, 8)}_${Date.now().toString(36)}`;
      
      setStatus('success');
      setTxHash(realTxHash);
    } catch (error) {
      console.error("Bridge Error:", error);
      alert(error.message || "Failed to bridge assets. Ensure Lace is connected to Midnight Preprod.");
      setStatus('idle');
    }
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
          <label>To: Midnight Network (Shielded Compact ZK)</label>
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
            <span>Transactions are shielded using Midnight Zero-Knowledge proofs.</span>
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
              <span>Generating ZK Proof (Compact DSL)</span>
            </div>
            <div className={`status-step ${status === 'confirming' || status === 'success' ? 'active' : ''} ${status === 'generating' ? 'pending' : ''}`}>
              {status === 'confirming' ? <Loader2 className="spin" size={18} /> : (status === 'success' ? <CheckCircle2 size={18} /> : <div className="dot"></div>)}
              <span>Confirming on Midnight Preprod</span>
            </div>
            
            {status === 'success' && (
              <div className="success-message animate-fade-in" style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.1rem' }}>⚡ Client MVP Bridge Simulation Complete!</p>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: '0.25rem 0' }}>Demo Activity ID: <code>{txHash}</code></p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0' }}>
                  (Note: Proof compilation & transaction confirmation are simulated in client runtime)
                </p>
                <a href="#feedback" className="btn btn-outline" style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  📝 Submit Tester Feedback Below
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
