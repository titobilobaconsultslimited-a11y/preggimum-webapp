import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Doctors({ onOpenBooking }) {
  const [clinicians, setClinicians] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClinicians() {
      try {
        const list = await api.getClinicians();
        setClinicians(list);
      } catch (e) {
        console.error('Failed to load clinicians', e);
      } finally {
        setLoading(false);
      }
    }
    loadClinicians();
  }, []);

  const filteredClinicians = clinicians.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'obgyn') return c.specialty.toLowerCase().includes('obstetric') || c.specialty.toLowerCase().includes('gynaec');
    if (filter === 'midwife') return c.specialty.toLowerCase().includes('midwife') || c.specialty.toLowerCase().includes('lactation');
    if (filter === 'maternal') return c.specialty.toLowerCase().includes('maternal') || c.specialty.toLowerCase().includes('mental');
    return true;
  });

  return (
    <div className="doctors-page" style={{ paddingTop: '20px' }}>
      {/* Page Header */}
      <section style={{ background: 'linear-gradient(180deg, #FDFBF8 0%, #F5EDE6 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <span className="badge-pill badge-terracotta" style={{ marginBottom: '12px' }}>
            Clinical Registry
          </span>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--color-plum)' }}>
            Verified Clinicians & Midwives
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Meet our multidisciplinary team of licensed Nigerian maternal health specialists. Every practitioner undergoes rigorous license verification with the MDCN or NMCN.
          </p>
        </div>
      </section>

      {/* Specialty Filter */}
      <section style={{ padding: '40px 24px 80px', background: 'var(--color-ivory)' }}>
        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`badge-pill ${filter === 'all' ? 'badge-terracotta' : 'badge-plum'}`}
              style={{ padding: '10px 20px', fontSize: '0.9rem', cursor: 'pointer', border: 'none' }}
            >
              All Specialists ({clinicians.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('obgyn')}
              className={`badge-pill ${filter === 'obgyn' ? 'badge-terracotta' : 'badge-plum'}`}
              style={{ padding: '10px 20px', fontSize: '0.9rem', cursor: 'pointer', border: 'none' }}
            >
              Obstetricians & Gynaecologists
            </button>
            <button
              type="button"
              onClick={() => setFilter('midwife')}
              className={`badge-pill ${filter === 'midwife' ? 'badge-terracotta' : 'badge-plum'}`}
              style={{ padding: '10px 20px', fontSize: '0.9rem', cursor: 'pointer', border: 'none' }}
            >
              Certified Midwives & Lactation
            </button>
            <button
              type="button"
              onClick={() => setFilter('maternal')}
              className={`badge-pill ${filter === 'maternal' ? 'badge-terracotta' : 'badge-plum'}`}
              style={{ padding: '10px 20px', fontSize: '0.9rem', cursor: 'pointer', border: 'none' }}
            >
              Maternal Health & Perinatal Wellness
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Loading clinical directory...
            </div>
          ) : (
            <div className="clinicians-grid">
              {filteredClinicians.map((c) => (
                <div key={c.id} className="clinician-card">
                  <div className="clinician-avatar-wrap">
                    <img src={c.photo_url || '/dr-ayo.png'} alt={c.full_name} />
                    <span className="badge-pill badge-sage clinician-badge-float">
                      {c.registration_number || 'MDCN Verified'}
                    </span>
                  </div>

                  <div className="clinician-info">
                    <h3 className="clinician-name">{c.full_name}</h3>
                    <div className="clinician-specialty">{c.specialty}</div>
                    <div className="clinician-quals">{c.qualifications}</div>
                    
                    <p className="clinician-bio">{c.bio}</p>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '16px' }}>
                      🗣 Languages: <strong>{c.languages || 'English'}</strong>
                    </div>

                    <div className="clinician-footer">
                      <button
                        type="button"
                        onClick={() => onOpenBooking(null, {
                          id: c.id,
                          name: c.full_name,
                          title: c.title,
                          body: c.registration_number,
                          exp: 'Verified',
                          photo: c.photo_url || '/dr-ayo.png'
                        })}
                        className="btn-primary"
                        style={{ width: '100%', padding: '11px', fontSize: '0.9rem' }}
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clinical Verification Guarantee Card */}
          <div style={{ marginTop: '60px', background: 'white', borderRadius: '20px', padding: '36px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3rem' }}>🛡️</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '6px', color: 'var(--color-plum)' }}>
                Our 100% Clinical Credential Verification Standard
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Every doctor and nurse-midwife on PreggiMum is verified directly against active registration rolls with the Medical and Dental Council of Nigeria (MDCN) or the Nursing and Midwifery Council of Nigeria (NMCN). We do not accept unverified practitioners.
              </p>
            </div>
            <a 
              href="https://wa.me/2348030000000?text=Hello%20PreggiMum%20Clinical%20Coordinator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Ask Clinical Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
