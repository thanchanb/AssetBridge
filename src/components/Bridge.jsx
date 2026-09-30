import React, { useState, useRef } from 'react';
import { useWallet } from '../context/WalletContext';
import { runBridgeTransaction } from '../services/midnightBridge';

const TOKEN_PAIRS = [
  {
    id: 'ada-sada',
    source: 'ADA',
    sourceName: 'Cardano Preprod',
    target: 'sADA',
    targetName: 'Midnight Network (Shielded Compact ZK)',
    dotClass: 'dot-eth',
    defaultRecipient: 'addr_test1qrz65ux420vj7k3...'
  },
  {
    id: 'eth-zeth',
    source: 'ETH',
    sourceName: 'Ethereum Sepolia/Mainnet',
    target: 'zETH',
    targetName: 'Midnight Network (Shielded Compact ZK)',
    dotClass: 'dot-eth',
    defaultRecipient: '0x71C...b84'
  },
  {
    id: 'btc-zbtc',
    source: 'BTC',
    sourceName: 'Bitcoin Network',
    target: 'zBTC',
    targetName: 'Midnight Network (Shielded Compact ZK)',
    dotClass: 'dot-eth',
    defaultRecipient: 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'
  }
];

const Bridge = () => {
  const { connected, connecting, walletAddress, walletApi, connect, walletError } = useWallet();
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit' | 'withdraw'
  const [selectedPair, setSelectedPair] = useState(TOKEN_PAIRS[0]);
  const [amount, setAmount] = useState('10.0');
  const [sourceTxHash, setSourceTxHash] = useState('');
  const [targetRecipient, setTargetRecipient] = useState('');
  
  // Stages: 0: idle, 1: custody verification, 2: ZK circuit proving, 3: Lace signing & relayer, 4: indexer outcome
  const [currentStage, setCurrentStage] = useState(0);
  const [stageStatus, setStageStatus] = useState({ state: 'idle', message: '', details: null });
  const [uiError, setUiError] = useState('');

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateZ(0)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  const handlePairSwap = () => {
    const currentIndex = TOKEN_PAIRS.findIndex(p => p.id === selectedPair.id);
    const nextIndex = (currentIndex + 1) % TOKEN_PAIRS.length;
    setSelectedPair(TOKEN_PAIRS[nextIndex]);
  };

  const handleBridgeAction = async () => {
    // If not connected, trigger wallet connection first
    if (!connected) {
      setUiError('');
      const success = await connect();
      if (!success) {
        return;
      }
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setUiError('Please enter a valid amount greater than 0.');
      return;
    }
    setUiError('');

    try {
      await runBridgeTransaction({
        action: activeTab,
        amount: String(parsedAmount),
        tokenPair: selectedPair,
        walletApi,
        walletAddress,
        targetRecipientAddress: targetRecipient || selectedPair.defaultRecipient,
        onStageChange: (stage, status) => {
          setCurrentStage(stage);
          setStageStatus(status);
        }
      });
    } catch (err) {
      console.error('[AssetBridge] Bridge transaction failed:', err);
      setUiError(err.message || 'Bridge execution failed');
      setStageStatus({ state: 'error', message: err.message, details: null });
    }
  };

  const handleReset = () => {
    setCurrentStage(0);
    setStageStatus({ state: 'idle', message: '', details: null });
    setUiError('');
  };

  return (
    <div className="stage" id="bridge" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="moon-halo"></div>
      <div className="card" ref={cardRef}>
        <div className="card-head">
          <h3>AssetBridge Custody Vault</h3>
          <button className="refresh" onClick={handleReset} title="Reset form">⟳</button>
        </div>

        {/* Tab Selector: Bridge In vs Bridge Out */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <button
            type="button"
            onClick={() => { setActiveTab('deposit'); handleReset(); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'deposit' ? 'var(--moon)' : 'transparent',
              color: activeTab === 'deposit' ? '#000' : 'var(--text-dim)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Deposit & Shield (Bridge In)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('withdraw'); handleReset(); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'withdraw' ? 'var(--moon)' : 'transparent',
              color: activeTab === 'withdraw' ? '#000' : 'var(--text-dim)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Burn & Redeem (Bridge Out)
          </button>
        </div>

        {/* From Section */}
        <div className="field-label">
          {activeTab === 'deposit' ? `From — ${selectedPair.sourceName} Custody Vault` : `From — Midnight Shielded Pool (${selectedPair.target})`}
        </div>
        <div className="field">
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            disabled={currentStage > 0 && currentStage < 4}
            step="any"
            min="0"
          />
          <div className="asset-chip" onClick={handlePairSwap} title="Click to cycle token pair">
            <span className={`asset-dot ${selectedPair.dotClass}`}></span>
            {activeTab === 'deposit' ? selectedPair.source : selectedPair.target}
          </div>
        </div>

        {/* Swap Divider Button */}
        <div className="swap-divider">
          <div className="line"></div>
          <button 
            className="swap-btn" 
            onClick={() => {
              setActiveTab(activeTab === 'deposit' ? 'withdraw' : 'deposit');
              handleReset();
            }} 
            title="Switch Bridge Direction (Deposit / Withdraw)" 
            type="button" 
            disabled={currentStage > 0 && currentStage < 4}
          >
            ⇅
          </button>
          <div className="line"></div>
        </div>

        {/* To Section */}
        <div className="field-label">
          {activeTab === 'deposit' ? `To — Midnight Network (${selectedPair.target})` : `To — ${selectedPair.sourceName} Recipient`}
        </div>
        <div className="field">
          <input 
            type="text" 
            value={amount} 
            readOnly 
            placeholder="0.0" 
          />
          <div className="asset-chip">
            <span className="asset-dot dot-zeth"></span>
            {activeTab === 'deposit' ? selectedPair.target : selectedPair.source}
          </div>
        </div>

        {/* Origin / Destination Address Input */}
        {activeTab === 'withdraw' ? (
          <div style={{ marginTop: '0.75rem' }}>
            <div className="field-label" style={{ fontSize: '0.78rem' }}>Destination Address on {selectedPair.sourceName}</div>
            <input
              type="text"
              placeholder={selectedPair.defaultRecipient}
              value={targetRecipient}
              onChange={(e) => setTargetRecipient(e.target.value)}
              disabled={currentStage > 0 && currentStage < 4}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            />
          </div>
        ) : (
          <div style={{ marginTop: '0.75rem' }}>
            <div className="field-label" style={{ fontSize: '0.78rem' }}>Origin Chain Custody Receipt / TX (Optional)</div>
            <input
              type="text"
              placeholder="Cardano Preprod TX Hash (auto-generated if empty)"
              value={sourceTxHash}
              onChange={(e) => setSourceTxHash(e.target.value)}
              disabled={currentStage > 0 && currentStage < 4}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Errors & Alerts */}
        {(uiError || walletError) && (
          <div className="ui-error-alert" style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚠️</span>
            <span>{uiError || walletError}</span>
          </div>
        )}

        {/* Truthful Privacy & Security Model Disclosure */}
        <div className="shield-note" style={{ marginTop: '1rem' }}>
          <span>◐</span>
          <span>
            {activeTab === 'deposit'
              ? 'Zero-Knowledge Proof: Your secret key and identity are shielded off-chain. The deposit nullifier and amount are disclosed to the Midnight ledger for asset conservation and replay protection.'
              : 'Zero-Knowledge Burn: Authorization is verified via private witness. Burned wrapped assets are deducted from TVL, and payout instructions are registered for custody unlock.'}
          </span>
        </div>

        <button 
          className="proof-btn"
          onClick={handleBridgeAction}
          disabled={connecting || (currentStage > 0 && currentStage < 4)}
        >
          {connecting
            ? 'Connecting Lace...'
            : !connected
            ? 'Connect Lace Wallet to Bridge'
            : currentStage > 0 && currentStage < 4
            ? 'Proving Compact Circuit...'
            : activeTab === 'deposit'
            ? 'Verify Deposit & Claim Shielded Asset'
            : 'Burn & Initiate Cross-Chain Unlock'}
        </button>

        {/* Multi-Stage Lifecycle Progress */}
        <div className="stages">
          <div className={`stage-item ${currentStage >= 1 ? (currentStage > 1 ? 'done' : 'active') : ''}`}>
            <div className="stage-dot"></div>
            <div className="stage-label">1. Custody</div>
          </div>
          <div className={`stage-item ${currentStage >= 2 ? (currentStage > 2 ? 'done' : 'active') : ''}`}>
            <div className="stage-dot"></div>
            <div className="stage-label">2. ZK Proving</div>
          </div>
          <div className={`stage-item ${currentStage >= 3 ? (currentStage > 3 ? 'done' : 'active') : ''}`}>
            <div className="stage-dot"></div>
            <div className="stage-label">3. Lace Signing</div>
          </div>
          <div className={`stage-item ${currentStage === 4 ? (stageStatus.state === 'success' || stageStatus.state === 'verified_simulation' ? 'done' : 'active') : ''}`}>
            <div className="stage-dot"></div>
            <div className="stage-label">4. Confirmed</div>
          </div>
        </div>

        {/* Real Detailed Execution Lifecycle Output */}
        {currentStage > 0 && stageStatus.details && (
          <div className="circuit-outcome-box" style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{
                color: stageStatus.state === 'success' ? '#7be08a' : '#FFB238',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                {stageStatus.state === 'success' ? '✓ Confirmed on Preprod' : '◐ Verified ZK Execution'}
              </span>
              <span style={{
                background: stageStatus.state === 'success' ? 'rgba(123, 224, 138, 0.15)' : 'rgba(255, 178, 56, 0.15)',
                color: stageStatus.state === 'success' ? '#7be08a' : '#FFB238',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                border: `1px solid ${stageStatus.state === 'success' ? '#7be08a' : '#FFB238'}`
              }}>
                {stageStatus.details.mode}
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.8rem', lineHeight: 1.4 }}>
              {stageStatus.message}
            </p>

            <div style={{ color: 'var(--text-muted)', lineHeight: 1.5, fontSize: '0.78rem' }}>
              <p><strong>Circuit:</strong> {stageStatus.details.circuit}</p>
              <p><strong>Input Amount:</strong> {stageStatus.details.scaledAmount}</p>
              {stageStatus.details.depositId && (
                <p><strong>Nullifier / Deposit ID:</strong> {stageStatus.details.depositId.slice(0, 16)}...</p>
              )}
              {stageStatus.details.recipientCommitment && (
                <p><strong>Shielded Commitment:</strong> {stageStatus.details.recipientCommitment.slice(0, 16)}...</p>
              )}
              
              {stageStatus.details.gasCost && (
                <div style={{ margin: '0.5rem 0', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <p style={{ color: 'var(--text)', fontWeight: 600 }}>Real Compact Gas Metrics:</p>
                  <p>Compute Time: {stageStatus.details.gasCost.computeTime}</p>
                  <p>Read Time: {stageStatus.details.gasCost.readTime}</p>
                  <p>Bytes Written: {stageStatus.details.gasCost.bytesWritten}</p>
                </div>
              )}

              {stageStatus.details.ledgerState && (
                <div style={{ margin: '0.5rem 0', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <p style={{ color: 'var(--text)', fontWeight: 600 }}>Ledger Invariants:</p>
                  <p>Custody TVL: {stageStatus.details.ledgerState.tvl}</p>
                  <p>Processed Claims: {stageStatus.details.ledgerState.totalDeposits}</p>
                  <p>Total Unlocked: {stageStatus.details.ledgerState.totalWithdrawn}</p>
                </div>
              )}

              {stageStatus.details.diagnosticNotice && (
                <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255,107,53,0.1)', borderLeft: '3px solid var(--moon)', color: '#FFB238' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Lifecycle Diagnostic Notice:</p>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.73rem', lineHeight: 1.4 }}>
                    {stageStatus.details.diagnosticNotice.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button className="btn btn-ghost" onClick={handleReset} style={{ marginTop: '0.75rem', width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}>
              New Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bridge;
