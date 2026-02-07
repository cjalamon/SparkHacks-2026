import React, { useState, useEffect } from 'react';
import '../App.css';  // Note: ../ because we're in pages folder
import FilterChips from '../FilterChips';
import CreatorGrid from '../CreatorGrid';
import MapOverlay from '../MapOverlay';

function Home() {
  const [creators, setCreators] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All Creatives');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setUserLocation({ lat: 41.8781, lng: -87.6298 });
  }, []);

  useEffect(() => {
    const fetchCreators = async () => {
      if (!userLocation) return;
      try {
        const response = await fetch(`http://localhost:5000/api/users/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=25`);
        const data = await response.json();
        setCreators(data);
        setFilteredCreators(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCreators();
  }, [userLocation]);

  useEffect(() => {
    let filtered = creators;
    if (activeFilter !== 'All Creatives') {
      filtered = filtered.filter(c => c.creative_type.toLowerCase() === activeFilter.toLowerCase().replace(/s$/, ''));
    }
    if (searchQuery) {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredCreators(filtered);
  }, [activeFilter, searchQuery, creators]);

  return (
    <div>
      <h1>TESTING - Creator Discovery</h1>
      <p>Found {filteredCreators.length} creators</p>
      <FilterChips activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <CreatorGrid creators={filteredCreators} userLocation={userLocation} />
    </div>
  );
}

export default Home;