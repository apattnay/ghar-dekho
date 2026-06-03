import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import properties, { cities } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import './HomePage.css';

const featured = properties.filter(p => p.verified).slice(0, 6);
const popularCities = [
  { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop' },
  { name: 'Bangalore', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=300&fit=crop' },
  { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1572883454114-efb0a4cba8d8?w=400&h=300&fit=crop' },
  { name: 'Pune', img: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop' },
  { name: 'Chennai', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop' },
  { name: 'Gurugram', img: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400&h=300&fit=crop' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(searchParams.get('status') || 'Buy');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (status) params.set('status', status);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Find Your Dream Home in India</h1>
          <p>Explore thousands of properties across Mumbai, Bangalore, Delhi NCR, and more</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <div className="hero-tabs">
              <button type="button" className={status === 'Buy' ? 'active' : ''} onClick={() => setStatus('Buy')}>Buy</button>
              <button type="button" className={status === 'Rent' ? 'active' : ''} onClick={() => setStatus('Rent')}>Rent</button>
            </div>
            <div className="hero-search-row">
              <input
                type="text"
                placeholder="Enter city, locality or project name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button type="submit" className="hero-search-btn">Search</button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="stat-item"><span className="stat-num">10,000+</span><span>Properties</span></div>
        <div className="stat-item"><span className="stat-num">50+</span><span>Cities</span></div>
        <div className="stat-item"><span className="stat-num">500+</span><span>Verified Agents</span></div>
        <div className="stat-item"><span className="stat-num">1L+</span><span>Happy Customers</span></div>
      </section>

      {/* Popular Cities */}
      <section className="home-section">
        <h2>Popular Cities</h2>
        <div className="cities-grid">
          {popularCities.map(c => (
            <div key={c.name} className="city-card" onClick={() => navigate(`/properties?city=${c.name}`)}>
              <img src={c.img} alt={c.name} loading="lazy" />
              <div className="city-label">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="home-section">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <button className="view-all-btn" onClick={() => navigate('/properties')}>View All →</button>
        </div>
        <div className="featured-grid">
          {featured.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="home-section why-section">
        <h2>Why Choose GharDekho?</h2>
        <div className="why-grid">
          <div className="why-card">
            <span className="why-icon">🔍</span>
            <h3>Verified Listings</h3>
            <p>Every property is verified by our team to ensure authenticity and accuracy.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">💰</span>
            <h3>Best Prices</h3>
            <p>Compare prices across localities and find the best deal for your budget.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">🏡</span>
            <h3>Pan India Coverage</h3>
            <p>From metros to tier-2 cities, find properties across all of India.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">📱</span>
            <h3>Easy to Use</h3>
            <p>Simple, fast, and intuitive — find your home in just a few clicks.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
