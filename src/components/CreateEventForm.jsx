import { useState } from 'react'
import './CreateEventForm.css'

export default function CreateEventForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    image_url: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:5001/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          latitude: 34.0522,
          longitude: -118.2437,
          distance: 0
        })
      })
      
      if (response.ok) {
        const newEvent = await response.json()
        onSubmit(newEvent)
        onClose()
      }
    } catch (err) {
      console.error('Error creating event:', err)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Event</h2>
        
        <form onSubmit={handleSubmit}>
          <label>
            <span>Event Title</span>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Film Networking Mixer"
              required
            />
          </label>

          <label>
            <span>Description</span>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Join local filmmakers for networking and collaboration."
              rows="4"
              required
            />
          </label>

          <label>
            <span>Location</span>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Downtown Arts District"
              required
            />
          </label>

          <label>
            <span>Date & Time</span>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </label>

          <label>
            <span>Image URL</span>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="btn-primary">Create Event</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}