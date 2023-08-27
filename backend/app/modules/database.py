import json
import os

# Construct the full path to the Database.json file
DATABASE_JSON_PATH = os.path.join(os.path.dirname(__file__), '..', 'database', 'Database.json')

# Load existing data from the JSON file (if it exists)
if os.path.exists(DATABASE_JSON_PATH):
    with open(DATABASE_JSON_PATH, 'r') as json_file:
        data = json.load(json_file)
    videos_db = data.get('videos', {})
    selected_squares_db = data.get('selected_squares', {})
    ocr_results_db = data.get('ocr_results', {})
else:
    videos_db = {}
    selected_squares_db = {}
    ocr_results_db = {}
    
    # Create an empty JSON structure
    initial_data = {
        'videos': videos_db,
        'selected_squares': selected_squares_db,
        'ocr_results': ocr_results_db
    }
    
    # Write the empty JSON structure to the file
    with open(DATABASE_JSON_PATH, 'w') as json_file:
        json.dump(initial_data, json_file, indent=4)

def save_database_to_json():
    data = {
        'videos': videos_db,
        'selected_squares': selected_squares_db,
        'ocr_results': ocr_results_db
    }
    
    with open(DATABASE_JSON_PATH, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def store_selected_squares_in_database(video_id, selected_squares):
    selected_squares_db[video_id] = selected_squares
    save_database_to_json()

def get_selected_squares_from_database(video_id):
    return selected_squares_db.get(video_id, [])

def store_ocr_results_in_database(video_id, ocr_results):
    ocr_results_db[video_id] = ocr_results
    save_database_to_json()

def get_ocr_results_from_database(video_id):
    return ocr_results_db.get(video_id, [])

