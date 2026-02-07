import React from 'react';

function MapOverlay({ creators, userLocation, onClose }) {
  return (
    <div className="map-overlay active">
      <div className="map-placeholder">
        <h3>🗺️ Interactive Map</h3>
        <p style={{ color: '#666' }}>Shows creators' locations with pins</p>
        <p style={{ color: '#666' }}>Click on pins to see profile preview</p>
        <p style={{ color: '#999', marginTop: '20px', fontSize: '0.9rem' }}>
          Found {creators.length} creator{creators.length !== 1 ? 's' : ''} in your area
        </p>
        {/* 
          Here you would integrate Google Maps API:
          
          <GoogleMap
            center={userLocation}
            zoom={12}
            markers={creators.map(c => ({
              lat: c.lat,
              lng: c.lng,
              label: c.name
            }))}
          />
        */}
        <button className="filter-btn" onClick={onClose} style={{ marginTop: '20px' }}>
          Close Map
        </button>
      </div>
    </div>
  );
}

export default MapOverlay;