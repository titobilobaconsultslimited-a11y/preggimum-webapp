import React, { useState } from 'react';
import { api } from '../services/api';

export default function Contact({ onOpenEmergencyGuide }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Clinical Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await api.sendContact(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Clinical Inquiry', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Unable to submit your message. Please reach out via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page" style={{ paddingTop: '20px' }}>
      {/* Page Header */}
      <section style={{ background: 'linear-gradient(180deg, #FDFBF8 0%, #F5EDE6 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <span className="badge-pill badge-terracotta" style={{ marginBottom: '12px' }}>
            Care Coordination
          </span>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--color-plum)' }}>
            Get in Touch with PreggiMum
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Have questions about booking a consultation, partnership inquiries, or clinical maternal support? Our care coordination desk is ready to help.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '60px 24px 80px', background: 'var(--color-ivory)' }}>
        <div className="section-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
          {/* Contact Details & Channels */}
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--color-plum)' }}>
              Direct Support Channels
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '32px' }}>
              We provide digital maternal health coverage across Nigeria with clinical coordination support based in Lagos and Abuja.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '2rem' }}>💬</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>WhatsApp Care Line</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fastest response for booking assistance</div>
                  <a 
                    href="https://wa.me/2348030000000?text=Hello%20PreggiMum%20Care%20Desk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#128C7E', fontWeight: 700, fontSize: '0.88rem', display: 'inline-block', marginTop: '4px' }}
                  >
                    Chat on WhatsApp (+234 803 000 0000) →
                  </a>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '2rem' }}>✉️</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>Official Support Email</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>care@preggimum.com</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Response within 24 hours</span>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '2rem' }}>📍</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>Operating Locations</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lagos & Abuja, Nigeria</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-sage)', fontWeight: 600 }}>Nationwide digital video consultations</span>
                </div>
              </div>
            </div>

            {/* Emergency Hospital Notice */}
            <div style={{ background: '#FFF1F2', border: '1.5px solid #FECDD3', borderRadius: '16px', padding: '20px' }}>
              <strong style={{ color: '#9F1239', fontSize: '0.95rem' }}>
                🚨 Immediate Obstetric Emergency?
              </strong>
              <p style={{ color: '#881337', fontSize: '0.85rem', marginTop: '6px', lineHeight: '1.5' }}>
                If you are experiencing severe bleeding, intense abdominal pain, or loss of baby movement, please do not use this form. Proceed immediately to your nearest maternity hospital emergency room or dial 112.
              </p>
              <button 
                type="button" 
                onClick={onOpenEmergencyGuide}
                style={{ marginTop: '8px', color: '#9F1239', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                View Emergency Danger Signs Guide →
              </button>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '8px', color: 'var(--color-plum)' }}>
              Send Us a Message
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Our patient care coordination team will review your note and respond promptly.
            </p>

            {submitted ? (
              <div style={{ background: 'var(--color-sage-light)', color: 'var(--color-sage)', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✓</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>Message Received</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Thank you for contacting PreggiMum. A care coordinator will review your inquiry and follow up shortly.
                </p>
                <button 
                  type="button" 
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ marginTop: '16px' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="triage-alert-box" style={{ marginBottom: '16px' }}>
                    <div className="triage-alert-title">⚠️ Error</div>
                    <div className="triage-alert-desc">{errorMsg}</div>
                  </div>
                )}

                <div className="form-field">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    placeholder="e.g. Chioma Nwosu"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-field">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-input"
                      placeholder="chioma@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">WhatsApp Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="0803 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Inquiry Subject *</label>
                  <select
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="General Clinical Inquiry">General Clinical Inquiry</option>
                    <option value="Booking & Scheduling Help">Booking & Scheduling Help</option>
                    <option value="Clinician Credential Question">Clinician Credential Question</option>
                    <option value="Partnership / Health Facility Inquiry">Partnership / Health Facility Inquiry</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">How can our care team support you? *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    className="form-textarea"
                    placeholder="Write your questions or notes here..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px' }}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Send Message to Care Desk →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
