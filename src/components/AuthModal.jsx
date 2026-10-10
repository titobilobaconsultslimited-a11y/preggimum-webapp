import React, { useState } from 'react';
import { api } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (tab === 'login') {
        const res = await api.login({ email, password });
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      } else {
        const res = await api.register({ email, password, full_name: fullName, phone });
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div>
            <h3>{tab === 'login' ? 'Patient Sign In' : 'Create Patient Account'}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              PreggiMum Maternal Health Portal
            </span>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn" aria-label="Close dialog">✕</button>
        </div>

        <div className="modal-body">
          {/* Tab Selector */}
          <div style={{ display: 'flex', background: 'var(--color-ivory)', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => { setTab('login'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                background: tab === 'login' ? 'white' : 'transparent',
                color: tab === 'login' ? 'var(--color-plum)' : 'var(--text-muted)',
                boxShadow: tab === 'login' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab('register'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                background: tab === 'register' ? 'white' : 'transparent',
                color: tab === 'register' ? 'var(--color-plum)' : 'var(--text-muted)',
                boxShadow: tab === 'register' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              New Patient
            </button>
          </div>

          {errorMsg && (
            <div className="triage-alert-box" style={{ marginBottom: '16px' }}>
              <div className="triage-alert-title">⚠️ Error</div>
              <div className="triage-alert-desc">{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {tab === 'register' && (
              <>
                <div className="form-field">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Amina Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="e.g. 0803 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-field">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="amina@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Password *</label>
              <input
                type="password"
                required
                minLength={8}
                className="form-input"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', marginTop: '10px', padding: '14px' }}
              disabled={loading}
            >
              {loading ? 'Please wait...' : tab === 'login' ? 'Sign In to Portal' : 'Create My Account'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            🔒 256-bit SSL encrypted. NDPR-compliant patient privacy.
          </div>
        </div>
      </div>
    </div>
  );
}
