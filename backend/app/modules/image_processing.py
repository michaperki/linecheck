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

def enhance_image(image):
    # Sharpen the image
    kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
    sharpened_image = cv2.filter2D(np.array(image), -1, kernel)
    # Increase the contrast
    contrast = 1.5
    adjusted_image = np.array(sharpened_image) * contrast
    adjusted_image = np.where(adjusted_image > 255, 255, adjusted_image)
    adjusted_image = Image.fromarray(adjusted_image.astype(np.uint8))
    # Increase the brightness
    brightness = 1.5
    adjusted_image = np.array(adjusted_image) * brightness
    adjusted_image = np.where(adjusted_image > 255, 255, adjusted_image)
    adjusted_image = Image.fromarray(adjusted_image.astype(np.uint8))
    return adjusted_image