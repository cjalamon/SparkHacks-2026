import React, { useState, useEffect } from 'react';
import './App.css';
import FilterChips from './FilterChips';
import CreatorGrid from './CreatorGrid';
import MapOverlay from './MapOverlay';

function Home() {
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
          setUserLocation({ lat: 41.8781, lng: -87.6298 });
        }
      );
    } else {
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

  // Filter creators
  useEffect(() => {
    let filtered = creators;

    if (activeFilter !== 'All Creatives') {
      const filterType = activeFilter.toLowerCase().replace(/s$/, '');
      filtered = filtered.filter(creator => 
        creator.creative_type.toLowerCase() === filterType
      );
    }

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
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-profile">
          Profile<br />Picture
        </div>
        <nav className="sidebar-nav">
          <a href="/home" className="sidebar-link active">Home</a>
          <a href="/events" className="sidebar-link">Events</a>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOP BAR */}
        <div className="top-bar">
          <div className="top-bar-left">
            <div className="logo-container">
              <svg className="logo-image" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <text 
                  x="50" 
                  y="70" 
                  fontSize="80" 
                  fontFamily="EB Garamond, serif" 
                  fontWeight="600"
                  fill="#8B5CF6" 
                  textAnchor="middle"
                >
                  C
                </text>
              </svg>
              <div className="logo-text">Castly</div>
            </div>
            
            <div className="search-container">
              <input 
                type="text" 
                className="search-bar" 
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="nav-actions">
            <button className="map-toggle" onClick={() => setShowMap(!showMap)}>
              📍 Map View
            </button>
            <button className="filter-btn">Filters</button>
            <img 
              src="https://i.pravatar.cc/150?img=12" 
              alt="Profile" 
              className="profile-pic-nav"
            />
          </div>
        </div>

        {/* FILTER CHIPS */}
        <FilterChips 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* MAP OVERLAY */}
        {showMap && (
          <MapOverlay 
            creators={filteredCreators}
            userLocation={userLocation}
            onClose={() => setShowMap(false)}
          />
        )}

        {/* CONTENT AREA */}
        <div className="content-area">
          <CreatorGrid 
            creators={filteredCreators}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;