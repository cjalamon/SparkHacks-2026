export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      {/* Event Image */}
      <img 
        src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'} 
        alt={event.title}
        className="w-full h-56 object-cover"
      />
      
      {/* Event Details */}
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
        
        {/* Location & Distance Bar (Airbnb Style) */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-sm font-semibold text-purple-600">{event.location}</p>
              <p className="text-xs text-gray-500">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          {/* Distance Marker */}
          <span className="text-sm font-bold text-purple-600 bg-pink-100 px-3 py-1 rounded-full">
            {event.distance || '2.5'} mi
          </span>
        </div>
      </div>
    </div>
  )
}