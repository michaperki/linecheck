import cv2
import os
import numpy as np
from app import app
from app.config import Config  # Import the Config class

def process_video(video_path):
    # break the video into frames and save them
    # return the path of the first frame
    print("Processing video")
    vidcap = cv2.VideoCapture(video_path)
    success,image = vidcap.read()
    count = 0
    success = True
    while success:
        cv2.imwrite(os.path.join(Config.PROCESSED_FOLDER, "frame%d.jpg" % count), image)     # save frame as JPEG file      
        success,image = vidcap.read()
        count += 1
    return os.path.join(Config.PROCESSED_FOLDER, "frame0.jpg")