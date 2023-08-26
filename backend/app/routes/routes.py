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

@app.route('/process_video', methods=['POST'])
def process_video_route():
    try:
        video = request.files['video']
        video_path = os.path.join(app.config['UPLOAD_FOLDER'], video.filename)
        video.save(video_path)
        processed_frame_path = process_video(video_path)  # Use the process_video function

        # Move the processed video to the configured PROCESSED_FOLDER
        processed_filename = os.path.basename(processed_frame_path)
        processed_frame_dest = os.path.join(app.config['PROCESSED_FOLDER'], processed_filename)
        os.rename(processed_frame_path, processed_frame_dest)

        return jsonify({'success': True, 'processed_frame_path': processed_frame_dest})
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'error': str(e)})
