import pytest
from app.modules.ocr_processing import perform_ocr

class MockCroppedFrame:
    def __init__(self, ocr_text):
        self.ocr_text = ocr_text

def test_perform_ocr():
    cropped_frames = [
        MockCroppedFrame("Text in frame 0"),
        MockCroppedFrame("123.45 BB 678.90 BB"),
        MockCroppedFrame("Some text in frame 2")
    ]
    video_id = "test_video"

    ocr_results = perform_ocr(cropped_frames, video_id)

    expected_ocr_results = [
        {'video_id': video_id, 'frame_index': 0, 'ocr_text': 'Text in frame 0'},
        {'video_id': video_id, 'frame_index': 1, 'ocr_text': '123.45 BB 678.90 BB'},
        {'video_id': video_id, 'frame_index': 2, 'ocr_text': 'Some text in frame 2'}
    ]

    assert ocr_results == expected_ocr_results

# Add more test cases for edge cases and other scenarios
