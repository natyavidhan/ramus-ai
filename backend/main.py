from flask import Flask, render_template
from dotenv import load_dotenv

from ai import GroqApp

load_dotenv()

app = Flask(__name__)
groq_app = GroqApp()

@app.route('/')
def index():
    return render_template('index.html', models=groq_app.models)