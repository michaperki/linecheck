import pytesseract
from PIL import Image
from app.modules.database import store_ocr_results_in_database
from app.modules.video_processing import save_cropped_frame
import os
import cv2
import uuid
from app import app

def perform_ocr(cropped_frames, video_id):
    ocr_results = []
    for frame_index, cropped_frame in enumerate(cropped_frames):
        # Perform OCR on the cropped frame
        ocr_text = pytesseract.image_to_string(cropped_frame)

        # Store OCR results in the database or a data structure
        ocr_results.append({
            'video_id': video_id,
            'frame_index': frame_index,
            'ocr_text': ocr_text
        })
        
    print("ocr_results:", ocr_results)

    return ocr_results