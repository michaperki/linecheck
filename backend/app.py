# app/app.py

from flask import Flask
from app.routes.images import images_bp
from app.routes.routes import videos_bp

app = Flask(__name__)

# Register the images Blueprint
app.register_blueprint(images_bp)
app.register_blueprint(videos_bp)

