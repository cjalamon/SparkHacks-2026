from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
@app.route("/")
def home():
    return "Backend is running!"

CORS(app)

# Mock data for testing
mock_users = [
    {
        'id': 1,
        'name': 'Alex Rivera',
        'creative_type': 'filmmaker',
        'title': 'Independent Filmmaker',
        'bio': 'Award-winning filmmaker specializing in documentary and narrative shorts.',
        'profile_image': 'https://i.pravatar.cc/150?img=33',
        'portfolio_image': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500',
        'portfolio_type': 'Video Reel',
        'skills': ['Directing', 'Cinematography', 'Editing'],
        'status': 'open_to_work',
        'distance_km': 2.3,
        'lat': 41.8901,
        'lng': -87.6398
    },
    {
        'id': 2,
        'name': 'Sarah Chen',
        'creative_type': 'actor',
        'title': 'Theater & Film Actor',
        'bio': 'Classically trained actor with 5+ years experience.',
        'profile_image': 'https://i.pravatar.cc/150?img=45',
        'portfolio_image': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
        'portfolio_type': 'Headshot',
        'skills': ['Drama', 'Comedy', 'Voice Acting'],
        'status': 'open_to_work',
        'distance_km': 0.8,
        'lat': 41.8821,
        'lng': -87.6278
    },
    {
        'id': 3,
        'name': 'Marcus Johnson',
        'creative_type': 'cameraman',
        'title': 'DP & Camera Operator',
        'bio': 'Professional cinematographer with RED camera package.',
        'profile_image': 'https://i.pravatar.cc/150?img=68',
        'portfolio_image': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
        'portfolio_type': 'Portfolio Sample',
        'skills': ['RED Camera', 'Gimbal Work', 'Lighting'],
        'status': 'looking_for_inspiration',
        'distance_km': 4.1,
        'lat': 41.8701,
        'lng': -87.6198
    }
]

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend is working!'})

@app.route('/api/users/nearby', methods=['GET'])
def nearby_users():
    return jsonify(mock_users)

if __name__ == '__main__':
    app.run(debug=True, port=5000)