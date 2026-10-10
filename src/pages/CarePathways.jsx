import React, { useState } from 'react';

export default function CarePathways({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('pregnancy');

  return (
    <div className="care-pathways-page" style={{ paddingTop: '20px' }}>
      {/* Header Banner */}
      <section style={{ background: 'linear-gradient(180deg, #FDFBF8 0%, #F5EDE6 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <span className="badge-pill badge-terracotta" style={{ marginBottom: '12px' }}>
            Clinical Guidance Roadmap
          </span>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--color-plum)' }}>
            Maternal Care Pathways
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            Structured, evidence-based guidance designed around the Nigerian maternal healthcare journey. Choose your stage below to explore milestones and consultations.
          </p>
        </div>
      </section>

      {/* Pathway Tabs */}
      <section style={{ padding: '40px 24px 80px', background: 'var(--color-ivory)' }}>
        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('pregnancy')}
              className={`badge-pill ${activeTab === 'pregnancy' ? 'badge-terracotta' : 'badge-plum'}`}
              style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer', border: 'none' }}
            >
              🤰 Pregnancy & Antenatal Care
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('birth')}
              className={`badge-pill ${activeTab === 'birth' ? 'badge-terracotta' : 'badge-plum'}`}
              style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer', border: 'none' }}
            >
              🏥 Labour & Birth Preparation
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('postnatal')}
              className={`badge-pill ${activeTab === 'postnatal' ? 'badge-terracotta' : 'badge-plum'}`}
              style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer', border: 'none' }}
            >
              👶 Postnatal & Newborn Recovery
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('nutrition')}
              className={`badge-pill ${activeTab === 'nutrition' ? 'badge-terracotta' : 'badge-plum'}`}
              style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer', border: 'none' }}
            >
              🥗 Nigerian Maternal Nutrition
            </button>
          </div>

          {/* TAB 1: PREGNANCY CARE */}
          {activeTab === 'pregnancy' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
                <span className="badge-pill badge-terracotta" style={{ marginBottom: '12px' }}>Weeks 1 – 13</span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>First Trimester Focus</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  Critical period for organ formation. Key priorities include establishing early antenatal care, ruling out ectopic pregnancy, and taking folic acid daily.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
                  <li>✓ Ultrasound dating scan at 7–10 weeks</li>
                  <li>✓ Routine blood tests: PCV, Blood Group, Genotype, Hepatitis B & C, VDRL, HIV</li>
                  <li>✓ Managing early morning sickness with ginger & small meals</li>
                </ul>
                <button
                  type="button"
                  onClick={() => onOpenBooking({ id: 's1', name: 'First Trimester Antenatal Review', price: 3000 })}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Book Trimester Review (₦3,000)
                </button>
              </div>

              <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
                <span className="badge-pill badge-plum" style={{ marginBottom: '12px' }}>Weeks 14 – 27</span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Second Trimester Focus</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  Energy often returns and the baby grows rapidly. Key clinical milestone is the mid-pregnancy anomaly ultrasound scan and blood pressure tracking.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
                  <li>✓ Detailed fetal anomaly scan (18–22 weeks)</li>
                  <li>✓ Blood pressure screening to detect gestational hypertension</li>
                  <li>✓ Feeling first flutter kicks (quickening around week 18–20)</li>
                </ul>
                <button
                  type="button"
                  onClick={() => onOpenBooking({ id: 's2', name: 'Second Trimester Scan & Health Review', price: 3500 })}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Book Scan Consultation (₦3,500)
                </button>
              </div>

              <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
                <span className="badge-pill badge-sage" style={{ marginBottom: '12px' }}>Weeks 28 – 40+</span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Third Trimester Vigilance</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  Monitoring fetal growth, kick counts, and blood pressure. Frequent antenatal visits to confirm baby presentation (head down/cephalic).
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
                  <li>✓ Daily fetal kick counts tracking</li>
                  <li>✓ Screening for pre-eclampsia (headache, vision, urine protein)</li>
                  <li>✓ Finalizing delivery hospital & emergency logistics</li>
                </ul>
                <button
                  type="button"
                  onClick={() => onOpenBooking({ id: 's4', name: 'Third Trimester Clinical Review', price: 4000 })}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Book Third Trimester Review (₦4,000)
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BIRTH PREPARATION */}
          {activeTab === 'birth' && (
            <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--color-plum)' }}>
                Labour & Delivery Preparation Guide
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '32px', maxWidth: '780px' }}>
                Being prepared reduces labour anxiety and empowers you and your partner to advocate for safe, dignified care during delivery in Nigerian hospitals.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '36px' }}>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>👜 Hospital Bag Essentials</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Pack by week 34: Antenatal card, maternity pads, mesh panties, nursing bras, baby onesies, cotton wrappers, diapers, toiletries, and hospital cash/debit card.
                  </p>
                </div>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>⚡ True vs False Labour</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Braxton Hicks contractions are irregular and stop with rest. True labour contractions become steadily longer, stronger, and closer together (5-1-1 rule).
                  </p>
                </div>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>🤝 Birth Partner Coaching</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    How your husband or birth companion can provide sacral counterpressure, rhythmic breathing cues, hydration support, and advocate for your wishes.
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => onOpenBooking({ id: 's4', name: 'Labour & Delivery Preparation', price: 4000 })}
                  className="btn-primary"
                  style={{ padding: '14px 36px', fontSize: '1.05rem' }}
                >
                  Book 1-on-1 Birth Preparation Session (₦4,000)
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: POSTNATAL & NEWBORN */}
          {activeTab === 'postnatal' && (
            <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--color-plum)' }}>
                The "Fourth Trimester": Postnatal Recovery & Lactation
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '32px', maxWidth: '780px' }}>
                After delivery, the focus often shifts solely to the newborn, but maternal healing requires dedicated clinical oversight and emotional support.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '36px' }}>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>🩹 C-Section & Perineal Wound Care</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Keeping incision areas clean and dry, recognizing wound infection signs (redness, warmth, foul discharge), and safely managing pain medication.
                  </p>
                </div>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>🤱 Certified Lactation Counseling</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Correct asymmetrical latch, preventing nipple damage, boosting breast milk volume, and relieving painful breast engorgement.
                  </p>
                </div>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>🌸 Postpartum Mental Wellness</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Understanding normal "baby blues" versus postpartum depression (PPD). Safe, confidential clinical support for maternal emotional health.
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => onOpenBooking({ id: 's5', name: 'Postpartum Recovery & Wound Care', price: 4000 })}
                  className="btn-primary"
                  style={{ padding: '14px 36px', fontSize: '1.05rem' }}
                >
                  Book Postnatal Healing Session (₦4,000)
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: NIGERIAN MATERNAL NUTRITION */}
          {activeTab === 'nutrition' && (
            <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--color-plum)' }}>
                Nourishing Mother & Baby with Local Nigerian Foods
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '32px', maxWidth: '780px' }}>
                Healthy maternal nutrition in Nigeria does not require expensive imported items. Our registered nutritionists craft practical, culturally authentic meal guides.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '36px' }}>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>🥬 Folate & Iron Rich Vegetables</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Fluted pumpkin leaves (ugwu), waterleaf, and efo tete are rich in natural folate and iron. Steaming lightly preserves their micronutrient density.
                  </p>
                </div>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>🥚 Quality Protein & Choline</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Boiled eggs provide choline for fetal brain development. Steamed moi-moi, fish (titus/mackerel for DHA omega-3), and lean meats fuel baby growth.
                  </p>
                </div>
                <div style={{ background: 'var(--color-ivory)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>🚫 What to Avoid in Nigeria</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Avoid unpasteurized herbal concoctions (agbo), unwashed roadside fruits, raw/undercooked meats, and high-mercury fishes. Drink verified safe treated water.
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => onOpenBooking({ id: 's3', name: 'Pregnancy Nutrition & Meal Planning', price: 3000 })}
                  className="btn-primary"
                  style={{ padding: '14px 36px', fontSize: '1.05rem' }}
                >
                  Book Nutrition Consultation (₦3,000)
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
