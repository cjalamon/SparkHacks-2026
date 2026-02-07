import { useState, useEffect } from "react";
import "./profile.css";
import Navbar from "../components/Navbar.jsx";
import SideTab from "../components/SideTab.jsx";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Your Name",
    pronouns: "",
    creativeType: "",
    bio: "",
    email: "",
    intent: "",
    location: "City, State",
    about: "Passionate about creating engaging content and connecting with fellow creators. Always interested in collaborations and new opportunities to grow together.",
    photoUrl: "https://via.placeholder.com/150",
    skills: [],
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
  const [skillInput, setSkillInput] = useState("");

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("castly_profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData((prev) => ({ ...prev, ...parsedProfile }));
        setEditForm((prev) => ({ ...prev, ...parsedProfile }));
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
  }, []);

  const handleEditClick = () => {
    setEditForm(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editForm);
    // Save to localStorage
    localStorage.setItem("castly_profile", JSON.stringify(editForm));
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

  const handleAddSkill = (skill) => {
    if (skill.trim() && !editForm.skills.includes(skill.trim())) {
      setEditForm((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const handleRemoveSkill = (index) => {
    setEditForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
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
    <>
      <Navbar />
      <SideTab />
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
                <span>Pronouns</span>
                <input
                  type="text"
                  name="pronouns"
                  value={editForm.pronouns}
                  onChange={handleInputChange}
                  placeholder="E.g., she/her, they/them"
                />
              </label>
              <label>
                <span>Creative Type</span>
                <input
                  type="text"
                  name="creativeType"
                  value={editForm.creativeType}
                  onChange={handleInputChange}
                  placeholder="E.g., Filmmaker, Designer, Editor"
                />
              </label>
              <label>
                <span>Bio</span>
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows="3"
                ></textarea>
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

              {/* Skills Editing Section */}
              <div>
                <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "700", color: "var(--text)" }}>
                  Skills
                </h3>
                <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill(skillInput);
                        setSkillInput("");
                      }
                    }}
                    placeholder="e.g., Video Editing, Cinematography"
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      border: "1px solid rgba(155, 89, 255, 0.12)",
                      borderRadius: "8px",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      color: "white",
                      background: "rgba(43, 16, 54, 0.8)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAddSkill(skillInput);
                      setSkillInput("");
                    }}
                    style={{
                      padding: "10px 16px",
                      background: "var(--accent)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {editForm.skills && editForm.skills.map((skill, index) => (
                    <div
                      key={index}
                      style={{
                        background: "linear-gradient(90deg, rgba(155,89,255,0.1), rgba(255,157,193,0.06))",
                        color: "var(--accent)",
                        padding: "8px 12px",
                        borderRadius: "18px",
                        fontSize: "13px",
                        border: "1px solid rgba(155,89,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--accent)",
                          fontSize: "18px",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

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
            {profileData.pronouns && <p className="profile-pronouns">{profileData.pronouns}</p>}
            {profileData.creativeType && <p className="profile-creative">{profileData.creativeType}</p>}
            <p className="profile-location">📍 {profileData.location}</p>

            <button className="btn-primary" onClick={handleEditClick}>
              Edit Profile
            </button>
            <button className="btn-secondary">Share Profile</button>
          </div>

          {/* About Section */}
          <div className="profile-section">
            <h2>About</h2>
            <p>{profileData.bio || profileData.about}</p>
          </div>

          {/* Skills Section */}
          <div className="profile-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {profileData.skills && profileData.skills.length > 0 ? (
                profileData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))
              ) : (
                <p style={{ color: "#8b6f8f", fontSize: "14px" }}>No skills added yet. Edit your profile to add skills.</p>
              )}
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
    </>
  );
}
