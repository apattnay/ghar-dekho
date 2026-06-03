import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏠</span>
          <span className="brand-text">GharDekho</span>
        </Link>
        <div className="navbar-links">
          <Link to="/?status=Buy">Buy</Link>
          <Link to="/?status=Rent">Rent</Link>
          <Link to="/properties">All Properties</Link>
        </div>
      </div>
    </nav>
  );
}
