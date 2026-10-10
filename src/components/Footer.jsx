import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenEmergencyGuide }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        {/* Main 4-column footer layout */}
        <div className="footer-main-grid">
          {/* Brand info */}
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <img src="/logo.jpg" alt="PreggiMum Maternal Care" className="footer-logo-img" />
              <span className="footer-brand-title">PreggiMum</span>
            </div>
            <p className="footer-brand-desc">
              Empowering Nigerian mothers and families with dignified, evidence-based maternal guidance. Every consultation is led by certified Nigerian obstetricians, midwives, and women's health clinicians.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
              <span className="badge-pill badge-sage">MDCN Verified</span>
              <span className="badge-pill badge-terracotta">NMCN Certified</span>
              <span className="badge-pill badge-plum">NDPR Compliant</span>
            </div>
          </div>

          {/* Care Pathways */}
          <div className="footer-col">
            <h4>Care Pathways</h4>
            <ul>
              <li><Link to="/pathways">Trimester Care & Guidance</Link></li>
              <li><Link to="/pathways">Antenatal Test Interpretation</Link></li>
              <li><Link to="/pathways">Labour & Delivery Readiness</Link></li>
              <li><Link to="/pathways">Postpartum Wound Healing</Link></li>
              <li><Link to="/pathways">Lactation & Newborn Nutrition</Link></li>
            </ul>
          </div>

          {/* Clinical & Resources */}
          <div className="footer-col">
            <h4>Clinical Resources</h4>
            <ul>
              <li><Link to="/doctors">Verified Clinicians & Midwives</Link></li>
              <li><Link to="/blog">Knowledge Hub & Articles</Link></li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenEmergencyGuide}
                  style={{ color: '#F87171', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left', fontWeight: 700 }}
                >
                  🚨 Emergency Warning Signs
                </button>
              </li>
              <li><Link to="/privacy">Privacy Policy (NDPR)</Link></li>
              <li><Link to="/terms">Terms of Telehealth Care</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="footer-col">
            <h4>Support & Connect</h4>
            <div className="footer-contact-item">
              <span>📍</span>
              <span>Lagos & Abuja, Nigeria (Nationwide Digital Coverage)</span>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <span>+234 (0) 803 000 0000</span>
            </div>
            <div className="footer-contact-item">
              <span>✉️</span>
              <span>care@preggimum.com</span>
            </div>
            <div style={{ marginTop: '16px' }}>
              <a 
                href="https://wa.me/2348030000000?text=Hello%20PreggiMum%20Care%20Coordinator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ fontSize: '0.85rem', padding: '9px 18px' }}
              >
                💬 WhatsApp Care Desk
              </a>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer Box */}
        <div className="footer-disclaimer-box">
          <strong style={{ color: 'white' }}>⚠️ Crucial Medical & Regulatory Disclaimer:</strong><br />
          PreggiMum provides digital clinical consultations, antenatal education, and health coaching delivered by licensed Nigerian medical and nursing practitioners. PreggiMum telehealth consultations do not constitute physical hospital admission, surgical obstetric intervention, or emergency room trauma care. If you experience active vaginal bleeding, premature rupture of membranes, severe unremitting headache, blurred vision, or absence of fetal movement, immediately go to the nearest maternity hospital emergency room or dial 112.
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} PreggiMum Health Technologies Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'inherit' }}>Terms of Service</Link>
            <Link to="/contact" style={{ color: 'inherit' }}>Contact Helpdesk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
