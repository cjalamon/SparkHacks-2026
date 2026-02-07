from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Database configuration (SQLite for simplicity)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///castly.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Event Model
class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(200))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    date = db.Column(db.DateTime)
    distance = db.Column(db.Float)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'date': self.date.isoformat() if self.date else None,
            'distance': self.distance,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# Create tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def home():
    return jsonify({"message": "Castly API is running! 🎬"})

@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    
    # If no events in database, return sample data
    if not events:
        sample_events = [
            {
                'id': 1,
                'title': 'Film Networking Mixer',
                'description': 'Join local filmmakers for networking and collaboration.',
                'location': 'Downtown Arts District',
                'latitude': 34.0522,
                'longitude': -118.2437,
                'date': '2026-02-15T19:00:00',
                'distance': 2.3,
                'image_url': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
                'created_at': datetime.utcnow().isoformat()
            },
            {
                'id': 2,
                'title': 'Creative Workshop: Editing',
                'description': 'Learn advanced editing techniques from pros.',
                'location': 'Creative Space LA',
                'latitude': 34.0689,
                'longitude': -118.4452,
                'date': '2026-02-20T14:00:00',
                'distance': 4.7,
                'image_url': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600',
                'created_at': datetime.utcnow().isoformat()
            },
            {
                'id': 3,
                'title': 'Actor Showcase Night',
                'description': 'Showcase your talent and connect with directors.',
                'location': 'Theater District',
                'latitude': 34.0407,
                'longitude': -118.2468,
                'date': '2026-02-25T18:30:00',
                'distance': 1.2,
                'image_url': 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600',
                'created_at': datetime.utcnow().isoformat()
            },
            {
                'id': 4,
                'title': 'Photography Meetup',
                'description': 'Monthly photography meetup for all skill levels.',
                'location': 'Griffith Park',
                'latitude': 34.1341,
                'longitude': -118.2943,
                'date': '2026-03-01T10:00:00',
                'distance': 5.8,
                'image_url': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600',
                'created_at': datetime.utcnow().isoformat()
            },
            {
                'id': 5,
                'title': 'Indie Film Screening',
                'description': 'Watch and discuss independent films from local creators.',
                'location': 'Indie Cinema',
                'latitude': 34.0928,
                'longitude': -118.3287,
                'date': '2026-03-05T20:00:00',
                'distance': 3.1,
                'image_url': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600',
                'created_at': datetime.utcnow().isoformat()
            },
            {
                'id': 6,
                'title': 'Music Video Production Workshop',
                'description': 'Learn the art of music video production.',
                'location': 'Studio City',
                'latitude': 34.1472,
                'longitude': -118.3965,
                'date': '2026-03-10T15:00:00',
                'distance': 6.4,
                'image_url': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600',
                'created_at': datetime.utcnow().isoformat()
            }
        ]
        return jsonify(sample_events)
    
    return jsonify([event.to_dict() for event in events])

@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_dict())

@app.route('/api/events', methods=['POST'])
def create_event():
    from flask import request
    data = request.get_json()
    
    new_event = Event(
        title=data['title'],
        description=data.get('description'),
        location=data['location'],
        latitude=data['latitude'],
        longitude=data['longitude'],
        date=datetime.fromisoformat(data['date']),
        image_url=data.get('image_url'),
        distance=data.get('distance', 0.0)
    )
    
    db.session.add(new_event)
    db.session.commit()
    
    return jsonify(new_event.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True, port=5001)