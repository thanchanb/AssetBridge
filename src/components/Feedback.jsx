import React, { useState } from 'react';
import { MessageSquarePlus, Send, CheckCircle2 } from 'lucide-react';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    // Simulate sending feedback to backend
    setSubmitted(true);
    setTimeout(() => {
      setFeedback('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="feedback-section container animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="feedback-card glass-panel">
        <div className="feedback-header">
          <MessageSquarePlus className="text-primary" size={28} />
          <h2>Help Us Improve</h2>
          <p>You are one of our first 50 Preprod users! Your feedback directly shapes AssetBridge.</p>
        </div>

        {submitted ? (
          <div className="feedback-success">
            <CheckCircle2 size={48} className="success-icon" />
            <h3>Feedback Received!</h3>
            <p>Thank you for helping us refine the privacy-critical core.</p>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>How was your bridging experience?</label>
              <textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts on speed, privacy, or UI..."
                rows={4}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!feedback.trim()}
            >
              <Send size={18} /> Submit Feedback
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Feedback;
