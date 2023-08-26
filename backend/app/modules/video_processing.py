# app/modules/video_processing.py
import cv2
import os
from app import app

def process_video(video_path):
    # Break the video into frames (one frame every 100 frames) and save to a subdirectory of the app.config['PROCESSED_FOLDER']
    # Return the path of the first frame
    
    # Create a sub-folder in PROCESSED_FOLDER using video title as the folder name
    video_title = os.path.splitext(os.path.basename(video_path))[0]
    video_processed_folder = os.path.join(app.config['PROCESSED_FOLDER'], video_title)
    os.makedirs(video_processed_folder, exist_ok=True)
    
    # Open the video
    video = cv2.VideoCapture(video_path)
    
    # Get the first frame
    success, image = video.read()
    count = 0
    while success:
        if count % 100 == 0:
            # Save the frame as a jpg file
            cv2.imwrite(os.path.join(video_processed_folder, f'{count}.jpg'), image)
        success, image = video.read()
        count += 1
        
    # Return the path of the first frame
    return os.path.join(video_processed_folder, '0.jpg')

