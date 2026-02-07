import React, { useState } from 'react';

function CreatorCard({ creator, userLocation }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMediaHeight = () => {
    // Randomize heights for Pinterest effect
    const heights = ['small', 'medium', 'large'];
    const randomIndex = Math.floor(Math.random() * heights.length);
    return heights[randomIndex];
  };

  const getTypeClass = (type) => {
    const typeMap = {
      'filmmaker': 'type-filmmaker',
      'actor': 'type-actor',
      'cameraman': 'type-cameraman',
      'editor': 'type-editor'
    };
    return typeMap[type.toLowerCase()] || 'type-filmmaker';
  };

  const handleConnect = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/connections/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_user_id: creator.id })
      });
      
      if (response.ok) {
        alert('Connection request sent!');
      }
    } catch (error) {
      console.error('Error sending connection:', error);
      alert('Could not send connection request. Please try again.');
    }
  };

  const handleMessage = () => {
    // Navigate to messaging or open modal
    console.log('Message:', creator.name);
    alert(`Messaging feature coming soon! You wanted to message ${creator.name}`);
  };

  return (
    <div className={`creator-card ${isExpanded ? 'expanded' : ''}`}>
      <div className={`card-media ${getMediaHeight()}`}>
        <span className="demo-label">{creator.portfolio_type || 'Portfolio'}</span>
        <img src={creator.portfolio_image} alt={creator.name} />
        <span className={`media-overlay ${getTypeClass(creator.creative_type)}`}>
          {creator.creative_type.charAt(0).toUpperCase() + creator.creative_type.slice(1)}
        </span>
      </div>

      <div className="card-footer">
        <div className="creator-info">
          <img 
            src={creator.profile_image} 
            alt={creator.name} 
            className="creator-avatar"
          />
          <div className="creator-details">
            <div className="creator-name">{creator.name}</div>
            <div className="creator-type">{creator.title}</div>
          </div>
          <div className="distance">📍 {creator.distance_km} mi</div>
        </div>
      </div>

      <div className="arrow-container">
        <div 
          className="dropdown-arrow"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          ▼
        </div>
      </div>

      <div className="card-dropdown">
        <div className="dropdown-section">
          <h4>About</h4>
          <p>{creator.bio}</p>
          <span className={`status-badge ${creator.status === 'open_to_work' ? 'status-open' : 'status-looking'}`}>
            {creator.status === 'open_to_work' ? '🟢 Open to Work' : '💡 Looking for Inspiration'}
          </span>
        </div>

        <div className="dropdown-section">
          <h4>Skills</h4>
          <div className="skills-tags">
            {creator.skills && creator.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-connect" onClick={handleConnect}>
            Connect
          </button>
          <button className="btn-message" onClick={handleMessage}>
            Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;