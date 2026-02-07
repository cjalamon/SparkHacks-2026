from flask import Flask, jsonify, request
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

class Listing(db.Model):
    __tablename__ = 'listings'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    role_type = db.Column(db.String(50), nullable=False)
    budget = db.Column(db.String(100))
    location = db.Column(db.String(200), nullable=False)
    deadline = db.Column(db.String(50), nullable=False)
    contact_email = db.Column(db.String(100), nullable=False)
    skills_needed = db.Column(db.String(500))
    latitude = db.Column(db.Float, default=0.0)
    longitude = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.String(50), default=lambda: datetime.now().isoformat())

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'role_type': self.role_type,
            'budget': self.budget,
            'location': self.location,
            'deadline': self.deadline,
            'contact_email': self.contact_email,
            'skills_needed': self.skills_needed,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'created_at': self.created_at
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

# Get all listings
@app.route('/api/listings', methods=['GET'])
def get_listings():
    try:
        listings = Listing.query.all()
        if not listings:
            # Return sample data if database is empty
            sample_listings = [
                {
                    'id': 1,
                    'title': 'Looking for Cinematographer',
                    'description': 'Need experienced cinematographer for short film project.',
                    'role_type': 'cinematographer',
                    'budget': '$500-$1000',
                    'location': 'Downtown LA',
                    'deadline': '2026-03-15',
                    'contact_email': 'filmmaker@example.com',
                    'skills_needed': '4K Camera, Color Grading',
                    'latitude': 34.0522,
                    'longitude': -118.2437,
                    'created_at': '2026-02-01T10:00:00'
                },
                {
                    'id': 2,
                    'title': 'Actors Needed for Indie Film',
                    'description': 'Casting for lead and supporting roles in indie drama.',
                    'role_type': 'actor',
                    'budget': 'Unpaid (Portfolio Building)',
                    'location': 'Santa Monica',
                    'deadline': '2026-02-20',
                    'contact_email': 'casting@indiefilm.com',
                    'skills_needed': 'Previous acting experience',
                    'latitude': 34.0195,
                    'longitude': -118.4912,
                    'created_at': '2026-01-28T14:30:00'
                }
            ]
            return jsonify(sample_listings)
        return jsonify([listing.to_dict() for listing in listings])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create new listing
@app.route('/api/listings', methods=['POST'])
def create_listing():
    try:
        data = request.json
        
        new_listing = Listing(
            title=data.get('title'),
            description=data.get('description'),
            role_type=data.get('role_type'),
            budget=data.get('budget', ''),
            location=data.get('location'),
            deadline=data.get('deadline'),
            contact_email=data.get('contact_email'),
            skills_needed=data.get('skills_needed', ''),
            latitude=data.get('latitude', 0.0),
            longitude=data.get('longitude', 0.0)
        )
        
        db.session.add(new_listing)
        db.session.commit()
        
        return jsonify(new_listing.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_dict())

@app.route('/api/events', methods=['POST'])
def create_event():
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