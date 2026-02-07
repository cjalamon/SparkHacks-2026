import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar.jsx';
import SideTab from '../components/SideTab.jsx';
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
    <>
      <Navbar />
      <SideTab />
      <div className="eventsPage">
        {/* Header - same as Events page */}
        <div className="eventsHeader">
          <div className="eventsHeaderContent">
            <div className="eventsBrand">
              <div className="eventsLogo">C</div>
              <span className="eventsBrandText">CASTLY</span>
            </div>
            <nav className="eventsNav">
              <a href="/home" className="eventsNavLink active">Home</a>
              <a href="/events" className="eventsNavLink">Events</a>
              <a href="/profile" className="eventsNavLink">Profile</a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="eventsContainer">
          <div className="eventsTitle">
            <h1>Discover Creators</h1>
            <p>Find filmmakers, actors, and creatives near you</p>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text"
              placeholder="Search for filmmakers, actors, cameramen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 20px',
                border: '2px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Filter Chips */}
          <FilterChips activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

          {/* Map Toggle */}
          <div style={{ margin: '20px 0' }}>
            <button 
              onClick={() => setShowMap(!showMap)}
              className="eventsTab"
              style={{ background: showMap ? '#9333ea' : 'white', color: showMap ? 'white' : '#333' }}
            >
              📍 {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>

          {/* Map Overlay */}
          {showMap && (
            <MapOverlay 
              creators={filteredCreators}
              userLocation={userLocation}
              onClose={() => setShowMap(false)}
            />
          )}

          {/* Creator Grid */}
          <div style={{ marginTop: '20px' }}>
            <CreatorGrid creators={filteredCreators} userLocation={userLocation} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;