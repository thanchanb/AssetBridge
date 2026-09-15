import React, { useState } from 'react';
import { MessageSquarePlus, Send, CheckCircle2 } from 'lucide-react';
import './Feedback.css';

const Feedback = () => {
  const [testerId, setTesterId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [functionality, setFunctionality] = useState('Asset Shielding');
  const [whatWorked, setWhatWorked] = useState('');
  const [whatConfusing, setWhatConfusing] = useState('');
  const [whatImprove, setWhatImprove] = useState('');
  const [rating, setRating] = useState(5);
  const [alias, setAlias] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!walletAddress.trim()) {
      alert('Please provide your Midnight Preprod Wallet Address for Level 5 evidence verification.');
      return;
    }
    
    const assignedId = testerId.trim() || `AB-${Math.floor(Math.random() * 900 + 100)}`;
    setSubmittedId(assignedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setTesterId('');
    setWalletAddress('');
    setWhatWorked('');
    setWhatConfusing('');
    setWhatImprove('');
    setRating(5);
    setAlias('');
    setSubmitted(false);
  };

  return (
    <section id="feedback" className="feedback-section container animate-fade-in" style={{ animationDelay: '0.5s', marginTop: '3rem' }}>
      <div className="feedback-card glass-panel">
        <div className="feedback-header">
          <MessageSquarePlus className="text-primary" size={28} />
          <h2>Midnight Level 5 Tester Feedback</h2>
          <p>Submit your genuine testing feedback and Midnight Preprod wallet address for Level 5 verification.</p>
        </div>

        {submitted ? (
          <div className="feedback-success" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={56} className="success-icon" style={{ color: '#22c55e', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#f3f4f6' }}>Feedback & Evidence Logged!</h3>
            <p style={{ margin: '0.75rem 0', color: '#9ca3af' }}>
              Your response has been assigned Tester ID: <strong style={{ color: '#6366f1' }}>{submittedId}</strong>
            </p>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '8px', margin: '1rem 0', textAlign: 'left', fontSize: '0.9rem' }}>
              <p><strong>Wallet:</strong> {walletAddress}</p>
              <p><strong>Functionality:</strong> {functionality}</p>
              <p><strong>Rating:</strong> {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</p>
            </div>
            <button className="btn btn-outline" onClick={handleReset} style={{ marginTop: '0.5rem' }}>
              Submit Another Response
            </button>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div className="input-group">
                <label>Tester ID (e.g. AB-001):</label>
                <input 
                  type="text" 
                  value={testerId} 
                  onChange={(e) => setTesterId(e.target.value)} 
                  placeholder="e.g. AB-001 (Optional - auto-generated if blank)"
                />
              </div>

              <div className="input-group">
                <label>Midnight Preprod Wallet Address <span style={{ color: '#ef4444' }}>*</span>:</label>
                <input 
                  type="text" 
                  value={walletAddress} 
                  onChange={(e) => setWalletAddress(e.target.value)} 
                  placeholder="mn_preprod... or Lace address"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div className="input-group">
                <label>Functionality Tested:</label>
                <select 
                  value={functionality} 
                  onChange={(e) => setFunctionality(e.target.value)}
                  style={{ background: 'rgba(15, 23, 42, 0.8)', color: '#f3f4f6', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', width: '100%' }}
                >
                  <option value="Asset Shielding">Asset Shielding (Compact ZK)</option>
                  <option value="Wallet Connection">Lace Wallet Connection</option>
                  <option value="Proof Progress Loader">Proof Progress State Machine</option>
                  <option value="UI Layout & Design">UI Layout & Mobile Responsiveness</option>
                  <option value="Other">Other / General</option>
                </select>
              </div>

              <div className="input-group">
                <label>Name / Identifier Alias (Optional):</label>
                <input 
                  type="text" 
                  value={alias} 
                  onChange={(e) => setAlias(e.target.value)} 
                  placeholder="Privacy alias (e.g. Tester A)"
                />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label>Overall Product Rating:</label>
              <div className="star-rating" style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer', margin: '0.5rem 0' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    onClick={() => setRating(star)}
                    style={{ fontSize: '1.6rem', color: star <= rating ? '#eab308' : '#4b5563' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label>What Worked Well?</label>
              <textarea 
                value={whatWorked}
                onChange={(e) => setWhatWorked(e.target.value)}
                placeholder="Describe positive experiences or features that worked smoothly..."
                rows={2}
              ></textarea>
            </div>

            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label>What Was Confusing or Difficult?</label>
              <textarea 
                value={whatConfusing}
                onChange={(e) => setWhatConfusing(e.target.value)}
                placeholder="Friction points, unclear messages, latency concerns..."
                rows={2}
              ></textarea>
            </div>

            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label>What Should Be Improved?</label>
              <textarea 
                value={whatImprove}
                onChange={(e) => setWhatImprove(e.target.value)}
                placeholder="Suggestions for fixes, UI tweaks, or additional capabilities..."
                rows={2}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                <Send size={18} /> Submit Feedback & Log Evidence
              </button>

              <a 
                href="https://github.com/thanchanb/AssetBridge/blob/main/docs/TESTER_ONBOARDING.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                📖 Tester Onboarding Guide
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Feedback;
