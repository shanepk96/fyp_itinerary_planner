from flask import Flask
from app import app
from trip_planner.models import Trip

@app.route('/trip/new/create/', methods=['GET', 'POST'])
def create():
    return Trip().create_trip()

# @app.route('/trip/new/generate_options/<ctry>', methods=['GET','POST'])
# def generate_options(ctry):
#     return Trip.generate_options(ctry)
