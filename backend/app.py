from flask import Flask
from flask_cors import CORS
import os
from app.modules.video_processing import process_video
from app.modules.image_processing import process_image
from app.modules.ocr_processing import process_ocr_image


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'temp_videos'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Import and register your routes here
from app.routes.routes import *

if __name__ == '__main__':
    app.run(debug=False)
