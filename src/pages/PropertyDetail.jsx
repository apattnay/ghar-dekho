import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import properties from '../data/properties';
import { formatPrice } from '../utils/format';
import PropertyCard from '../components/PropertyCard';
import './PropertyDetail.css';

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);

  if (!property) {
    return (
      <div className="detail-page">
        <div className="detail-not-found">
          <h2>Property not found</h2>
          <Link to="/properties">← Back to listings</Link>
        </div>
      </div>
    );
  }

  const similar = properties
    .filter(p => p.id !== property.id && p.city === property.city)
    .slice(0, 3);

  return (
    <div className="detail-page">
      <div className="detail-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/properties">Properties</Link> / <span>{property.title}</span>
      </div>

      {/* Image Gallery */}
      <div className="detail-gallery">
        <div className="gallery-main">
          <img src={property.images[activeImg]} alt={property.title} />
          <span className={`detail-badge ${property.status === 'Rent' ? 'rent' : 'buy'}`}>
            For {property.status}
          </span>
        </div>
        {property.images.length > 1 && (
          <div className="gallery-thumbs">
            {property.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`View ${i + 1}`}
                className={i === activeImg ? 'active' : ''}
                onClick={() => setActiveImg(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content grid */}
      <div className="detail-content">
        <div className="detail-main">
          <div className="detail-header">
            <div>
              <h1>{property.title}</h1>
              <p className="detail-location">📍 {property.address}</p>
            </div>
            <div className="detail-price-box">
              <div className="detail-price">{formatPrice(property.price, property.status)}</div>
              <div className="detail-price-sqft">
                ₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/sq.ft
              </div>
            </div>
          </div>

          {/* Key stats */}
          <div className="detail-stats">
            {property.bedrooms > 0 && (
              <div className="stat">
                <span className="stat-value">{property.bedrooms}</span>
                <span className="stat-label">Bedrooms</span>
              </div>
            )}
            <div className="stat">
              <span className="stat-value">{property.bathrooms}</span>
              <span className="stat-label">Bathrooms</span>
            </div>
            <div className="stat">
              <span className="stat-value">{property.area}</span>
              <span className="stat-label">Sq. Ft.</span>
            </div>
            <div className="stat">
              <span className="stat-value">{property.type}</span>
              <span className="stat-label">Type</span>
            </div>
            <div className="stat">
              <span className="stat-value">{property.facing}</span>
              <span className="stat-label">Facing</span>
            </div>
            <div className="stat">
              <span className="stat-value">{property.floor}</span>
              <span className="stat-label">Floor</span>
            </div>
          </div>

          {/* Description */}
          <div className="detail-section">
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>

          {/* Details table */}
          <div className="detail-section">
            <h2>Property Details</h2>
            <div className="detail-table">
              <div><span>Furnished Status</span><span>{property.furnished}</span></div>
              <div><span>Property Age</span><span>{property.age}</span></div>
              <div><span>City</span><span>{property.city}, {property.state}</span></div>
              <div><span>Locality</span><span>{property.locality}</span></div>
              <div><span>Facing</span><span>{property.facing}</span></div>
              <div><span>Floor</span><span>{property.floor}</span></div>
            </div>
          </div>

          {/* Amenities */}
          <div className="detail-section">
            <h2>Amenities</h2>
            <div className="detail-amenities">
              {property.amenities.map(a => (
                <span key={a} className="amenity-tag">✓ {a}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          <div className="contact-card">
            <h3>Contact {property.status === 'Rent' ? 'Owner' : 'Seller'}</h3>
            <div className="contact-agent">
              <div className="agent-avatar">{property.postedBy[0]}</div>
              <div>
                <div className="agent-name">{property.postedBy}</div>
                <div className="agent-label">{property.verified ? '✓ Verified Agent' : 'Agent'}</div>
              </div>
            </div>
            <p className="posted-date">Listed on {new Date(property.postedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            <button className="contact-btn primary">📞 Get Phone Number</button>
            <button className="contact-btn secondary">✉ Send Enquiry</button>
          </div>

          <div className="emi-card">
            <h3>EMI Calculator</h3>
            {property.status === 'Buy' ? (
              <>
                <p className="emi-amount">
                  ≈ ₹{Math.round((property.price * 0.08 * Math.pow(1.08, 20)) / (12 * (Math.pow(1.08, 20) - 1))).toLocaleString('en-IN')}/mo
                </p>
                <p className="emi-note">@ 8% for 20 years, 80% LTV</p>
              </>
            ) : (
              <p className="emi-note">EMI not applicable for rental properties</p>
            )}
          </div>
        </aside>
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <div className="detail-section similar-section">
          <h2>Similar Properties in {property.city}</h2>
          <div className="similar-grid">
            {similar.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
