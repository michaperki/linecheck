from flask import Flask
from flask_cors import CORS
import os
from app.config import Config  # Import the configuration

app = Flask(__name__)
CORS(app)

# Set the upload and processed folder paths using the configuration
PROCESSED_FOLDER = Config.PROCESSED_FOLDER
UPLOAD_FOLDER = Config.UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    
if not os.path.exists(PROCESSED_FOLDER):
    os.makedirs(PROCESSED_FOLDER)
    
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER

# Import and register your routes here
from app.routes import *

if __name__ == '__main__':
    app.run(debug=True)  # Set debug mode to True for development
