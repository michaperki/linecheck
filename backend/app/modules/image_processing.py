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

def greyscale_image(image):
    greyscaled_image = image.convert('L')
    return greyscaled_image

def crop_and_greyscale_image(image, cropping_region):
    cropped_image = crop_image(image, cropping_region)
    greyscaled_image = greyscale_image(cropped_image)
    return greyscaled_image