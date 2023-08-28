import pytest
from app.modules import video_processing

def test_process_video(tmpdir):
    video_id = "test_video"
    video_path = str(tmpdir.mkdir("videos").join(f"{video_id}.mp4"))
    processed_folder = str(tmpdir.mkdir("processed"))

    assert video_processing.process_video(video_id) == [
        f"{processed_folder}/0.jpg",
        f"{processed_folder}/10.jpg",
        f"{processed_folder}/20.jpg",
        f"{processed_folder}/30.jpg",
    ]

def test_fetch_selected_frames(tmpdir):
    video_id = "test_video"
    frames_folder = str(tmpdir.mkdir("frames"))
    frame_files = ["0.jpg", "10.jpg", "20.jpg", "30.jpg"]
    for frame_file in frame_files:
        open(f"{frames_folder}/{frame_file}", "a").close()

    selected_frames = video_processing.fetch_selected_frames(video_id, frames_folder)

    assert len(selected_frames) == len(frame_files)

def test_crop_frames():
    # Create some dummy frames
    dummy_frames = [None] * 40
    selected_squares = [0, 1, 2]

    cropped_frames = video_processing.crop_frames(dummy_frames, selected_squares)

    assert len(cropped_frames) == len(dummy_frames)
