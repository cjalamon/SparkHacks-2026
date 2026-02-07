import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import FilterChips from './FilterChips';
import CreatorGrid from './CreatorGrid';
import MapOverlay from './MapOverlay';

function App() {
  const [creators, setCreators] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All Creatives');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default location (Chicago)
          setUserLocation({ lat: 41.8781, lng: -87.6298 });
        }
      );
    } else {
      // Fallback if geolocation not supported
      setUserLocation({ lat: 41.8781, lng: -87.6298 });
    }
  }, []);

  // Fetch creators from backend
  useEffect(() => {
    const fetchCreators = async () => {
      if (!userLocation) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/users/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=25`
        );
        const data = await response.json();
        setCreators(data);
        setFilteredCreators(data);
      } catch (error) {
        console.error('Error fetching creators:', error);
      }
    };

    fetchCreators();
  }, [userLocation]);

  // Filter creators based on active filter and search
  useEffect(() => {
    let filtered = creators;

    // Apply type filter
    if (activeFilter !== 'All Creatives') {
      const filterType = activeFilter.toLowerCase().replace(/s$/, ''); // Remove 's' from end
      filtered = filtered.filter(creator => 
        creator.creative_type.toLowerCase() === filterType
      );
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.creative_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (creator.title && creator.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredCreators(filtered);
  }, [activeFilter, searchQuery, creators]);

  return (
    <div className="app">
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleMap={() => setShowMap(!showMap)}
      />
      
      <FilterChips 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {showMap && (
        <MapOverlay 
          creators={filteredCreators}
          userLocation={userLocation}
          onClose={() => setShowMap(false)}
        />
      )}

      <CreatorGrid 
        creators={filteredCreators}
        userLocation={userLocation}
      />
    </div>
  );
}

export default App;