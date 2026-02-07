import { useState, useEffect } from 'react'
import './Events.css'
import EventCard from '../components/EventCard'
import Navbar from '../components/Navbar.jsx'
import SideTab from '../components/SideTab.jsx'

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
    <>
      <Navbar />
      <SideTab />
      <div className="eventsPage">
        {/* Header */}
        <div className="eventsHeader">
          <div className="eventsHeaderContent">
            <div className="eventsBrand">
              <div className="eventsLogo">C</div>
              <span className="eventsBrandText">CASTLY</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="eventsContainer">
          <div className="eventsTitle">
            <h1>Events Near You</h1>
            <p>Discover workshops, meetups, and networking opportunities</p>
          </div>

          {/* Filter Buttons */}
          <div className="eventsTabs">
            <button className="eventsTab active">All Events</button>
            <button className="eventsTab">This Week</button>
            <button className="eventsTab">This Month</button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="eventsLoading">
              <div className="eventsSpinner"></div>
              <p>Loading events...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="eventsError">
              <p className="eventsErrorMessage">Error: {error}</p>
              <p>Make sure the backend server is running</p>
            </div>
          )}

          {/* Events Grid */}
          {!loading && !error && (
            <div className="eventsGrid">
              {events.map(event => (
                <div key={event.id} className="eventCard">
                  <img src={event.image_url} alt={event.title} className="eventImage" />
                  
                  <div className="eventContent">
                    <h3 className="eventTitle">{event.title}</h3>
                    <p className="eventDescription">{event.description}</p>
                    
                    <div className="eventFooter">
                      <div className="eventLocation">
                        <span className="eventLocationIcon">📍</span>
                        <div>
                          <p className="eventLocationName">{event.location}</p>
                          <p className="eventDate">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <span className="eventDistance">{event.distance} mi</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && events.length === 0 && (
            <div className="eventsEmpty">
              <p>No events found nearby</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}