# app/routes/routes.py
from flask import Blueprint, request, send_from_directory, jsonify
import os
import cv2
import uuid
from app import app
from app.modules.video_processing import process_video

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


# new routes below

@app.route('/images/<path:video_id>/<path:frame_filename>')
def images(video_id, frame_filename):
    print("images endpoint")    
    # Construct the full path using the project's root directory
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))  # Adjust the number of '..' based on your project structure
    full_path = os.path.join(root_dir, 'backend', 'uploaded_videos', 'frames', video_id, frame_filename)
    print("Full path:", full_path)
    
    return send_from_directory(os.path.join(root_dir, 'backend', 'uploaded_videos', 'frames', video_id), frame_filename)

@app.route("/upload_video", methods=["POST"])
def upload_video():
    print("upload_video endpoint")
    if "video" not in request.files:
        return {"error": "No video file provided"}, 400

    video_file = request.files["video"]
    
    # Generate a unique ID for the video
    video_id = str(uuid.uuid4())
    
    # Define the path to store the video
    video_path = os.path.join(app.config["UPLOAD_FOLDER"], "videos", f"{video_id}.mp4")
    
    # Save the video file
    video_file.save(video_path)
    
    # Read the first frame from the video
    cap = cv2.VideoCapture(video_path)
    ret, frame = cap.read()
    cap.release()
    
    if not ret:
        return {"error": "Failed to read the first frame from the video"}, 500
    
    # Create a sub-folder in FRAMES_FOLDER using video ID as the folder name
    os.makedirs(os.path.join(app.config["UPLOAD_FOLDER"], "frames", video_id), exist_ok=True)
    
    # Define the path to store the first frame
    frame_path = os.path.join(app.config["UPLOAD_FOLDER"], "frames", video_id, "frame.jpg")    
    
    # Save the first frame
    cv2.imwrite(frame_path, frame)
    
    # Return a response indicating success and the generated video ID
    return {"success": True, "video_id": video_id, "frame_path": frame_path}

@app.route("/submit_selection", methods=["POST"])
def submit_selection():
    try:
        data = request.json  # Get JSON data from the request body
        selected_quadrants = data.get("selectedQuadrants", [])

        # Process the selected quadrants here
        # You can perform any necessary backend operations using the selected data

        # For demonstration purposes, you can return a success response
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})