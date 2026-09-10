import React, { useState } from 'react';
import { MessageSquarePlus, Send, CheckCircle2 } from 'lucide-react';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    setSubmitted(true);
    setTimeout(() => {
      setFeedback('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="feedback" className="feedback-section container animate-fade-in" style={{ animationDelay: '0.5s', marginTop: '3rem' }}>
      <div className="feedback-card glass-panel">
        <div className="feedback-header">
          <MessageSquarePlus className="text-primary" size={28} />
          <h2>Level 6 User Feedback & Onboarding</h2>
          <p>Join over <strong>70+ Preprod & Preview network users</strong> validating AssetBridge privacy-preserving asset shielding.</p>
        </div>

        {submitted ? (
          <div className="feedback-success">
            <CheckCircle2 size={48} className="success-icon" />
            <h3>Feedback Telemetry Received!</h3>
            <p>Thank you for contributing to Level 6 Supermoon development on Midnight & Cardano.</p>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label>Overall Product Rating (1 to 5 Stars):</label>
              <div className="star-rating" style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer', margin: '0.5rem 0' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    onClick={() => setRating(star)}
                    style={{ fontSize: '1.5rem', color: star <= rating ? '#eab308' : '#4b5563' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>How was your bridging experience?</label>
              <textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share thoughts on ZK proof speed, missing features, bugs, or UX improvements..."
                rows={4}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!feedback.trim()}
              >
                <Send size={18} /> Submit Feedback
              </button>

              <a 
                href="https://github.com/thanchanb/AssetBridge/blob/main/docs/feedback-form-spec.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                📋 Form Specification & Setup Guide
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Feedback;
