import React from 'react';
import CreatorCard from './CreatorCard';

function CreatorGrid({ creators, userLocation }) {
  return (
    <div className="container">
      <div className="masonry-grid">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <CreatorCard 
              key={creator.id}
              creator={creator}
              userLocation={userLocation}
            />
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
            <p>No creators found in your area. Try adjusting your filters!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatorGrid;