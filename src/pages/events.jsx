import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'
import Navbar from '../components/Navbar.jsx'
import SideTab from '../components/SideTab.jsx'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch events from backend
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
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-2 border-pink-200">
        <div className="container mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-purple-600">CASTLY</h1>
            <nav className="flex gap-6">
              <a href="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</a>
              <a href="/events" className="text-purple-600 font-bold">Events</a>
              <a href="/profile" className="text-gray-700 hover:text-purple-600 font-medium">Profile</a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Events Near You
          </h1>
          <p className="text-xl text-gray-600">
            Discover workshops, meetups, and networking opportunities
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition">
            All Events
          </button>
          <button className="px-6 py-2 bg-white text-purple-600 border-2 border-purple-200 rounded-full font-semibold hover:bg-pink-50 transition">
            This Week
          </button>
          <button className="px-6 py-2 bg-white text-purple-600 border-2 border-purple-200 rounded-full font-semibold hover:bg-pink-50 transition">
            This Month
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
            <p className="text-xl text-gray-500 mt-4">Loading events...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-xl text-red-500">Error: {error}</p>
            <p className="text-gray-500 mt-2">Make sure the backend server is running</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-4">No events found nearby</p>
          </div>
        )}
      </div>
    </div>
    </>
  )
}