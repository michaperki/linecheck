# app/routes/routes.py
from flask import Blueprint, request, send_from_directory, jsonify
import json
import os
import cv2
import uuid
from app import app

from app.modules import ocr_processing, image_processing, video_processing, utils, database


@app.route('/process_video/<string:video_id>', methods=['POST'])
def process_video_route(video_id):
    try:
        # Construct the video_path using the uploaded video_id
        video_path = os.path.join(app.config["UPLOAD_FOLDER"], "videos", f"{video_id}.mp4")

        processed_frame_paths = video_processing.process_video(video_path)

        video_title = os.path.splitext(os.path.basename(video_path))[0]
        video_processed_folder = os.path.join(app.config['PROCESSED_FOLDER'], video_title)
        os.makedirs(video_processed_folder, exist_ok=True)

        for frame_path in processed_frame_paths:
            processed_frame_dest = os.path.join(video_processed_folder, os.path.basename(frame_path))
            os.rename(frame_path, processed_frame_dest)

        return {'success': True, 'processed_frame_paths': processed_frame_paths}
    except Exception as e:
        return {'success': False, 'error': str(e)}

# new routes below

@app.route('/fetch_thumbnails/<path:video_id>')
def fetch_thumbnails(video_id):
    print("thumbnail endpoint")    
    # Construct the full path using the project's root directory
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))  # Adjust the number of '..' based on your project structure
    full_path = os.path.join(root_dir, 'backend', 'uploaded_videos', 'frames', video_id)
    print("Full path:", full_path)
    
    # Get the list of files in the folder
    files = os.listdir(full_path)
    
    # Sort the files based on their names
    files.sort()
    
    # Get 7 frames, evenly spaced out
    thumbnail_frames = [files[i] for i in range(0, len(files), len(files) // 7)]
    
    # Construct the full path for each frame
    thumbnail_paths = [os.path.join(full_path, frame) for frame in thumbnail_frames]
    
    return jsonify({'thumbnail_paths': thumbnail_paths})

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

    # Call the process_video_route to process the uploaded video
    process_response = process_video_route(video_id)
    
    if process_response['success']:
        return {"success": True, "video_id": video_id, "frame_path": frame_path, "processed_frame_paths": process_response['processed_frame_paths']}
    else:
        return {"success": False, "error": "Video upload and processing failed"}

@app.route('/submit_selection', methods=['POST'])
def submit_selection():
    try:
        data = request.json
        print("data:", data)
        selected_regions = data.get('formattedRegions', [])  # An array of selected region objects

        video_id = data.get('videoId', None)
        print("submit_selection endpoint")
        print("selected_regions:", selected_regions)
        print("video_id:", video_id)

        # Store the selected regions in the database
        database.store_selected_regions_in_database(video_id, selected_regions)
        print("stored selected regions in database")

        # Get the processed frame paths for the video
        processed_frame_paths = video_processing.process_video(video_id)

        # Load the processed frames
        frames = video_processing.load_processed_frames(processed_frame_paths)
        print('frames loaded')

        ocr_results_by_type = {}            

        # Process each selected region type separately
        for region in selected_regions:
            region_type = region.get('type')
            selected_squares = region.get('squares')
            print(f"region_type: {region_type}")
            print(f"selected_squares: {selected_squares}")

            # Crop frames based on selected grid coordinates
            cropped_frames = video_processing.crop_frames(frames, selected_squares)
            print(f"{region_type} cropping done")

            # Save the cropped frames
            video_processing.save_cropped_frames(cropped_frames, video_id, region_type)
            print(f"{region_type} cropping saved")
            
            video_processing.enhance_video(cropped_frames)

            # Perform OCR analysis on cropped frames and store OCR results
            ocr_results = ocr_processing.perform_ocr(cropped_frames, video_id)
            print(f"{region_type} ocr done")

            ocr_results_by_type[region_type] = ocr_results

        # Store OCR results in the database
        database.store_ocr_results_by_type_in_database(video_id, ocr_results_by_type)

        return jsonify({'success': True, 'ocr_results_by_type': ocr_results_by_type})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

    
@app.route('/get_selection/<string:video_id>', methods=['GET'])
def get_selection(video_id):
    print("get_selection endpoint")
    try:
        user_submissions_folder = os.path.join(app.config['USER_SUBMISSIONS_FOLDER'], video_id)
        print("user_submissions_folder:", user_submissions_folder)

        # Read the JSON file
        with open(os.path.join(user_submissions_folder, 'selection.json')) as f:
            selected_squares = json.load(f)

        return jsonify({'success': True, 'selected_squares': selected_squares})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/fetch_selected_frames/<video_id>', methods=['GET'])
def fetch_selected_frames(video_id):
    try:
        frames = video_processing.fetch_selected_frames(video_id)

        # Get the selected grid coordinates for the video
        selected_squares = database.get_selected_squares_from_database(video_id)

        # Crop frames based on selected grid coordinates
        cropped_frames = video_processing.crop_frames(frames, selected_squares)

        return jsonify({'frames': cropped_frames})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/data/<string:video_id>', methods=['GET'])
def get_ocr_results(video_id):
    try:
        # Retrieve OCR results for the given video_id
        ocr_results = database.get_ocr_results_from_database(video_id)
        return jsonify({'success': True, 'ocr_results': ocr_results})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})