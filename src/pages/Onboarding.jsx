import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

export default function Onboarding() {
  const nav = useNavigate();
  
  // Get current user email from localStorage
  const currentUserEmail = useMemo(() => {
    return localStorage.getItem("castly_current_user") || "";
  }, []);

  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [currentExp, setCurrentExp] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Add skill
  function addSkill() {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  }

  // Remove skill
  function removeSkill(index) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  // Add experience
  function addExperience() {
    if (
      currentExp.title.trim() &&
      currentExp.company.trim() &&
      currentExp.duration.trim()
    ) {
      setExperiences([
        ...experiences,
        { ...currentExp, id: Date.now() },
      ]);
      setCurrentExp({
        title: "",
        company: "",
        duration: "",
        description: "",
      });
    }
  }

  // Remove experience
  function removeExperience(id) {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  }

  function save() {
    setErr("");
    if (!name.trim()) {
      setErr("Please enter your name");
      return;
    }

    setLoading(true);
    try {
      // Get all users
      const users = JSON.parse(localStorage.getItem("castly_users") || "[]");
      
      // Find and update current user
      const userIndex = users.findIndex(
        (u) => u.email.toLowerCase() === currentUserEmail.toLowerCase()
      );

      if (userIndex === -1) {
        setErr("User not found");
        setLoading(false);
        return;
      }

      // Update user profile
      users[userIndex] = {
        ...users[userIndex],
        name: name.trim(),
        pronouns,
        creativeType,
        bio,
        location,
        skills,
        experiences,
      };

      // Save updated users list
      localStorage.setItem("castly_users", JSON.stringify(users));

      // Save profile to localStorage
      localStorage.setItem("castly_profile", JSON.stringify(users[userIndex]));

      // Redirect to home
      nav("/home");
    } catch (error) {
      setErr("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="onboarding-container">
        <div className="onboarding-card">
          <h1>Build Your Creator Profile</h1>
          <p className="onboarding-subtitle">Tell us about yourself and your creative work</p>

          <div className="onboarding-form">
            {/* Basic Info */}
            <div className="form-section">
              <h2>Basic Information</h2>
              <label>
                <span>Full Name *</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                />
              </label>
              <label>
                <span>Pronouns</span>
                <input
                  type="text"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  placeholder="e.g., she/her, they/them"
                />
              </label>
              <label>
                <span>Creative Type</span>
                <input
                  type="text"
                  value={creativeType}
                  onChange={(e) => setCreativeType(e.target.value)}
                  placeholder="e.g., Filmmaker, Designer, Editor"
                />
              </label>
              <label>
                <span>About / Bio</span>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself and your creative journey..."
                  rows="4"
                />
              </label>
              <label>
                <span>Location</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., City, State"
                />
              </label>
            </div>

            {/* Skills Section */}
            <div className="form-section">
              <h2>Skills</h2>
              <div className="skill-input-group">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  placeholder="e.g., Video Editing, Cinematography"
                />
                <button type="button" onClick={addSkill} className="btn-add">
                  Add Skill
                </button>
              </div>
              <div className="skills-display">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiences Section */}
            <div className="form-section">
              <h2>Experiences</h2>
              <div className="exp-input-group">
                <input
                  type="text"
                  value={currentExp.title}
                  onChange={(e) =>
                    setCurrentExp({ ...currentExp, title: e.target.value })
                  }
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={currentExp.company}
                  onChange={(e) =>
                    setCurrentExp({ ...currentExp, company: e.target.value })
                  }
                  placeholder="Company / Organization"
                />
                <input
                  type="text"
                  value={currentExp.duration}
                  onChange={(e) =>
                    setCurrentExp({ ...currentExp, duration: e.target.value })
                  }
                  placeholder="Duration (e.g., Jan 2023 - Present)"
                />
                <textarea
                  value={currentExp.description}
                  onChange={(e) =>
                    setCurrentExp({
                      ...currentExp,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description of your work"
                  rows="2"
                />
                <button type="button" onClick={addExperience} className="btn-add">
                  Add Experience
                </button>
              </div>

              {/* Display Experiences */}
              <div className="experiences-display">
                {experiences.map((exp) => (
                  <div key={exp.id} className="exp-card">
                    <div className="exp-header">
                      <h3>{exp.title}</h3>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="remove-btn-large"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="exp-company">{exp.company}</p>
                    <p className="exp-duration">{exp.duration}</p>
                    {exp.description && (
                      <p className="exp-description">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {err && <div className="onboarding-error">{err}</div>}

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                onClick={save}
                className="btn-primary"
                disabled={loading}
              >
                {loading ? "Saving..." : "Complete Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}