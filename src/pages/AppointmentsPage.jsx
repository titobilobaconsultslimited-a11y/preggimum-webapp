import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function AppointmentsPage({ onOpenBooking }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const list = await api.getAppointments();
        setAppointments(list);
      } catch (err) {
        console.error('Failed to load appointments', err);
      } finally {
        setLoading(false);
      }
    }
    loadAppointments();
  }, []);

  return (
    <div className="appointments-page" style={{ paddingTop: '20px' }}>
      <section style={{ background: 'linear-gradient(180deg, #FDFBF8 0%, #F5EDE6 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <span className="badge-pill badge-sage" style={{ marginBottom: '12px' }}>
            Patient Portal
          </span>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--color-plum)' }}>
            My Consultations & Care Plans
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            View your upcoming maternal consultations, reference numbers, and clinical guidance records.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 24px 80px', background: 'var(--color-ivory)' }}>
        <div className="section-container" style={{ maxWidth: '920px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Loading your appointments...
            </div>
          ) : appointments.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '24px', padding: '60px 32px', textAlign: 'center', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🗓️</div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--color-plum)', marginBottom: '10px' }}>
                No Consultations Booked Yet
              </h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                You have not scheduled any appointments. Connect with our certified Nigerian midwives and doctors to review your symptoms or test results.
              </p>
              <button 
                type="button" 
                onClick={() => onOpenBooking()}
                className="btn-primary"
                style={{ padding: '14px 32px' }}
              >
                Book Your First Consultation →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-plum)' }}>
                  Active Appointments ({appointments.length})
                </h3>
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="btn-book-nav"
                >
                  + Book Another Session
                </button>
              </div>

              {appointments.map((apt) => (
                <div 
                  key={apt.id || apt.reference}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '28px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                    <div>
                      <span className="badge-pill badge-terracotta" style={{ marginBottom: '6px' }}>
                        Ref: {apt.reference}
                      </span>
                      <h4 style={{ fontSize: '1.3rem', color: 'var(--color-plum)' }}>
                        {apt.service_name || 'Maternal Clinical Guidance'}
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Assigned Clinician: <strong>{apt.clinician_name || 'Dr. Ayoade Williams'}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="badge-pill badge-sage" style={{ textTransform: 'capitalize' }}>
                        {apt.status || 'Confirmed'}
                      </span>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
                        Payment: {apt.payment_status === 'paid' ? 'Paid ✓' : 'Pay at session / Pending'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: 'var(--color-ivory)', padding: '16px', borderRadius: '12px', fontSize: '0.9rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Date & Time</span>
                      <strong>{apt.appointment_date} at {apt.start_time}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Consultation Method</span>
                      <strong style={{ textTransform: 'capitalize' }}>{apt.consultation_method || 'Video Call'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Patient Name</span>
                      <strong>{apt.patient_name}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Fee</span>
                      <strong style={{ color: 'var(--color-terracotta)' }}>₦{(apt.total_ngn || 3000).toLocaleString()} NGN</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                      href={`https://wa.me/2348030000000?text=Hello%20PreggiMum%20Desk%2C%20following%20up%20on%20appointment%20ref%3A%20${apt.reference}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp"
                      style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                    >
                      WhatsApp Desk for this Session
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
