import React from 'react';

export default function TermsOfService() {
  return (
    <div style={{ padding: '60px 24px 100px', background: 'var(--color-ivory)' }}>
      <div className="section-container" style={{ maxWidth: '860px', background: 'white', padding: '48px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
        <span className="badge-pill badge-terracotta" style={{ marginBottom: '12px' }}>
          Clinical Terms & Conditions
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-plum)' }}>
          PreggiMum Telehealth Terms of Service
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '32px' }}>
          Last Updated: March 2026 • Governing Law: Federal Republic of Nigeria
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>1. Scope of Digital Maternal Guidance</h3>
            <p>
              PreggiMum operates a digital health platform connecting women with licensed Nigerian healthcare practitioners. PreggiMum provides clinical education, second opinions, antenatal test review, birth planning, lactation counseling, and non-emergency triage.
            </p>
          </section>

          <section style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#9F1239' }}>2. Emergency Disclaimer & Limitations</h3>
            <p style={{ color: '#881337' }}>
              <strong>PREGGIMUM IS NOT AN EMERGENCY TRAUMA SERVICE OR SUBSTITUTE FOR PHYSICAL HOSPITAL ADMISSION.</strong> If you experience active vaginal bleeding, fluid rupture, severe persistent headache, chest pain, or cessation of fetal movement, you must immediately report to the nearest physical maternity hospital emergency unit or contact the national emergency number (112).
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>3. Informed Telehealth Consent</h3>
            <p>
              By scheduling a consultation, you understand and acknowledge that remote telehealth evaluations carry inherent limitations compared to physical abdominal palpation, internal pelvic examination, or hospital electronic fetal heart monitoring (cardiotocography). You consent to receive remote clinical coaching within these boundaries.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>4. Clinician Qualifications</h3>
            <p>
              All clinicians practicing on the PreggiMum platform are independently registered with the Medical and Dental Council of Nigeria (MDCN) or the Nursing and Midwifery Council of Nigeria (NMCN). Practitioners exercise independent clinical judgment and adhere to Nigerian clinical practice standards.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>5. Fees, Rescheduling & Cancellations</h3>
            <p>
              Consultation fees are quoted in Nigerian Naira (NGN) transparently before appointment confirmation. Patients may reschedule appointments up to 2 hours prior to the booked time without penalty by contacting the WhatsApp coordination desk.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
