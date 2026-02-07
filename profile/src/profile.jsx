import "./profile.css";

export default function Profile() {
  return (
    <div className="profile-container">
      {/* Header Banner */}
      <div className="profile-banner"></div>

      {/* Main Profile Content */}
      <div className="profile-wrapper">
        {/* Left Section */}
        <div className="profile-left">
          {/* Profile Card */}
          <div className="profile-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-photo"
            />
            <h1 className="profile-name">Your Name</h1>
            <p className="profile-headline">Content Creator | Filmmaker | Entrepreneur</p>
            <p className="profile-location">📍 San Francisco Bay Area</p>

            <button className="btn-primary">Edit Profile</button>
            <button className="btn-secondary">Share Profile</button>
          </div>

          {/* About Section */}
          <div className="profile-section">
            <h2>About</h2>
            <p>
              Passionate about creating engaging content and connecting with fellow creators. 
              Always interested in collaborations and new opportunities to grow together.
            </p>
          </div>

          {/* Skills Section */}
          <div className="profile-section">
            <h2>Skills</h2>
            <div className="skills-list">
              <span className="skill-tag">Video Production</span>
              <span className="skill-tag">Content Creation</span>
              <span className="skill-tag">Social Media</span>
              <span className="skill-tag">Editing</span>
              <span className="skill-tag">Photography</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="profile-right">
          {/* Experience Section */}
          <div className="profile-section">
            <h2>Experience</h2>
            <div className="experience-item">
              <div className="experience-header">
                <h3>Content Creator</h3>
                <span className="experience-company">Self-Employed</span>
              </div>
              <p className="experience-duration">Jan 2023 - Present</p>
              <p className="experience-description">
                Creating and producing engaging video content across multiple platforms.
              </p>
            </div>
            <div className="experience-item">
              <div className="experience-header">
                <h3>Freelance Videographer</h3>
                <span className="experience-company">Various Studios</span>
              </div>
              <p className="experience-duration">Jun 2022 - Dec 2022</p>
              <p className="experience-description">
                Collaborated on commercial and promotional video projects.
              </p>
            </div>
          </div>

          {/* Connections Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Connections</h2>
              <span className="connection-count">247 followers</span>
            </div>
            <div className="connections-grid">
              <div className="connection-card">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Connection"
                  className="connection-photo"
                />
                <p className="connection-name">Creator Name</p>
              </div>
              <div className="connection-card">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Connection"
                  className="connection-photo"
                />
                <p className="connection-name">Creator Name</p>
              </div>
              <div className="connection-card">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Connection"
                  className="connection-photo"
                />
                <p className="connection-name">Creator Name</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}