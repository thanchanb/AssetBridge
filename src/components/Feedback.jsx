import React, { useState, useRef } from 'react';
import { Send, CheckCircle2, Shield, Sparkles, BookOpen } from 'lucide-react';
import Feedback3DCanvas from './Feedback3DCanvas';
import './Feedback.css';

const RATING_DESCRIPTORS = {
  1: 'Level 1 — Needs Critical Fixes',
  2: 'Level 2 — Substantial Friction',
  3: 'Level 3 — Functional Baseline',
  4: 'Level 4 — Solid Experience',
  5: 'Level 5 — Exceptional & Production-Ready'
};

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
  const [hoverRating, setHoverRating] = useState(0);

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `rotateY(${px * 5}deg) rotateX(${-py * 5}deg) translateZ(0)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

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

  const activeRatingDisplay = hoverRating || rating;

  return (
    <section id="feedback" className="feedback-section container animate-fade-in" style={{ animationDelay: '0.5s', marginTop: '4rem' }}>
      <div 
        className="feedback-card-wrapper" 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1200px', width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <div className="feedback-card glass-panel-3d" ref={cardRef}>
          {/* Top Holographic ZK Glow Line */}
          <div className="card-hologram-line"></div>

          {/* 3D Header Grid with Interactive Crystal Canvas */}
          <div className="feedback-header-3d">
            <div className="header-text-col">
              <div className="feedback-badge">
                <Sparkles size={14} className="badge-sparkle" />
                <span>Midnight Level 5 Verification Portal</span>
              </div>
              <h2>Testing Feedback & Evidence</h2>
              <p>
                Submit your genuine testing observations and Midnight Preprod wallet address for Level 5 evidence logging.
              </p>
            </div>

            <div className="header-3d-visual">
              <Feedback3DCanvas rating={rating} />
            </div>
          </div>

          {submitted ? (
            <div className="feedback-success-3d">
              <div className="success-halo">
                <CheckCircle2 size={64} className="success-icon" />
              </div>
              <h3>Feedback & Evidence Logged!</h3>
              <p className="assigned-id-text">
                Assigned Tester ID: <strong className="id-highlight">{submittedId}</strong>
              </p>
              
              <div className="evidence-summary-box">
                <div className="summary-row">
                  <span>Midnight Preprod Wallet:</span>
                  <span className="mono-val">{walletAddress}</span>
                </div>
                <div className="summary-row">
                  <span>Tested Scope:</span>
                  <span>{functionality}</span>
                </div>
                {alias && (
                  <div className="summary-row">
                    <span>Tester Alias:</span>
                    <span>{alias}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Product Rating:</span>
                  <span className="stars-val">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
                </div>
              </div>

              <button className="btn btn-ghost reset-btn" onClick={handleReset}>
                Submit Another Feedback Entry
              </button>
            </div>
          ) : (
            <form className="feedback-form-3d" onSubmit={handleSubmit}>
              {/* Row 1: Tester ID & Wallet Address */}
              <div className="form-grid-2">
                <div className="input-group-3d">
                  <label htmlFor="testerId">Tester ID (e.g. AB-001):</label>
                  <input 
                    id="testerId"
                    type="text" 
                    value={testerId} 
                    onChange={(e) => setTesterId(e.target.value)} 
                    placeholder="e.g. AB-001 (Optional - auto-generated if blank)"
                  />
                </div>

                <div className="input-group-3d">
                  <label htmlFor="walletAddress">
                    Midnight Preprod Wallet Address <span className="req-star">*</span>:
                  </label>
                  <div className="input-with-icon">
                    <Shield size={16} className="input-icon" />
                    <input 
                      id="walletAddress"
                      type="text" 
                      value={walletAddress} 
                      onChange={(e) => setWalletAddress(e.target.value)} 
                      placeholder="mn_preprod... or Lace address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Functionality Tested & Alias */}
              <div className="form-grid-2">
                <div className="input-group-3d">
                  <label htmlFor="functionality">Functionality Tested:</label>
                  <select 
                    id="functionality"
                    value={functionality} 
                    onChange={(e) => setFunctionality(e.target.value)}
                  >
                    <option value="Asset Shielding">Asset Shielding (Compact ZK)</option>
                    <option value="Wallet Connection">Lace Wallet Connection</option>
                    <option value="Proof Progress Loader">Proof Progress State Machine</option>
                    <option value="UI Layout & Design">UI Layout & Mobile Responsiveness</option>
                    <option value="Other">Other / General</option>
                  </select>
                </div>

                <div className="input-group-3d">
                  <label htmlFor="alias">Name / Identifier Alias (Optional):</label>
                  <input 
                    id="alias"
                    type="text" 
                    value={alias} 
                    onChange={(e) => setAlias(e.target.value)} 
                    placeholder="Privacy alias (e.g. Tester A)"
                  />
                </div>
              </div>

              {/* Interactive 3D Star Rating */}
              <div className="rating-section-3d">
                <div className="rating-label-row">
                  <label>Overall Product Rating:</label>
                  <span className="rating-descriptor">
                    {RATING_DESCRIPTORS[activeRatingDisplay]}
                  </span>
                </div>
                <div className="star-rating-3d">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star} 
                      className={`star-3d-btn ${star <= activeRatingDisplay ? 'active' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text Areas */}
              <div className="input-group-3d">
                <label htmlFor="whatWorked">What Worked Well?</label>
                <textarea 
                  id="whatWorked"
                  value={whatWorked}
                  onChange={(e) => setWhatWorked(e.target.value)}
                  placeholder="Describe positive experiences or features that worked smoothly..."
                  rows={2}
                ></textarea>
              </div>

              <div className="input-group-3d">
                <label htmlFor="whatConfusing">What Was Confusing or Difficult?</label>
                <textarea 
                  id="whatConfusing"
                  value={whatConfusing}
                  onChange={(e) => setWhatConfusing(e.target.value)}
                  placeholder="Friction points, unclear messages, latency concerns..."
                  rows={2}
                ></textarea>
              </div>

              <div className="input-group-3d">
                <label htmlFor="whatImprove">What Should Be Improved?</label>
                <textarea 
                  id="whatImprove"
                  value={whatImprove}
                  onChange={(e) => setWhatImprove(e.target.value)}
                  placeholder="Suggestions for fixes, UI tweaks, or additional capabilities..."
                  rows={2}
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="form-actions-3d">
                <button 
                  type="submit" 
                  className="proof-btn submit-3d-btn"
                >
                  <Send size={18} /> Submit Feedback & Log Evidence
                </button>

                <a 
                  href="https://github.com/thanchanb/AssetBridge/blob/main/docs/TESTER_ONBOARDING.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost onboarding-guide-link"
                >
                  <BookOpen size={16} /> 📖 Tester Onboarding Guide
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
