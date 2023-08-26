from app import app
from flask_cors import CORS

# Load configuration
app.config.from_object('app.config.Config')

# Enable CORS for all routes
CORS(app)

if __name__ == '__main__':
    app.run(debug=False)