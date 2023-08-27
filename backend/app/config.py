# app/config.py
class Config:
    PROCESSED_FOLDER = 'processed_videos' 
    UPLOAD_FOLDER = 'uploaded_videos'
    FRAMES_FOLDER = 'uploaded_videos/frames'
    VIDEOS_FOLDER = 'uploaded_videos/videos'
    USER_SUBMISSIONS_FOLDER = 'user_submissions'
    CROPPED_FRAMES_FOLDER = 'cropped_frames'
    FRAME_SIZE = (600, 330)
    GRID_SIZE = (30, 30)