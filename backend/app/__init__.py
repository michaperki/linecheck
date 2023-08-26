# app/__init__.py
from flask import Flask

app = Flask(__name__)

# Import and register your routes here
from app.routes import *

if __name__ == '__main__':
    app.run(debug=True)
