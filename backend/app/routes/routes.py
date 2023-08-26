# app/routes/routes.py
from flask import request, jsonify, send_from_directory
from app import app
from app.modules.video_processing import process_video
import os

@app.route('/process_video', methods=['POST'])
def process_video_route():
    try:
        video = request.files['video']
        video_path = os.path.join(app.config['UPLOAD_FOLDER'], video.filename)
        video.save(video_path)

        # Process the video and get the processed frame path
        processed_frame_path = process_video(video_path)

        # Create a sub-folder in PROCESSED_FOLDER using video title as the folder name
        video_title = os.path.splitext(video.filename)[0]
        video_processed_folder = os.path.join(app.config['PROCESSED_FOLDER'], video_title)
        os.makedirs(video_processed_folder, exist_ok=True)

        # Move the processed frame to the video-specific processed folder
        processed_frame_dest = os.path.join(video_processed_folder, os.path.basename(processed_frame_path))
        os.rename(processed_frame_path, processed_frame_dest)

        # Move the original video to the video-specific processed folder
        video_dest = os.path.join(video_processed_folder, video.filename)
        os.rename(video_path, video_dest)

        return jsonify({'success': True, 'processed_frame_path': processed_frame_dest})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/processed_videos/<path:filename>')
def processed_videos(filename):
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)

@app.route('/fetch_image', methods=['GET'])
def fetch_image():
    try:
        # Construct the processed image path dynamically based on your logic
        processed_image_path = "/processed_videos/d5/0.jpg"  # Replace this with your dynamic logic

        return jsonify({'success': True, 'processed_image_path': processed_image_path})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})