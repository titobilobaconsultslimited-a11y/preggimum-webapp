import React from 'react';

export default function EmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const dangerSigns = [
    {
      title: 'Vaginal Bleeding or Spotting',
      desc: 'Any bleeding during pregnancy is abnormal. It may indicate miscarriage in early pregnancy or placental complications (abruption / praevia) in late pregnancy.',
      action: 'Urgent hospital evaluation required immediately.'
    },
    {
      title: 'Severe Persistent Headache & Vision Changes',
      desc: 'Intense throbbing headache not relieved by mild analgesia, flashing lights, dark spots, or blurred vision are primary red flags for Pre-eclampsia.',
      action: 'Check blood pressure immediately at the nearest clinic.'
    },
    {
      title: 'Sudden Gush or Leaking of Fluid (Water Breaking)',
      desc: 'Premature rupture of amniotic membranes can expose baby to infection or umbilical cord prolapse.',
      action: 'Go to your delivery hospital without delay.'
    },
    {
      title: 'Severe Upper Abdominal / Epigastric Pain',
      desc: 'Sharp, persistent pain just below the ribs (especially on the right side) is a critical warning sign of impending severe pre-eclampsia or HELLP syndrome.',
      action: 'Immediate physical emergency triage required.'
    },
    {
      title: 'Reduced or Absent Fetal Movements',
      desc: 'After 28 weeks, noticeable reduction in baby’s daily kick counts after eating or lying on your left side requires urgent electronic fetal monitoring.',
      action: 'Visit your maternity hospital for immediate CTG scan.'
    },
    {
      title: 'High Fever, Chills, or Foul-Smelling Discharge',
      desc: 'Can indicate maternal sepsis, chorioamnionitis, or malaria in pregnancy.',
      action: 'Immediate physician assessment and blood testing.'
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div className="modal-header" style={{ background: '#FFF1F2', borderBottomColor: '#FECDD3' }}>
          <div>
            <h3 style={{ color: '#9F1239', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🚨 Emergency Warning Signs in Pregnancy
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#881337' }}>
              Clinical Triage Reference for Expectant Mothers & Families
            </span>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn" aria-label="Close emergency modal">✕</button>
        </div>

        <div className="modal-body">
          <div style={{ background: '#FFE4E6', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #FDA4AF' }}>
            <strong style={{ color: '#9F1239', fontSize: '0.94rem' }}>
              Important Safety Directive:
            </strong>
            <p style={{ color: '#881337', fontSize: '0.86rem', marginTop: '4px', lineHeight: '1.5' }}>
              If you or your loved one experiences ANY of the following symptoms, <strong>do not wait for an online appointment</strong>. Go directly to the nearest maternity hospital emergency room or dial emergency services.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {dangerSigns.map((sign, index) => (
              <div key={index} style={{ background: 'var(--color-ivory)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--color-plum)', marginBottom: '4px' }}>
                  {index + 1}. {sign.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', lineHeight: '1.5' }}>
                  {sign.desc}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626' }}>
                  Action: {sign.action}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:112" className="btn-primary" style={{ background: '#DC2626' }}>
              📞 Dial 112 (Emergency Hotline)
            </a>
            <a 
              href="https://wa.me/2348030000000?text=URGENT%20CLINICAL%20ASSISTANCE%20NEEDED" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              💬 WhatsApp Emergency Desk
            </a>
            <button type="button" onClick={onClose} className="btn-secondary">
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
