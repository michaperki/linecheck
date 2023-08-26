# app/app.py

from flask import Flask
from app.routes.images import images_bp

app = Flask(__name__)

# Register the images Blueprint
app.register_blueprint(images_bp)

# ... other configurations and routes ...
