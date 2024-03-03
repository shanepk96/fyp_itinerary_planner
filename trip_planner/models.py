import uuid
from app import db


class Trip:

    def generate_options(self,inp):
        # Get country input
        # return List of Recipes from chosen country
        # allow user to submit recipes
        pass

    def create_trip(self,dest):
        trip = {
            "_id": uuid.uuid4().hex,
            "user_id": '',
            "destination": '',
        }

        if db.trips.insert_one(trip):
            return 200