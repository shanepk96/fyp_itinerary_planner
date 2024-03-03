from flask import Flask
from app import app
from trip_planner.models import Trip

@app.route('/trip/new/create/', methods=['GET', 'POST'])
def create():
    return Trip().create_trip()

@app.route('/trip/new/generate_options', methods=['POST'])
def generate_options():
    print("hello")
