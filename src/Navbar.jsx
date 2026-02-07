import React from 'react';

function Navbar({ searchQuery, setSearchQuery, toggleMap }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">Castly</div>
        
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search for filmmakers, actors, cameramen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="nav-actions">
        <button className="map-toggle" onClick={toggleMap}>
          📍 Map View
        </button>
        <button className="filter-btn">Filters</button>
        <img 
          src="https://i.pravatar.cc/150?img=12" 
          alt="Profile" 
          className="profile-pic-nav"
        />
      </div>
    </nav>
  );
}

export default Navbar;