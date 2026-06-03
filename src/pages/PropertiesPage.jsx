import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import properties from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import './PropertiesPage.css';

const defaultFilters = { query: '', status: '', city: '', type: '', bedrooms: '', priceRange: '', furnished: '' };

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    query: searchParams.get('q') || '',
    status: searchParams.get('status') || '',
    city: searchParams.get('city') || '',
    type: searchParams.get('type') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    priceRange: searchParams.get('priceRange') || '',
    furnished: searchParams.get('furnished') || '',
  };

  const setFilters = (f) => {
    const params = {};
    if (f.query) params.q = f.query;
    if (f.status) params.status = f.status;
    if (f.city) params.city = f.city;
    if (f.type) params.type = f.type;
    if (f.bedrooms) params.bedrooms = f.bedrooms;
    if (f.priceRange) params.priceRange = f.priceRange;
    if (f.furnished) params.furnished = f.furnished;
    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (filters.status && p.status !== filters.status) return false;
      if (filters.city && p.city !== filters.city) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.furnished && p.furnished !== filters.furnished) return false;
      if (filters.bedrooms) {
        const b = Number(filters.bedrooms);
        if (b === 4 ? p.bedrooms < 4 : p.bedrooms !== b) return false;
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (min && p.price < min) return false;
        if (max && p.price > max) return false;
      }
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const searchable = `${p.title} ${p.city} ${p.locality} ${p.address} ${p.description}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="properties-page">
      <SearchFilters filters={filters} onChange={setFilters} />
      <div className="results-header">
        <h2>{filtered.length} {filtered.length === 1 ? 'Property' : 'Properties'} Found</h2>
      </div>
      {filtered.length > 0 ? (
        <div className="properties-grid">
          {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      ) : (
        <div className="no-results">
          <p>No properties match your filters. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
}
