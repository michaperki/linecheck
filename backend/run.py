from app import app
from flask_cors import CORS

# Enable CORS for all routes
CORS(app)

if __name__ == '__main__':
    app.run(debug=False)