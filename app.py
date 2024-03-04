from flask import Flask, render_template,session,redirect,jsonify
from functools import wraps
import pymongo
import random

app = Flask(__name__)
app.secret_key = b'X\x18\x0fzx\x0b\xdb\xef(7\xbb\xe0P\x9a\x1b\xd8'

#database
client = pymongo.MongoClient('127.0.0.1', 27017)
db = client.itinplan

import json

f = open('static/data/destinations.json', encoding="utf-8")
destination_data = json.load(f)
f.close()

f = open('static/data/country_id_map.json',encoding="utf-8")
country_id_map = json.load(f)
f.close()

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')
    return wrap

#User Routes
from user import routes
from trip_planner import routes

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard/')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/new_trip/')
@login_required
def new_trip():
    return(render_template('new_trip.html'))

@app.route('/get_destination_data/<subst>', methods=['GET'])
# @login_required
def get_destination_data(subst):
    print(subst == '')
    if subst == '':
        return jsonify({"blank_query": "start typing and we'll try find your destination"}), 200
    else:
        current_dest_list = []
        for item in destination_data:
            if subst.lower() in item['name'].lower():
                current_dest_list.append(item)
        return jsonify(current_dest_list), 200

@app.route('/get_destination_options/<destid>', methods=['GET'])
def generate_options(destid):
    # Get country input
    # return List of Recipes from chosen country
    # allow user to submit recipes
    ml_country = ''
    for dest in destination_data:
        if dest['id'] == destid:
            ml_country = dest['ml_target']

    random_sample_recipes = random.sample(country_id_map[ml_country], 4)
    return jsonify({"data": random_sample_recipes, "country": ml_country}), 200
