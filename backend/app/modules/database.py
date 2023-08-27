# app/modules/database.py

# Simulated database using Python dictionaries
videos_db = {}
selected_squares_db = {}
ocr_results_db = {}

def store_selected_squares_in_database(video_id, selected_squares):
    selected_squares_db[video_id] = selected_squares

def get_selected_squares_from_database(video_id):
    return selected_squares_db.get(video_id, [])

def store_ocr_results_in_database(video_id, ocr_results):
    ocr_results_db[video_id] = ocr_results
