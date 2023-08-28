import pytest
from app.modules.utils import calculate_cropping_region, extract_bb_values

def test_calculate_cropping_region():
    selected_squares = [0, 1, 2, 3]
    grid_size = (2, 2)
    image_dimensions = (400, 400)
    
    cropping_region = calculate_cropping_region(selected_squares, grid_size, image_dimensions)
    
    assert cropping_region == (-5, -5, 205, 205)  # Adjust the expected values based on your calculations

def test_extract_bb_values():
    ocr_results = [
        {'frame_index': 0, 'ocr_text': '1.23 BB 4.56 BB'},
        {'frame_index': 1, 'ocr_text': '7 BB'},
        {'frame_index': 2, 'ocr_text': '8.9 BB'}
    ]
    
    bb_values = extract_bb_values(ocr_results)
    
    expected_bb_values = [
        {'frame_index': 0, 'bb_value': '1.23'},
        {'frame_index': 0, 'bb_value': '4.56'},
        {'frame_index': 1, 'bb_value': '7'},
        {'frame_index': 2, 'bb_value': '8.9'}
    ]
    
    assert bb_values == expected_bb_values

# Add more test cases for other functions as needed
