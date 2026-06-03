import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">🏠</span> GharDekho
          <p className="footer-tagline">India's trusted real estate platform</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <a href="/properties">All Properties</a>
            <a href="/?status=Buy">Buy</a>
            <a href="/?status=Rent">Rent</a>
          </div>
          <div>
            <h4>Cities</h4>
            <a href="/properties?city=Mumbai">Mumbai</a>
            <a href="/properties?city=Bangalore">Bangalore</a>
            <a href="/properties?city=Delhi">Delhi NCR</a>
            <a href="/properties?city=Hyderabad">Hyderabad</a>
          </div>
          <div>
            <h4>Company</h4>
            <span>About Us</span>
            <span>Contact</span>
            <span>Careers</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 GharDekho. All rights reserved. | Demo Project</p>
        </div>
      </div>
    </footer>
  );
}
