import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.jpg" alt="PreggiMum" />
          <p>PreggiMum is your trusted partner in maternal care — providing up-to-date, compassionate guidance for every mother's journey from conception to childhood.</p>
          <div style={{ marginTop: '18px', display: 'flex', gap: '12px' }}>
            <a href="https://wa.me/2348162714844" target="_blank" rel="noreferrer" style={{ background: '#25d366', color: 'white', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>📞 Support Line</a>
            <a href="mailto:preggimum@gmail.com" style={{ background: 'var(--pink-dark)', color: 'white', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>✉️ Email Us</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/doctors">Talk to a Doctor</Link></li>
            <li><Link to="/information">Pregnancy Info</Link></li>
            <li><Link to="/tips">Tips & Guides</Link></li>
            <li><Link to="/blog">Maternal Blog</Link></li>
            <li><Link to="/contact">Subscribe</Link></li>
            <li><a href="https://whatsapp.com/channel/0029VbAHzcwJENy3GXUcId0s" target="_blank" rel="noreferrer">Support Channel</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Topics</h4>
          <ul>
            <li><Link to="/information">Conception</Link></li>
            <li><Link to="/information">Pregnancy</Link></li>
            <li><Link to="/information">Teen Mothers</Link></li>
            <li><Link to="/information">Lactation</Link></li>
            <li><Link to="/information">Child Wellness</Link></li>
            <li><Link to="/information">Postpartum</Link></li>
          </ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>Contact</h4>
          <p>📞 <a href="https://wa.me/2348162714844" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+234 816 271 4844</a></p>
          <p>✉️ <a href="mailto:preggimum@gmail.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>preggimum@gmail.com</a></p>
          <p>💬 <a href="https://whatsapp.com/channel/0029VbAHzcwJENy3GXUcId0s" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>WhatsApp Channel</a></p>
          <p style={{ marginTop: '12px', opacity: 0.6, fontSize: '0.82rem' }}>Follow @preggimum on all social platforms</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 PreggiMum. Made with 💗 for every mother. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
