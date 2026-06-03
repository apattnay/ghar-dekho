import { useState } from 'react';
import { cities, propertyTypes } from '../data/properties';
import './SearchFilters.css';

export default function SearchFilters({ filters, onChange }) {
  const [expanded, setExpanded] = useState(false);

  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="search-filters">
      <div className="filters-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search by location, project, or keyword..."
          value={filters.query}
          onChange={e => update('query', e.target.value)}
        />
        <select value={filters.status} onChange={e => update('status', e.target.value)}>
          <option value="">Buy / Rent</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>
        <select value={filters.city} onChange={e => update('city', e.target.value)}>
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="filter-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? '✕ Less' : '☰ More Filters'}
        </button>
      </div>

      {expanded && (
        <div className="filters-expanded">
          <select value={filters.type} onChange={e => update('type', e.target.value)}>
            <option value="">All Types</option>
            {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filters.bedrooms} onChange={e => update('bedrooms', e.target.value)}>
            <option value="">Bedrooms</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
          <select value={filters.priceRange} onChange={e => update('priceRange', e.target.value)}>
            <option value="">Price Range</option>
            <option value="0-2500000">Under ₹25 Lakh</option>
            <option value="2500000-5000000">₹25L – ₹50L</option>
            <option value="5000000-10000000">₹50L – ₹1Cr</option>
            <option value="10000000-50000000">₹1Cr – ₹5Cr</option>
            <option value="50000000-">₹5Cr+</option>
          </select>
          <select value={filters.furnished} onChange={e => update('furnished', e.target.value)}>
            <option value="">Furnishing</option>
            <option value="Fully Furnished">Fully Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
          <button className="clear-btn" onClick={() => onChange({ query: '', status: '', city: '', type: '', bedrooms: '', priceRange: '', furnished: '' })}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
