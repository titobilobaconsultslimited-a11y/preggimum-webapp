import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-logo">
        <Link to="/">
            <img src="/logo.jpg" alt="PreggiMum Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/doctors">Doctors</Link></li>
        <li><Link to="/blog">Blog & Guides</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <a href="https://whatsapp.com/channel/0029VbAHzcwJENy3GXUcId0s" target="_blank" rel="noreferrer" className="nav-cta">
        Join Support Channel
      </a>
    </nav>
  );
};

export default Navbar;
