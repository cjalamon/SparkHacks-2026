import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import SideTab from '../components/SideTab.jsx';
import CreateListingForm from '../components/CreateListingForm';

function Jobs() {
  const [listings, setListings] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/listings');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleNewListing = (newListing) => {
    setListings(prev => [newListing, ...prev]); // Add to top
    fetchListings(); // Also refresh from server
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
            <nav className="eventsNav">
              <a href="/home" className="eventsNavLink">Home</a>
              <a href="/jobs" className="eventsNavLink active">Jobs</a>
              <a href="/events" className="eventsNavLink">Events</a>
              <a href="/profile" className="eventsNavLink">Profile</a>
            </nav>
          </div>
        </div>

        <div className="eventsContainer">
          <div className="eventsTitle">
            <h1>Job Listings</h1>
            <p>Find creative opportunities near you</p>
          </div>

          <button 
            onClick={() => setShowCreateForm(true)}
            className="eventsTab"
            style={{ background: '#9333ea', color: 'white', marginBottom: '20px' }}
          >
            + Create Listing
          </button>

          {showCreateForm && (
            <CreateListingForm 
              onClose={() => setShowCreateForm(false)}
              onSubmit={handleNewListing}
            />
          )}

          <div className="eventsGrid">
            {listings.map(listing => (
              <div key={listing.id} className="eventCard">
                <div className="eventContent">
                  <h3 className="eventTitle">{listing.title}</h3>
                  <p className="eventDescription">{listing.description}</p>
                  <div className="eventFooter">
                    <span className="skill-tag">{listing.role_type}</span>
                    <span>{listing.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;