import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ onOpenBooking, onOpenEmergencyGuide }) {
  return (
    <div className="home-page">
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="hero-wrapper" aria-label="Hero Section">
        <div className="hero-container">
          <div className="hero-text-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge-pill badge-terracotta">✨ Dignified Digital Maternal Care</span>
              <span className="badge-pill badge-sage">MDCN & NMCN Certified</span>
            </div>

            <h1 className="hero-title">
              Specialist maternal care, designed for every <span className="highlight">Nigerian mother</span>.
            </h1>

            <p className="hero-lead">
              Get timely, compassionate guidance from verified Nigerian obstetricians, certified midwives, and lactation consultants. From your first positive test to postpartum healing.
            </p>

            <div className="hero-cta-group">
              <button 
                type="button" 
                onClick={() => onOpenBooking()}
                className="btn-primary"
                id="btn-hero-book"
              >
                <span>Book a Consultation</span>
                <span>→</span>
              </button>

              <Link to="/pathways" className="btn-secondary">
                Explore Care Pathways
              </Link>
            </div>

            <div className="hero-trust-bar">
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>100% Licensed Clinicians</span>
              </div>
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Transparent Pricing (₦3,000+)</span>
              </div>
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Confidential & NDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Frame */}
          <div className="hero-visual-frame">
            <div className="hero-image-card">
              <img 
                src="/hero-mother.jpg" 
                alt="Joyful expectant Nigerian mother gently cradling her pregnant belly" 
                className="hero-img"
              />
            </div>

            {/* Floating Clinical Feature Badge */}
            <div className="floating-care-card">
              <div className="care-card-icon">🩺</div>
              <div>
                <div className="care-card-title">Direct Midwife & Doctor Care</div>
                <div className="care-card-subtitle">Video & Telephone Telehealth across Nigeria</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CARE PATHWAYS SECTION
          ============================================================ */}
      <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
        <div className="section-container">
          <div className="section-heading-block">
            <span className="badge-pill badge-terracotta">Structured Maternal Pathways</span>
            <h2>Care for every stage of your journey</h2>
            <p>
              Navigating pregnancy in Nigeria comes with unique questions. Our care pathways provide clear, culturally relevant, clinical guidance every step of the way.
            </p>
          </div>

          <div className="pathways-grid">
            {/* Pathway 1: Pregnancy Care */}
            <div className="pathway-card">
              <div className="pathway-card-media">
                <img src="/hero-mother.jpg" alt="Pregnancy Care Pathway" />
              </div>
              <div className="pathway-body">
                <span className="badge-pill badge-terracotta" style={{ alignSelf: 'flex-start' }}>First & Second Trimester</span>
                <h3>Antenatal Guidance & Wellness</h3>
                <p>
                  Guidance on antenatal visits, ultrasound scan reviews, managing morning sickness, and Nigerian dietary meal planning (ugwu, beans, eggs).
                </p>
                <ul className="pathway-features">
                  <li><span className="bullet">✓</span> Scan & lab test result interpretation</li>
                  <li><span className="bullet">✓</span> Routine antenatal screening roadmap</li>
                  <li><span className="bullet">✓</span> Safe local nutrition & iron/folate guidance</li>
                </ul>
                <button 
                  type="button" 
                  onClick={() => onOpenBooking({ id: 's1', name: 'General Pregnancy & Symptoms Review', price: 3000 })}
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  Book Antenatal Review (₦3,000)
                </button>
              </div>
            </div>

            {/* Pathway 2: Birth Preparation */}
            <div className="pathway-card">
              <div className="pathway-card-media">
                <img src="/clinician-nurse.jpg" alt="Birth Preparation Pathway" />
              </div>
              <div className="pathway-body">
                <span className="badge-pill badge-plum" style={{ alignSelf: 'flex-start' }}>Third Trimester</span>
                <h3>Labour & Delivery Readiness</h3>
                <p>
                  Prepare confidently for labour in Nigerian hospitals. Create your birth plan, pack your maternity hospital bag, and recognize true labour contractions.
                </p>
                <ul className="pathway-features">
                  <li><span className="bullet">✓</span> Nigerian hospital delivery bag checklist</li>
                  <li><span className="bullet">✓</span> Pain relief options & breathing techniques</li>
                  <li><span className="bullet">✓</span> Partner coaching & hospital advocacy</li>
                </ul>
                <button 
                  type="button" 
                  onClick={() => onOpenBooking({ id: 's4', name: 'Labour & Delivery Preparation', price: 4000 })}
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  Book Birth Preparation (₦4,000)
                </button>
              </div>
            </div>

            {/* Pathway 3: Postnatal & Newborn */}
            <div className="pathway-card">
              <div className="pathway-card-media">
                <img src="/postnatal-mother.jpg" alt="Postnatal Care Pathway" />
              </div>
              <div className="pathway-body">
                <span className="badge-pill badge-sage" style={{ alignSelf: 'flex-start' }}>The Fourth Trimester</span>
                <h3>Postnatal Recovery & Lactation</h3>
                <p>
                  Compassionate care for new mothers: perineal and caesarean section wound healing, breastfeeding latch support, and emotional wellness.
                </p>
                <ul className="pathway-features">
                  <li><span className="bullet">✓</span> C-section & vaginal tear healing guidance</li>
                  <li><span className="bullet">✓</span> Certified lactation counseling for latch & supply</li>
                  <li><span className="bullet">✓</span> Screening for postpartum blues & anxiety</li>
                </ul>
                <button 
                  type="button" 
                  onClick={() => onOpenBooking({ id: 's5', name: 'Postpartum Recovery & Wound Care', price: 4000 })}
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  Book Postnatal Session (₦4,000)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW PREGGIMUM WORKS
          ============================================================ */}
      <section className="section-pad" style={{ background: 'var(--color-ivory-light)' }}>
        <div className="section-container">
          <div className="section-heading-block">
            <span className="badge-pill badge-sage">Simple & Transparent</span>
            <h2>How PreggiMum works</h2>
            <p>
              Professional maternal healthcare without the 4-hour clinic queues.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose Care Topic</h3>
              <p>
                Select your specific need—whether pregnancy nutrition, scan reviews, birth plan, or breastfeeding latch support.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Safety Triage & Doctor Choice</h3>
              <p>
                Complete our brief safety screening to rule out acute emergency danger signs, then choose your preferred verified doctor or midwife.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Private Telehealth Call</h3>
              <p>
                Connect over secure HD video or phone at your scheduled time. Receive dedicated 1-on-1 clinical attention and actionable care guidance.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Follow-up & Support</h3>
              <p>
                Receive session summary notes and maintain access to our care coordination desk via WhatsApp for ongoing questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED CLINICIANS
          ============================================================ */}
      <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
        <div className="section-container">
          <div className="section-heading-block">
            <span className="badge-pill badge-terracotta">Licensed Professionals</span>
            <h2>Meet our clinical team</h2>
            <p>
              Every practitioner is verified with the Medical and Dental Council of Nigeria (MDCN) or Nursing and Midwifery Council of Nigeria (NMCN).
            </p>
          </div>

          <div className="clinicians-grid">
            {/* Clinician 1 */}
            <div className="clinician-card">
              <div className="clinician-avatar-wrap">
                <img src="/dr-ayo.png" alt="Dr. Ayoade Williams" />
                <span className="badge-pill badge-sage clinician-badge-float">MDCN/58910</span>
              </div>
              <div className="clinician-info">
                <h3 className="clinician-name">Dr. Ayoade Williams</h3>
                <div className="clinician-specialty">Lead Obstetrician & Medical Director</div>
                <div className="clinician-quals">MBBS, FWACS (OBGYN), FMCOG • 14+ yrs</div>
                <p className="clinician-bio">
                  Senior Consultant Obstetrician with extensive clinical leadership in maternal triage, high-risk pregnancies, and safe delivery planning.
                </p>
                <div className="clinician-footer">
                  <button 
                    type="button" 
                    onClick={() => onOpenBooking(null, { id: 'c1', name: 'Dr. Ayoade Williams', title: 'Consultant Obstetrician', body: 'MDCN/58910', exp: '14+ yrs', photo: '/dr-ayo.png' })}
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    Book with Dr. Ayoade
                  </button>
                </div>
              </div>
            </div>

            {/* Clinician 2 */}
            <div className="clinician-card">
              <div className="clinician-avatar-wrap">
                <img src="/clinician-nurse.jpg" alt="Dr. Ngozi Eze" />
                <span className="badge-pill badge-sage clinician-badge-float">MDCN/64821</span>
              </div>
              <div className="clinician-info">
                <h3 className="clinician-name">Dr. Ngozi Eze</h3>
                <div className="clinician-specialty">Consultant Obstetrician & Gynaecologist</div>
                <div className="clinician-quals">MBBS, FWACS (OBGYN) • 12+ yrs</div>
                <p className="clinician-bio">
                  Specialist in prenatal maternal wellness, fetal development monitoring, scan analysis, and maternal nutrition.
                </p>
                <div className="clinician-footer">
                  <button 
                    type="button" 
                    onClick={() => onOpenBooking(null, { id: 'c2', name: 'Dr. Ngozi Eze', title: 'Obstetrician & Gynaecologist', body: 'MDCN/64821', exp: '12+ yrs', photo: '/clinician-nurse.jpg' })}
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    Book with Dr. Ngozi
                  </button>
                </div>
              </div>
            </div>

            {/* Clinician 3 */}
            <div className="clinician-card">
              <div className="clinician-avatar-wrap">
                <img src="/clinician-nurse.jpg" alt="Nurse Folashade Adeleke" />
                <span className="badge-pill badge-sage clinician-badge-float">NMCN/RN/99204</span>
              </div>
              <div className="clinician-info">
                <h3 className="clinician-name">Nurse Folashade Adeleke</h3>
                <div className="clinician-specialty">Certified Nurse-Midwife & IBCLC</div>
                <div className="clinician-quals">RN, RM, BNSc, IBCLC • 9+ yrs</div>
                <p className="clinician-bio">
                  Practicing hospital midwife specialized in labour coaching, birth bag prep, latch correction, and postpartum healing.
                </p>
                <div className="clinician-footer">
                  <button 
                    type="button" 
                    onClick={() => onOpenBooking(null, { id: 'c3', name: 'Nurse Folashade Adeleke', title: 'Certified Midwife & IBCLC', body: 'NMCN/RN/99204', exp: '9+ yrs', photo: '/clinician-nurse.jpg' })}
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    Book with Nurse Folashade
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/doctors" className="btn-secondary">
              View All Clinicians & Midwives →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          EMERGENCY SAFETY & TRIAGE NOTICE
          ============================================================ */}
      <section style={{ background: '#FFF1F2', borderTop: '1px solid #FECDD3', borderBottom: '1px solid #FECDD3', padding: '60px 24px' }}>
        <div className="section-container" style={{ maxWidth: '960px', textAlign: 'center' }}>
          <span className="emergency-tag" style={{ background: '#E11D48', color: 'white', marginBottom: '14px', fontSize: '0.85rem' }}>
            🚨 Emergency Protocol
          </span>
          <h2 style={{ fontSize: '2.2rem', color: '#881337', marginBottom: '16px' }}>
            When NOT to use online consultations
          </h2>
          <p style={{ color: '#9F1239', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
            Telehealth is designed for non-emergency clinical counseling and health education. If you experience heavy vaginal bleeding, sudden gush of water, severe throbbing headache with vision disturbances, severe upper abdominal pain, or loss of baby movements, <strong>proceed to an emergency maternity unit immediately</strong>.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={onOpenEmergencyGuide}
              className="btn-primary"
              style={{ background: '#BE123C' }}
            >
              Review Full Danger Signs Guide
            </button>
            <a href="tel:112" className="btn-secondary" style={{ color: '#BE123C', borderColor: '#BE123C' }}>
              📞 Dial Emergency Line (112)
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          COMMUNITY & WHATSAPP SUPPORT
          ============================================================ */}
      <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
        <div className="section-container">
          <div style={{ background: 'linear-gradient(135deg, #128C7E, #075E54)', borderRadius: '24px', padding: '56px 36px', color: 'white', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
            <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: '16px' }}>
              💬 Join Our Community
            </span>
            <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px' }}>
              Connect with fellow Nigerian mothers & midwives
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.05rem', opacity: 0.9, lineHeight: '1.7' }}>
              Get verified weekly pregnancy tips, maternal nutrition advice, and direct access to our clinical coordination desk on WhatsApp.
            </p>
            <a 
              href="https://wa.me/2348030000000?text=Hello%20PreggiMum%2C%20I%20would%20like%20to%20join%20the%20Maternal%20Care%20Community" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '14px 36px', fontSize: '1.05rem', background: '#25D366' }}
            >
              Join PreggiMum on WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
