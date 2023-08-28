import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_process_video_route(client):
    response = client.post('/process_video/test_video')
    data = response.get_json()
    assert response.status_code == 200
    assert data['success'] == True

def test_images_route(client):
    response = client.get('/images/test_video/frame.jpg')
    assert response.status_code == 200

def test_upload_video_route(client):
    with open('path_to_test_video.mp4', 'rb') as video_file:
        response = client.post('/upload_video', data={'video': video_file})
    data = response.get_json()
    assert response.status_code == 200
    assert data['success'] == True

def test_submit_selection_route(client):
    response = client.post('/submit_selection', json={'videoId': 'test_video', 'selectedSquares': [1, 2, 3]})
    data = response.get_json()
    assert response.status_code == 200
    assert data['success'] == True

def test_get_selection_route(client):
    response = client.get('/get_selection/test_video')
    data = response.get_json()
    assert response.status_code == 200
    assert data['success'] == True

def test_fetch_selected_frames_route(client):
    response = client.get('/fetch_selected_frames/test_video')
    data = response.get_json()
    assert response.status_code == 200
    assert 'frames' in data

def test_get_ocr_results_route(client):
    response = client.get('/data/test_video')
    data = response.get_json()
    assert response.status_code == 200
    assert 'ocr_results' in data

