# app/modules/video_processing.py
import cv2
import os
from app import app
from app.modules import image_processing
from app.modules.utils import calculate_cropping_region
from PIL import Image


def process_video(video_id):
    print("process_video")
    print("video_id:", video_id)
    
    # Define the path to the uploaded video
    video_path = os.path.join(app.config["UPLOAD_FOLDER"], "videos", f"{video_id}.mp4")

    # Create a sub-folder in PROCESSED_FOLDER using video title as the folder name
    video_title = video_id  # Use video_id as the video title
    video_processed_folder = os.path.join(app.config['PROCESSED_FOLDER'], video_title)
    os.makedirs(video_processed_folder, exist_ok=True)
    print("video_processed_folder:", video_processed_folder)

    video = cv2.VideoCapture(video_path)

    processed_frame_paths = []  # List to hold processed frame paths

    frame_index = 0
    frame_skip = 50  # Only grab every 10th frame

    while True:
        success, frame = video.read()
        if not success:
            break

        if frame_index % frame_skip == 0:
            frame_path = os.path.join(video_processed_folder, f"{frame_index}.jpg")
            cv2.imwrite(frame_path, frame)
            processed_frame_paths.append(frame_path)  # Add frame path to the list
        
        frame_index += 1

    return processed_frame_paths

def fetch_selected_frames(video_id):
    frames_folder = os.path.join(app.config['FRAMES_FOLDER'], video_id)
    frame_files = sorted(os.listdir(frames_folder))
    frame_paths = [os.path.join(frames_folder, frame_file) for frame_file in frame_files]

    selected_frames = []
    for frame_path in frame_paths:
        frame = image_processing.load_image(frame_path)
        selected_frames.append(frame)

    return selected_frames

def crop_frames(frames, selected_squares):
    print("crop_frames")
    # Get the dimensions of the first frame
    frame_width, frame_height = frames[0].size
    
    # Get the grid size
    grid_size = app.config['GRID_SIZE']
        
    # Calculate the cropping region
    cropping_region = calculate_cropping_region(selected_squares, grid_size, (frame_width, frame_height))
    
    # Crop each frame
    cropped_frames = []
    for frame in frames:
        cropped_frame = image_processing.crop_and_greyscale_image(frame, cropping_region)
        cropped_frames.append(cropped_frame)
        
    return cropped_frames  


def save_cropped_frame(cropped_frame, video_id, frame_index, type):
    print("save_cropped_frame")
    output_folder = os.path.join(app.config['CROPPED_FRAMES_FOLDER'], video_id, type)
    os.makedirs(output_folder, exist_ok=True)

    output_filename = f"frame_{frame_index}.png"
    output_path = os.path.join(output_folder, output_filename)
    print("output_path:", output_path)

    cropped_frame.save(output_path)  # Save cropped frame using PIL

def save_cropped_frames(cropped_frames, video_id, type):
    for frame_index, cropped_frame in enumerate(cropped_frames):
        save_cropped_frame(cropped_frame, video_id, frame_index, type)
           
def load_frames(video_id):
    frames_folder = os.path.join(app.config['FRAMES_FOLDER'], video_id)
    frames = []

    for frame_filename in os.listdir(frames_folder):
        frame_path = os.path.join(frames_folder, frame_filename)
        frame = cv2.imread(frame_path)  # Load frame using OpenCV
        frames.append(frame)

    return frames

def load_processed_frames(processed_frame_paths):
    print("load_processed_frames")
    print("processed_frame_paths:", processed_frame_paths)
    frames = []
    for frame_path in processed_frame_paths:
        frame = image_processing.load_image(frame_path)
        frames.append(frame)
    return frames
        
def load_video(video_id):
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{video_id}.mp4")
    return cv2.VideoCapture(video_path)