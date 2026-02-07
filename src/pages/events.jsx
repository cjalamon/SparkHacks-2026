import { useState, useEffect } from 'react'
import './Events.css'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5001/api/events')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch events')
        return response.json()
      })
      .then(data => {
        setEvents(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching events:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="events-page">
      {/* Header */}
      <div className="events-header">
        <div className="header-content">
          <h1 className="brand-name">CASTLY</h1>
          <nav className="nav-links">
            <a href="/home">Home</a>
            <a href="/events" className="active">Events</a>
            <a href="/profile">Profile</a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="events-container">
        <div className="events-title">
          <h1>Events Near You</h1>
          <p>Discover workshops, meetups, and networking opportunities</p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button className="filter-btn active">All Events</button>
          <button className="filter-btn">This Week</button>
          <button className="filter-btn">This Month</button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-state">
            <p className="error-message">Error: {error}</p>
            <p>Make sure the backend server is running</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <img src={event.image_url} alt={event.title} className="event-image" />
                
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-footer">
                    <div className="event-location">
                      <span className="location-icon">📍</span>
                      <div>
                        <p className="location-name">{event.location}</p>
                        <p className="event-date">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <span className="distance-badge">{event.distance} mi</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="empty-state">
            <p>No events found nearby</p>
          </div>
        )}
      </div>
    </div>
  )
}