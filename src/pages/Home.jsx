import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar.jsx';
import SideTab from '../components/SideTab.jsx';
import CreateListingForm from '../components/CreateListingForm.jsx';

function Home() {
  const [listings, setListings] = useState([]); // Changed from creators to listings
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch job listings
  const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/listings');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Handle new listing submission
  const handleNewListing = (newListing) => {
    setListings(prev => [newListing, ...prev]); // Add to top of list
  };

  // Filter listings by search
  const filteredListings = listings.filter(listing => 
    searchQuery === '' || 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <SideTab />
      <div className="eventsPage">
        {/* Header */}
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
            <h1>Job Listings</h1>
            <p>Find creative opportunities and collaborations</p>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text"
              placeholder="Search job listings..."
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

          {/* Create Listing Button */}
          <div className="eventsTabs">
            <button 
              className="eventsTab"
              onClick={() => setShowCreateForm(true)}
              style={{ background: '#9333ea', color: 'white' }}
            >
              + Create Listing
            </button>
          </div>

          {/* Job Listings Grid */}
          <div className="eventsGrid">
            {filteredListings.length > 0 ? (
              filteredListings.map(listing => (
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
                            Deadline: {listing.deadline ? new Date(listing.deadline).toLocaleDateString() : 'Not specified'}
                          </p>
                        </div>
                      </div>
                      {listing.contact_email && (
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          📧 {listing.contact_email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="eventsEmpty">
                <p>No job listings yet. Be the first to post!</p>
              </div>
            )}
          </div>
        </div>
      </div>

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