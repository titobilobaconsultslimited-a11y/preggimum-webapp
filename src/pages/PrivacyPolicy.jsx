import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: '60px 24px 100px', background: 'var(--color-ivory)' }}>
      <div className="section-container" style={{ maxWidth: '860px', background: 'white', padding: '48px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
        <span className="badge-pill badge-sage" style={{ marginBottom: '12px' }}>
          NDPR & Global Standards
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-plum)' }}>
          PreggiMum Privacy & Data Policy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '32px' }}>
          Last Updated: March 2026 • Nigeria Data Protection Act (NDPA) & NDPR Compliant
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>1. Commitment to Health Data Privacy</h3>
            <p>
              PreggiMum Health Technologies Ltd. ("PreggiMum", "we", "our") is dedicated to protecting the sensitive personal and health information of expectant mothers, patients, and healthcare professionals. Maternal health data is treated as special category sensitive personal data under Nigerian law.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>2. Information We Collect</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Contact Information:</strong> Full name, WhatsApp phone number, email address, and residential city.</li>
              <li><strong>Clinical Telehealth Data:</strong> Gestational age/week, clinical questions, scan summaries, self-reported symptoms, and consultation clinical summaries.</li>
              <li><strong>Technical Identifiers:</strong> Session logs, device metadata, and access timestamps for security auditing.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>3. Purpose of Processing</h3>
            <p>
              We process your maternal information exclusively to coordinate telehealth appointments with verified MDCN/NMCN clinicians, verify clinical eligibility, provide personalized guidance, and ensure safety triage. We do not sell or monetize patient data to third-party advertisers.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>4. Clinical Confidentiality</h3>
            <p>
              All consultations conducted over PreggiMum are confidential medical communications between you and your licensed healthcare provider. Clinicians are bound by statutory doctor-patient and nurse-patient confidentiality obligations under the Medical and Dental Practitioners Act and the Nursing and Midwifery Act.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-plum)' }}>5. Data Subject Rights & Contact</h3>
            <p>
              Under the Nigeria Data Protection Act, you maintain the right to access, rectify, or request deletion of your health records. For data protection inquiries or to request your record file, contact our Data Protection Officer at: <a href="mailto:privacy@preggimum.com" style={{ color: 'var(--color-terracotta)', fontWeight: 700 }}>privacy@preggimum.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
