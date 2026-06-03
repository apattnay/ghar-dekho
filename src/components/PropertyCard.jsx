import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import './PropertyCard.css';

export default function PropertyCard({ property }) {
  const { id, title, image, price, status, area, bedrooms, bathrooms, city, locality, type, verified } = property;

  return (
    <Link to={`/property/${id}`} className="property-card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} className="card-image" loading="lazy" />
        <span className={`card-badge ${status === 'Rent' ? 'rent' : 'buy'}`}>{status}</span>
        {verified && <span className="card-verified">✓ Verified</span>}
      </div>
      <div className="card-body">
        <div className="card-price">{formatPrice(price, status)}</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-location">📍 {locality}, {city}</p>
        <div className="card-details">
          {bedrooms > 0 && <span>🛏 {bedrooms} BHK</span>}
          <span>📐 {area} sq.ft</span>
          <span>🚿 {bathrooms} Bath</span>
          <span className="card-type">{type}</span>
        </div>
      </div>
    </Link>
  );
}
