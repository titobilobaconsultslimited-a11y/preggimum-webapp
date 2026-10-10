import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenBooking, onOpenAuth, currentUser, onLogout, appointmentCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="site-nav" aria-label="Main Navigation">
        <div className="nav-container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand" onClick={closeMobile} aria-label="PreggiMum Home">
            <img src="/logo.jpg" alt="PreggiMum Maternal Care Logo" className="nav-logo-img" />
            <div className="brand-text-container">
              <span className="brand-name">PreggiMum</span>
              <span className="brand-tagline">Clinical Maternal Care</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu-desktop">
            <li>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/pathways" className={`nav-link ${isActive('/pathways') ? 'active' : ''}`}>
                Care Pathways
              </Link>
            </li>
            <li>
              <Link to="/doctors" className={`nav-link ${isActive('/doctors') ? 'active' : ''}`}>
                Clinicians & Midwives
              </Link>
            </li>
            <li>
              <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
                Knowledge Hub
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact & Support
              </Link>
            </li>
            {appointmentCount > 0 && (
              <li>
                <Link to="/appointments" className={`nav-link ${isActive('/appointments') ? 'active' : ''}`}>
                  My Consultations ({appointmentCount})
                </Link>
              </li>
            )}
          </ul>

          {/* Action Buttons */}
          <div className="nav-actions">
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="nav-user-badge">
                  👤 {currentUser.full_name?.split(' ')[0] || 'Patient'}
                </span>
                <button 
                  type="button" 
                  onClick={onLogout}
                  className="btn-auth-nav"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  title="Sign Out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                type="button" 
                onClick={onOpenAuth}
                className="btn-auth-nav"
                id="btn-nav-signin"
              >
                Sign In
              </button>
            )}

            <button 
              type="button" 
              onClick={() => onOpenBooking()}
              className="btn-book-nav"
              id="btn-nav-book"
            >
              <span>Book Consultation</span>
              <span>→</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              type="button" 
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line" style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
              <span className="hamburger-line" style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
              <span className="hamburger-line" style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" style={{ display: 'block' }} onClick={closeMobile}>
          <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <div className="brand-text-container">
                <span className="brand-name">PreggiMum</span>
                <span className="brand-tagline">Clinical Maternal Care</span>
              </div>
              <button 
                type="button" 
                onClick={closeMobile}
                className="modal-close-btn"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <ul className="mobile-nav-links">
              <li>
                <Link to="/" onClick={closeMobile}>🏠 Home</Link>
              </li>
              <li>
                <Link to="/pathways" onClick={closeMobile}>🌸 Care Pathways</Link>
              </li>
              <li>
                <Link to="/doctors" onClick={closeMobile}>👩‍⚕️ Clinicians & Specialists</Link>
              </li>
              <li>
                <Link to="/blog" onClick={closeMobile}>📚 Knowledge Hub</Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMobile}>💬 Contact & Support</Link>
              </li>
              {appointmentCount > 0 && (
                <li>
                  <Link to="/appointments" onClick={closeMobile}>
                    📋 My Consultations ({appointmentCount})
                  </Link>
                </li>
              )}
            </ul>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                type="button" 
                onClick={() => { closeMobile(); onOpenBooking(); }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Book Consultation Now
              </button>

              {currentUser ? (
                <button 
                  type="button" 
                  onClick={() => { closeMobile(); onLogout(); }}
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  Sign Out ({currentUser.full_name})
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => { closeMobile(); onOpenAuth(); }}
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  Sign In / Register
                </button>
              )}

              <a 
                href="https://wa.me/2348030000000?text=Hello%20PreggiMum%20Clinical%20Support" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ width: '100%', fontSize: '0.9rem' }}
              >
                WhatsApp Care Line
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
