import { useState } from 'react'
import './CreateListingForm.css'

export default function CreateListingForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    role_type: 'filmmaker',
    budget: '',
    location: '',
    deadline: '',
    contact_email: '',
    skills_needed: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
        const response = await fetch('http://localhost:5001/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...formData,
            latitude: 34.0522,
            longitude: -118.2437
        })
        })
        
        if (response.ok) {
        const newListing = await response.json()
        onSubmit(newListing)
        onClose()
        alert('Listing created successfully!')
        } else {
        alert('Failed to create listing')
        }
    } catch (err) {
        console.error('Error creating listing:', err)
        alert('Error: Make sure backend is running on port 5001')
    }
}

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Job Listing</h2>
        
        <form onSubmit={handleSubmit}>
          <label>
            <span>Job Title</span>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Looking for Cinematographer"
              required
            />
          </label>

          <label>
            <span>Description</span>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the project, role requirements, expectations..."
              rows="5"
              required
            />
          </label>

          <label>
            <span>Role Type</span>
            <select
              value={formData.role_type}
              onChange={(e) => setFormData({...formData, role_type: e.target.value})}
              required
            >
              <option value="filmmaker">Filmmaker</option>
              <option value="actor">Actor</option>
              <option value="photographer">Photographer</option>
              <option value="editor">Editor</option>
              <option value="cinematographer">Cinematographer</option>
              <option value="producer">Producer</option>
              <option value="writer">Writer</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            <span>Budget (Optional)</span>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              placeholder="$500 - $1000 or Unpaid/TFP"
            />
          </label>

          <label>
            <span>Location</span>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Downtown LA"
              required
            />
          </label>

          <label>
            <span>Deadline/Start Date</span>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              required
            />
          </label>

          <label>
            <span>Contact Email</span>
            <input
              type="email"
              value={formData.contact_email}
              onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
              placeholder="your@email.com"
              required
            />
          </label>

          <label>
            <span>Skills Needed (Optional)</span>
            <input
              type="text"
              value={formData.skills_needed}
              onChange={(e) => setFormData({...formData, skills_needed: e.target.value})}
              placeholder="Adobe Premiere, Color Grading, 4K Camera"
            />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="btn-primary">Post Listing</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}