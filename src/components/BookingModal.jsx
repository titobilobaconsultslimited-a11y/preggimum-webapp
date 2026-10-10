import React, { useState } from 'react';
import { api } from '../services/api';

export default function BookingModal({ isOpen, onClose, preselectedService, preselectedClinician, onBookingSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Booking Form State
  const [service, setService] = useState(preselectedService || null);
  const [clinician, setClinician] = useState(preselectedClinician || null);
  const [hasEmergencySymptoms, setHasEmergencySymptoms] = useState(false);
  const [emergencyAcknowledged, setEmergencyAcknowledged] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [startTime, setStartTime] = useState('10:00 AM');
  const [consultationMethod, setConsultationMethod] = useState('video');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [gestationalWeek, setGestationalWeek] = useState('');
  const [reason, setReason] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Available services list
  const servicesList = [
    { id: 's1', name: 'General Pregnancy & Symptoms Review', price: 3000, duration: '30 mins', icon: '🤰', desc: 'Questions about trimester symptoms, bodily adjustments, and what to expect.' },
    { id: 's2', name: 'Antenatal Test & Scan Interpretation', price: 3500, duration: '30 mins', icon: '📋', desc: 'Detailed explanation of your hospital blood work, scans, and doctor notes.' },
    { id: 's3', name: 'Pregnancy Nutrition & Meal Planning', price: 3000, duration: '30 mins', icon: '🥗', desc: 'Personalized meal plans using nutritious Nigerian ingredients (ugwu, eggs, beans).' },
    { id: 's4', name: 'Labour & Delivery Preparation', price: 4000, duration: '45 mins', icon: '🏥', desc: 'Birth plan checklist, pain relief options, partner coaching, and hospital bag prep.' },
    { id: 's5', name: 'Postpartum Recovery & Wound Care', price: 4000, duration: '30 mins', icon: '💗', desc: 'Healing after vaginal or c-section delivery, lochia bleeding monitoring, and recovery.' },
    { id: 's6', name: 'Breastfeeding & Lactation Counseling', price: 3000, duration: '30 mins', icon: '🤱', desc: 'Latching techniques, milk production, sore nipples, and weaning advice.' }
  ];

  // Available clinicians list
  const cliniciansList = [
    { id: 'c1', name: 'Dr. Ayoade Williams', title: 'Consultant Obstetrician', body: 'MDCN/58910', exp: '14+ yrs', photo: '/dr-ayo.png' },
    { id: 'c2', name: 'Dr. Ngozi Eze', title: 'Obstetrician & Gynaecologist', body: 'MDCN/64821', exp: '12+ yrs', photo: '/clinician-nurse.jpg' },
    { id: 'c3', name: 'Nurse Folashade Adeleke', title: 'Certified Nurse-Midwife & IBCLC', body: 'NMCN/RN/99204', exp: '9+ yrs', photo: '/clinician-nurse.jpg' },
    { id: 'c4', name: 'Dr. Amina Bello', title: 'Maternal Health Physician', body: 'MDCN/71339', exp: '10+ yrs', photo: '/clinician-nurse.jpg' }
  ];

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'];

  if (!isOpen) return null;

  const currentPrice = service?.price || 3000;

  const handleNext = (e) => {
    e?.preventDefault();
    setErrorMsg('');

    if (step === 1 && !service) {
      setErrorMsg('Please select a care topic to proceed.');
      return;
    }
    if (step === 2 && !clinician) {
      setErrorMsg('Please select a healthcare provider to proceed.');
      return;
    }
    if (step === 3 && hasEmergencySymptoms) {
      setErrorMsg('You have indicated emergency warning signs. Please do not book a scheduled telehealth call; seek immediate in-person emergency hospital care.');
      return;
    }
    if (step === 3 && !emergencyAcknowledged) {
      setErrorMsg('Please acknowledge that you understand telehealth is not for emergency obstetric complications.');
      return;
    }
    if (step === 4 && (!patientName || !patientPhone || !patientEmail)) {
      setErrorMsg('Please provide your name, phone number, and email.');
      return;
    }
    if (step === 5 && !consentAccepted) {
      setErrorMsg('Please accept the informed telehealth consent and privacy terms to complete booking.');
      return;
    }

    if (step === 5) {
      handleSubmitBooking();
      return;
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    setErrorMsg('');
    setStep(Math.max(1, step - 1));
  };

  const handleSubmitBooking = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        service_id: service.id,
        clinician_id: clinician.id,
        appointment_date: appointmentDate,
        start_time: startTime,
        consultation_method: consultationMethod,
        patient_name: patientName,
        patient_phone: patientPhone,
        patient_email: patientEmail,
        gestational_week: gestationalWeek ? parseInt(gestationalWeek) : null,
        reason: reason,
        amount_ngn: currentPrice,
        emergency_acknowledged: true,
        consent_given: true
      };

      const res = await api.createAppointment(payload);
      setConfirmedBooking(res.appointment);
      setStep(6); // Confirmation step
      if (onBookingSuccess) onBookingSuccess(res.appointment);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to finalize consultation booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3>Book Specialist Consultation</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Step {step} of 6 — Certified Clinical Telehealth Guidance
            </span>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn" aria-label="Close dialog">✕</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Progress Indicator */}
          {step < 6 && (
            <div className="booking-progress-bar">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${((step - 1) / 5) * 100}%` }}></div>
              </div>
              {[1, 2, 3, 4, 5].map((s) => (
                <div 
                  key={s} 
                  className={`progress-step-pill ${step === s ? 'active' : step > s ? 'completed' : ''}`}
                >
                  {step > s ? '✓' : s}
                </div>
              ))}
            </div>
          )}

          {errorMsg && (
            <div className="triage-alert-box" style={{ marginBottom: '18px' }}>
              <div className="triage-alert-title">⚠️ Attention Required</div>
              <div className="triage-alert-desc">{errorMsg}</div>
            </div>
          )}

          {/* STEP 1: Select Consultation Category */}
          {step === 1 && (
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>1. What care topic do you need support with?</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                All consultations are conducted with verified Nigerian clinicians and certified midwives.
              </p>

              <div className="option-selector-grid">
                {servicesList.map((s) => (
                  <div
                    key={s.id}
                    className={`option-card-radio ${(service?.id === s.id) ? 'selected' : ''}`}
                    onClick={() => setService(s)}
                    style={{ border: (service?.id === s.id) ? '2px solid var(--color-terracotta)' : '1px solid rgba(51,26,42,0.12)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--color-plum)' }}>{s.name}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-terracotta)', fontWeight: 700 }}>⏱ {s.duration}</span>
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-plum)', flexShrink: 0 }}>
                      ₦{s.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Clinician */}
          {step === 2 && (
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>2. Choose your clinical specialist</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Every practitioner on PreggiMum is verified with the Medical and Dental Council of Nigeria (MDCN) or NMCN.
              </p>

              <div className="option-selector-grid">
                {cliniciansList.map((c) => (
                  <div
                    key={c.id}
                    className={`option-card-radio ${(clinician?.id === c.id) ? 'selected' : ''}`}
                    onClick={() => setClinician(c)}
                    style={{ border: (clinician?.id === c.id) ? '2px solid var(--color-terracotta)' : '1px solid rgba(51,26,42,0.12)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img 
                        src={c.photo} 
                        alt={c.name} 
                        style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--color-plum)' }}>{c.name}</div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>{c.title}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          Reg: <span style={{ fontFamily: 'monospace' }}>{c.body}</span> • {c.exp} practice
                        </div>
                      </div>
                    </div>
                    <span className="badge-pill badge-sage">Verified ✓</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Clinical Safety & Emergency Triage Check */}
          {step === 3 && (
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>3. Clinical Safety & Triage Screening</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Patient safety is our highest priority. Telehealth appointments cannot safely manage emergency obstetric complications.
              </p>

              <div className="triage-alert-box">
                <div className="triage-alert-title">🚨 Danger Signs Screener</div>
                <div className="triage-alert-desc" style={{ marginBottom: '12px' }}>
                  Are you currently experiencing any of the following symptoms right now?
                </div>
                <ul style={{ fontSize: '0.84rem', color: '#7F1D1D', paddingLeft: '20px', lineHeight: '1.6', marginBottom: '14px' }}>
                  <li>Heavy vaginal bleeding or continuous spotting</li>
                  <li>Sudden gush or continuous leaking of fluid (water breaking)</li>
                  <li>Severe persistent headache not relieved by paracetamol</li>
                  <li>Sudden blurred vision, double vision, or flashing lights</li>
                  <li>Severe sharp pain in your upper abdomen / under ribs</li>
                  <li>High fever, chills, or difficulty breathing</li>
                  <li>Significant reduction or absence of baby movement (after 28 weeks)</li>
                </ul>

                <div style={{ display: 'flex', gap: '16px', background: 'white', padding: '12px', borderRadius: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                    <input 
                      type="radio" 
                      name="emergencyCheck" 
                      checked={hasEmergencySymptoms === true}
                      onChange={() => setHasEmergencySymptoms(true)} 
                    />
                    Yes, I have one or more of these symptoms
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                    <input 
                      type="radio" 
                      name="emergencyCheck" 
                      checked={hasEmergencySymptoms === false}
                      onChange={() => setHasEmergencySymptoms(false)} 
                    />
                    No, I do NOT have these warning signs
                  </label>
                </div>
              </div>

              {hasEmergencySymptoms ? (
                <div style={{ background: '#FEE2E2', border: '2px solid #EF4444', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <h5 style={{ color: '#991B1B', fontSize: '1.05rem', marginBottom: '6px' }}>DO NOT PROCEED WITH TELEHEALTH</h5>
                  <p style={{ fontSize: '0.88rem', color: '#7F1D1D', marginBottom: '14px' }}>
                    Your symptoms require immediate physical hospital examination and monitoring. Please go to the nearest maternity hospital or emergency triage room immediately.
                  </p>
                  <a href="tel:112" className="btn-primary" style={{ background: '#DC2626' }}>
                    📞 Dial Emergency Line (112)
                  </a>
                </div>
              ) : (
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.86rem' }}>
                    <input 
                      type="checkbox" 
                      checked={emergencyAcknowledged} 
                      onChange={(e) => setEmergencyAcknowledged(e.target.checked)} 
                      style={{ marginTop: '3px' }}
                    />
                    <span>
                      I understand that PreggiMum telehealth consultations are for clinical guidance, education, and non-emergency advice, and do NOT replace in-person hospital delivery or emergency care.
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Date, Time & Contact Info */}
          {step === 4 && (
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>4. Schedule & Patient Information</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Select your preferred consultation time and provide your contact coordinates.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-field">
                  <label className="form-label">Preferred Date *</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={appointmentDate} 
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setAppointmentDate(e.target.value)} 
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Consultation Mode *</label>
                  <select 
                    className="form-select" 
                    value={consultationMethod} 
                    onChange={(e) => setConsultationMethod(e.target.value)}
                  >
                    <option value="video">Secure HD Video Call</option>
                    <option value="phone">Private Telephone Call</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Available Time Slot *</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {timeSlots.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setStartTime(time)}
                      className={`badge-pill ${startTime === time ? 'badge-terracotta' : 'badge-plum'}`}
                      style={{ padding: '8px 14px', fontSize: '0.82rem', cursor: 'pointer', border: 'none' }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-field">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Amina Adeleke"
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)} 
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="e.g. 0803 123 4567"
                    value={patientPhone} 
                    onChange={(e) => setPatientPhone(e.target.value)} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                <div className="form-field">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="amina@example.com"
                    value={patientEmail} 
                    onChange={(e) => setPatientEmail(e.target.value)} 
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Gestational Week / Stage</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="e.g. 24 weeks"
                    value={gestationalWeek} 
                    onChange={(e) => setGestationalWeek(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Primary Questions or Concerns for Clinician</label>
                <textarea 
                  className="form-textarea" 
                  rows="3" 
                  placeholder="Tell us what you'd like guidance on (e.g. ultrasound report findings, iron supplements, back pain, birth plan)..."
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 5: Pricing Breakdown & Informed Consent */}
          {step === 5 && (
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>5. Summary & Consent Agreement</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Transparent pricing with no hidden charges. Review your appointment details below.
              </p>

              <div className="booking-summary-box">
                <div className="summary-row">
                  <span>Care Topic:</span>
                  <strong>{service?.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Clinician:</span>
                  <strong>{clinician?.name} ({clinician?.title})</strong>
                </div>
                <div className="summary-row">
                  <span>Date & Time:</span>
                  <strong>{appointmentDate} at {startTime}</strong>
                </div>
                <div className="summary-row">
                  <span>Format:</span>
                  <strong style={{ textTransform: 'capitalize' }}>{consultationMethod} Consultation</strong>
                </div>
                <div className="summary-row">
                  <span>Patient:</span>
                  <strong>{patientName} ({patientPhone})</strong>
                </div>
                <div className="summary-row total">
                  <span>Total Consultation Fee:</span>
                  <span style={{ color: 'var(--color-terracotta)' }}>₦{currentPrice.toLocaleString()} NGN</span>
                </div>
              </div>

              <div style={{ background: 'var(--color-ivory-light)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', marginBottom: '18px' }}>
                <h5 style={{ fontSize: '0.92rem', marginBottom: '8px', color: 'var(--color-plum)' }}>
                  🔒 Telehealth Consent & Confidentiality (NDPR Compliant)
                </h5>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '12px' }}>
                  By confirming, you authorize PreggiMum to schedule this clinical session. Your health data is encrypted and handled strictly in accordance with Nigeria Data Protection Regulation (NDPR) guidelines. Consultations are confidential between you and your licensed healthcare provider.
                </p>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
                  <input 
                    type="checkbox" 
                    checked={consentAccepted} 
                    onChange={(e) => setConsentAccepted(e.target.checked)} 
                    style={{ marginTop: '3px' }}
                  />
                  <span>I give informed consent for telehealth guidance and agree to PreggiMum's privacy terms.</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation Receipt */}
          {step === 6 && confirmedBooking && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-sage-light)', color: 'var(--color-sage)', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                ✓
              </div>
              <h4 style={{ fontSize: '1.5rem', color: 'var(--color-plum)', marginBottom: '8px' }}>
                Consultation Confirmed!
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Your appointment request has been recorded with our clinical coordination desk.
              </p>

              <div style={{ background: 'var(--color-ivory)', borderRadius: '14px', padding: '20px', textAlign: 'left', marginBottom: '24px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(51,26,42,0.1)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Appointment Reference:</span>
                  <strong style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--color-terracotta)' }}>
                    {confirmedBooking.reference}
                  </strong>
                </div>
                <div className="summary-row">
                  <span>Care Pathway:</span>
                  <strong>{service?.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Assigned Clinician:</span>
                  <strong>{clinician?.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Date & Time:</span>
                  <strong>{appointmentDate} at {startTime}</strong>
                </div>
                <div className="summary-row">
                  <span>Status:</span>
                  <span className="badge-pill badge-sage">Confirmed</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href={`https://wa.me/2348030000000?text=Hello%20PreggiMum%20Team%2C%20I%20have%20booked%20appointment%20ref%3A%20${confirmedBooking.reference}%20for%20${encodeURIComponent(patientName)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Send Booking to WhatsApp Desk
                </a>
                <button type="button" onClick={onClose} className="btn-secondary">
                  Done & Close
                </button>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          {step < 6 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              {step > 1 ? (
                <button type="button" onClick={handleBack} className="btn-secondary" disabled={loading}>
                  ← Back
                </button>
              ) : <div></div>}

              <button 
                type="button" 
                onClick={handleNext} 
                className="btn-primary" 
                disabled={loading || (step === 3 && hasEmergencySymptoms)}
              >
                {loading ? 'Confirming...' : step === 5 ? 'Confirm & Reserve' : 'Continue →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
