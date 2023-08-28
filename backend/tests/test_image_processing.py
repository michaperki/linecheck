import pytest
from PIL import Image
from app.modules.image_processing import load_image, crop_image, greyscale_image, crop_and_greyscale_image

def test_load_image(tmp_path):
    # Create a temporary image file
    image_path = tmp_path / "test_image.jpg"
    img = Image.new('RGB', (100, 100), color='red')
    img.save(image_path)

    loaded_image = load_image(image_path)

    assert isinstance(loaded_image, Image.Image)
    assert loaded_image.size == (100, 100)

def test_crop_image():
    image = Image.new('RGB', (200, 200), color='red')
    cropping_region = (50, 50, 150, 150)

    cropped_image = crop_image(image, cropping_region)

    assert isinstance(cropped_image, Image.Image)
    assert cropped_image.size == (100, 100)

def test_greyscale_image():
    image = Image.new('RGB', (100, 100), color='red')

    greyscaled_image = greyscale_image(image)

    assert isinstance(greyscaled_image, Image.Image)
    assert greyscaled_image.mode == 'L'
    assert greyscaled_image.size == (100, 100)

def test_crop_and_greyscale_image():
    image = Image.new('RGB', (200, 200), color='red')
    cropping_region = (50, 50, 150, 150)

    cropped_greyscaled_image = crop_and_greyscale_image(image, cropping_region)

    assert isinstance(cropped_greyscaled_image, Image.Image)
    assert cropped_greyscaled_image.mode == 'L'
    assert cropped_greyscaled_image.size == (100, 100)

# Add more test cases for edge cases and other scenarios
