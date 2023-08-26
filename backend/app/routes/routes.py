# app/routes/routes.py
from flask import request, jsonify, send_from_directory
from app import app
from app.modules.video_processing import process_video
from app.modules.image_processing import process_image
from app.modules.ocr_processing import process_ocr_image
import os

# Define your routes here

@app.route('/processed_frames/<path:filename>')
def processed_frames(filename):
    return send_from_directory('processed_videos', filename)
