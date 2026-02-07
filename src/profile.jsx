import { useState } from "react";
import "../profile/src/profile.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Your Name",
    headline: "Content Creator | Filmmaker | Entrepreneur",
    location: "San Francisco Bay Area",
    about: "Passionate about creating engaging content and connecting with fellow creators. Always interested in collaborations and new opportunities to grow together.",
    photoUrl: "https://via.placeholder.com/150",
    experiences: [
      {
        id: 1,
        title: "Content Creator",
        company: "Self-Employed",
        duration: "Jan 2023 - Present",
        description: "Creating and producing engaging video content across multiple platforms.",
      },
      {
        id: 2,
        title: "Freelance Videographer",
        company: "Various Studios",
        duration: "Jun 2022 - Dec 2022",
        description: "Collaborated on commercial and promotional video projects.",
      },
    ],
  });

  const [editForm, setEditForm] = useState(profileData);

  const handleEditClick = () => {
    setEditForm(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (id, field, value) => {
    setEditForm((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "",
      company: "",
      duration: "",
      description: "",
    };
    setEditForm((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const handleRemoveExperience = (id) => {
    setEditForm((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const handlePhotoUrlChange = (e) => {
    const { value } = e.target;
    setEditForm((prev) => ({ ...prev, photoUrl: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        setEditForm((prev) => ({ ...prev, photoUrl: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      {/* Header Banner */}
      <div className="profile-banner"></div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            
            {/* Photo Preview */}
            <div className="photo-preview-section">
              <img
                src={editForm.photoUrl}
                alt="Profile Preview"
                className="photo-preview"
              />
            </div>

            <form>
              {/* Photo Upload Options */}
              <div>
                <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "700", color: "var(--text)" }}>
                  Profile Photo
                </h3>
                
                <label>
                  <span>Upload from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="file-input"
                  />
                </label>

                <label>
                  <span>Or Paste Image URL</span>
                  <input
                    type="text"
                    value={editForm.photoUrl}
                    onChange={handlePhotoUrlChange}
                    placeholder="https://example.com/photo.jpg"
                  />
                </label>
              </div>

              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                />
              </label>
              <label>
                <span>Headline</span>
                <input
                  type="text"
                  name="headline"
                  value={editForm.headline}
                  onChange={handleInputChange}
                  placeholder="E.g., Content Creator | Filmmaker"
                />
              </label>
              <label>
                <span>Location</span>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                />
              </label>
              <label>
                <span>About</span>
                <textarea
                  name="about"
                  value={editForm.about}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows="5"
                ></textarea>
              </label>

              {/* Experience Editing Section */}
              <div>
                <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "700", color: "var(--text)" }}>
                  Experiences
                </h3>
                <div className="modal-experiences">
                  {editForm.experiences.map((exp) => (
                    <div key={exp.id} className="experience-form">
                      <h4>Experience {editForm.experiences.indexOf(exp) + 1}</h4>
                      <div className="experience-form-row">
                        <label>
                          <span>Title</span>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) =>
                              handleExperienceChange(exp.id, "title", e.target.value)
                            }
                            placeholder="Job Title"
                          />
                        </label>
                        <label>
                          <span>Company</span>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) =>
                              handleExperienceChange(exp.id, "company", e.target.value)
                            }
                            placeholder="Company Name"
                          />
                        </label>
                      </div>
                      <label>
                        <span>Duration</span>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) =>
                            handleExperienceChange(exp.id, "duration", e.target.value)
                          }
                          placeholder="Jan 2023 - Present"
                        />
                      </label>
                      <label>
                        <span>Description</span>
                        <textarea
                          value={exp.description}
                          onChange={(e) =>
                            handleExperienceChange(exp.id, "description", e.target.value)
                          }
                          placeholder="Tell us what you did..."
                        ></textarea>
                      </label>
                      <button
                        type="button"
                        className="btn-remove-exp"
                        onClick={() => handleRemoveExperience(exp.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-add-exp"
                  onClick={handleAddExperience}
                >
                  + Add Experience
                </button>
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Profile Content */}
      <div className="profile-wrapper">
        {/* Left Section */}
        <div className="profile-left">
          {/* Profile Card */}
          <div className="profile-card">
            <img
              src={profileData.photoUrl}
              alt="Profile"
              className="profile-photo"
            />
            <h1 className="profile-name">{profileData.name}</h1>
            <p className="profile-headline">{profileData.headline}</p>
            <p className="profile-location">📍 {profileData.location}</p>

            <button className="btn-primary" onClick={handleEditClick}>
              Edit Profile
            </button>
            <button className="btn-secondary">Share Profile</button>
          </div>

          {/* About Section */}
          <div className="profile-section">
            <h2>About</h2>
            <p>{profileData.about}</p>
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
            {profileData.experiences.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.title}</h3>
                  <span className="experience-company">{exp.company}</span>
                </div>
                <p className="experience-duration">{exp.duration}</p>
                <p className="experience-description">{exp.description}</p>
              </div>
            ))}
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