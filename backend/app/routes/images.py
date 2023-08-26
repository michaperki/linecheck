# app/routes/images.py

from flask import Blueprint, send_from_directory

images_bp = Blueprint("images", __name__)

@images_bp.route("/images/<filename>")
def serve_image(filename):
    return send_from_directory("uploaded_videos", filename)
