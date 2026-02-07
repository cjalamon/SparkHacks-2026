import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar.jsx';
import SideTab from '../components/SideTab.jsx';
import FilterChips from '../FilterChips';
import CreatorGrid from '../CreatorGrid';
import MapOverlay from '../MapOverlay';
import CreateListingForm from '../components/CreateListingForm.jsx';

function Home() {
  const [creators, setCreators] = useState([]);
  const [listings, setListings] = useState([]); // NEW: For job listings
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All Creatives');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('creators'); // NEW: Switch between creators and listings

  useEffect(() => {
    setUserLocation({ lat: 41.8781, lng: -87.6298 });
  }, []);

  // Fetch creators
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

  // NEW: Fetch job listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/listings');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

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

  // NEW: Handle new listing submission
  const handleNewListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
    setActiveTab('listings'); // Switch to listings tab to show the new post
  };

  return (
    <>
      <Navbar />
      <SideTab />
      <div className="eventsPage">
        <div className="eventsHeader">
          <div className="eventsHeaderContent">
            <div className="eventsBrand">
              <div className="eventsLogo">C</div>
              <span className="eventsBrandText">CASTLY</span>
            </div>
          </div>
        </div>

        <div className="eventsContainer">
          <div className="eventsTitle">
            <h1>{activeTab === 'creators' ? 'Discover Creators' : 'Job Listings'}</h1>
            <p>{activeTab === 'creators' ? 'Find filmmakers, actors, and creatives near you' : 'Browse creative opportunities'}</p>
          </div>

          {/* NEW: Tab Switcher */}
          <div className="eventsTabs" style={{ marginBottom: '20px' }}>
            <button 
              className={`eventsTab ${activeTab === 'creators' ? 'active' : ''}`}
              onClick={() => setActiveTab('creators')}
            >
              👥 Creators
            </button>
            <button 
              className={`eventsTab ${activeTab === 'listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              💼 Job Listings ({listings.length})
            </button>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text"
              placeholder={activeTab === 'creators' ? "Search for filmmakers, actors, cameramen..." : "Search job listings..."}
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

          {/* Show Creators Tab */}
          {activeTab === 'creators' && (
            <>
              <FilterChips activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

              <div style={{ margin: '20px 0' }}>
                <button 
                  onClick={() => setShowMap(!showMap)}
                  className="eventsTab"
                  style={{ background: showMap ? '#9333ea' : 'white', color: showMap ? 'white' : '#333' }}
                >
                  📍 {showMap ? 'Hide Map' : 'Show Map'}
                </button>
              </div>

              {showMap && (
                <MapOverlay 
                  creators={filteredCreators}
                  userLocation={userLocation}
                  onClose={() => setShowMap(false)}
                />
              )}

              <div style={{ marginTop: '20px' }}>
                <CreatorGrid creators={filteredCreators} userLocation={userLocation} />
              </div>
            </>
          )}

          {/* NEW: Show Listings Tab */}
          {activeTab === 'listings' && (
            <div className="eventsGrid">
              {listings.length > 0 ? (
                listings.map(listing => (
                  <div key={listing.id} className="eventCard">
                    <div className="eventContent">
                      <h3 className="eventTitle">{listing.title}</h3>
                      <p className="eventDescription">{listing.description}</p>
                      
                      <div style={{ margin: '12px 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="eventsTab" style={{ 
                          display: 'inline-block', 
                          fontSize: '12px',
                          background: '#f0e7ff',
                          color: '#7c3aed'
                        }}>
                          {listing.role_type}
                        </span>
                        {listing.budget && (
                          <span className="eventsTab" style={{ 
                            display: 'inline-block', 
                            fontSize: '12px',
                            background: '#dcfce7',
                            color: '#16a34a'
                          }}>
                            {listing.budget}
                          </span>
                        )}
                      </div>

                      <div className="eventFooter">
                        <div className="eventLocation">
                          <span className="eventLocationIcon">📍</span>
                          <div>
                            <p className="eventLocationName">{listing.location}</p>
                            <p className="eventDate">
                              {listing.deadline ? new Date(listing.deadline).toLocaleDateString() : 'No deadline'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="eventsEmpty">
                  <p>No job listings yet. Create the first one!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        className="fab-create"
        onClick={() => setShowCreateForm(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'linear-gradient(90deg, #9333ea 0%, #c084fc 100%)',
          color: 'white',
          border: 'none',
          padding: '16px 24px',
          borderRadius: '50px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
          zIndex: 100
        }}
      >
        ➕ Create Listing
      </button>

      {/* Create Listing Modal */}
      {showCreateForm && (
        <CreateListingForm 
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleNewListing}
        />
      )}
    </>
  );
}

export default Home;