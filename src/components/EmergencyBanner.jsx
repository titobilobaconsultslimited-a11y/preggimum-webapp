import React from 'react';

export default function EmergencyBanner({ onOpenEmergencyGuide }) {
  return (
    <aside className="emergency-banner" aria-label="Clinical Safety & Emergency Disclaimer">
      <div className="emergency-banner-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="emergency-tag">🚨 Urgent Care Notice</span>
          <span>
            Telehealth is not for emergencies. Experiencing heavy bleeding, severe headache, or sudden fluid leaking?
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            type="button"
            onClick={onOpenEmergencyGuide}
            className="emergency-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', textDecoration: 'underline' }}
          >
            Review Warning Signs →
          </button>
          <a href="tel:112" className="emergency-link" style={{ background: 'rgba(255,255,255,0.25)', padding: '2px 8px', borderRadius: '4px', textDecoration: 'none' }}>
            📞 Dial 112 (Nigeria Emergency)
          </a>
        </div>
      </div>
    </aside>
  );
}
