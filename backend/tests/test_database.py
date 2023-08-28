import pytest
from app.modules.database import store_selected_squares_in_database, get_selected_squares_from_database

def test_selected_squares_storage():
    video_id = "test_video"
    selected_squares = [1, 2, 3]
    
    store_selected_squares_in_database(video_id, selected_squares)
    retrieved_squares = get_selected_squares_from_database(video_id)
    
    assert retrieved_squares == selected_squares
