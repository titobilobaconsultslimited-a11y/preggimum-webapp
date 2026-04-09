import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="pill">✨ Trusted Maternal Care</span>
            <h1>Your Journey to <span>Motherhood</span>, Guided with Love</h1>
            <p>PreggiMum is your trusted companion for pregnancy, conception, lactation, and child wellness. Expert guidance, real support — every step of the way.</p>
            <div className="hero-btns">
              <Link to="/doctors" className="btn-primary">🩺 Talk to a Doctor</Link>
              <a href="https://whatsapp.com/channel/0029VbAHzcwJENy3GXUcId0s" target="_blank" rel="noreferrer" className="btn-secondary">
                <svg viewBox="0 0 24 24" fill="#25d366" width="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.549 4.107 1.508 5.836L.057 23.868a.75.75 0 0 0 .92.921l6.109-1.435A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.727 9.727 0 0 1-4.935-1.345l-.354-.21-3.658.859.875-3.57-.228-.368A9.714 9.714 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                Join Channel
              </a>
            </div>
          </div>
          <div className="hero-logo-big">
            <img src="/logo.jpg" alt="PreggiMum" />
          </div>
        </div>
      </section>

      <div className="stats">
        <div className="stats-inner">
          <div className="stat"><div className="num">5+</div><div className="label">Specialist Doctors</div></div>
          <div className="stat"><div className="num">24/7</div><div className="label">WhatsApp Support</div></div>
          <div className="stat"><div className="num">1000+</div><div className="label">Mothers Supported</div></div>
          <div className="stat"><div className="num">100%</div><div className="label">Free Guidance</div></div>
        </div>
      </div>
    </main>
  );
};

export default Home;
