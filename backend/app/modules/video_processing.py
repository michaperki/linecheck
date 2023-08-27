# app/modules/video_processing.py
import cv2
import os
from app import app
from app.modules import image_processing
from app.modules.utils import calculate_cropping_region
from PIL import Image


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

def fetch_selected_frames(video_id):
    frames_folder = os.path.join(app.config['FRAMES_FOLDER'], video_id)
    frame_files = sorted(os.listdir(frames_folder))
    frame_paths = [os.path.join(frames_folder, frame_file) for frame_file in frame_files]

    selected_frames = []
    for frame_path in frame_paths:
        frame = image_processing.load_image(frame_path)
        selected_frames.append(frame)

    return selected_frames

def crop_frames(video_id, selected_squares):
    print("crop_frames")
    # Load frames for the video
    frames = load_frames(video_id)
    print("frames loaded")
    
    # get the dimensions of the first frame
    frame = frames[0]
    frame_pil = Image.fromarray(frame)

    cropped_frames = []
    cropping_region = calculate_cropping_region(selected_squares, app.config['GRID_SIZE'], frame_pil.size)
    print("cropping_region:", cropping_region)
    left, upper, right, lower = cropping_region
    
    for frame_index, frame in enumerate(frames):
        # Convert the NumPy array to a Pillow Image
        frame_pil = Image.fromarray(frame)

        # Print the shape of the frame
        print("Frame shape:", frame_pil.size)

        # Crop the frame
        print("frame #:", frame_index)
        cropped_frame = frame_pil.crop((left, upper, right, lower))
        print("cropped_frame:", cropped_frame)
        cropped_frames.append(cropped_frame)

        # Save the cropped frame
        save_cropped_frame(cropped_frame, video_id, frame_index, 0)
        print("cropped frame saved")
    
    return cropped_frames

def save_cropped_frame(cropped_frame, video_id, frame_index, square_index):
    print("save_cropped_frame")
    output_folder = os.path.join(app.config['CROPPED_FRAMES_FOLDER'], video_id)
    os.makedirs(output_folder, exist_ok=True)

    output_filename = f"frame_{frame_index}_square_{square_index}.png"
    output_path = os.path.join(output_folder, output_filename)
    print("output_path:", output_path)

    cropped_frame.save(output_path)  # Save cropped frame using PIL

            
def load_frames(video_id):
    frames_folder = os.path.join(app.config['FRAMES_FOLDER'], video_id)
    frames = []

    for frame_filename in os.listdir(frames_folder):
        frame_path = os.path.join(frames_folder, frame_filename)
        frame = cv2.imread(frame_path)  # Load frame using OpenCV
        frames.append(frame)

    return frames