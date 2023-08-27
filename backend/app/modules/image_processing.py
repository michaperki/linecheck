# app/modules/image_processing.py
import cv2
import numpy as np
from PIL import Image

def process_image(image_path):
    # Your image processing logic here
    pass

def load_image(image_path):
    return Image.open(image_path)

def crop_image(image, cropping_region):
    # Your image cropping logic here
    # Return the cropped image
    cropped_image = image.crop(cropping_region)
    return cropped_image
