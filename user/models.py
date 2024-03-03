from flask import Flask,jsonify, request, session, redirect
import uuid
from passlib.hash import pbkdf2_sha256
from app import db


class User:

    def start_session(self,user):
        
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        
        return jsonify(user)

    def signup(self):
        user = {
            "_id": uuid.uuid4().hex,
            "name": request.form.get('name'),
            "email":  request.form.get('email').lower(),
            "password": request.form.get('password')
        }

        #ENCRYPT PW

        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        if db.users.find_one({"email": user['email']}):
            return jsonify({"error":"Email already in use"}), 400

        if db.users.insert_one(user):
            return self.start_session(user)

        return jsonify({"error":"signup Failed"}), 400

    def signin(self):

        user = db.users.find_one(

            {"email": request.form.get('email').lower()}
            
            )

        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):

            return self.start_session(user)

        return jsonify({"error":"Details incorrect, please check and try again"}), 400

    def signout(self):
        session.clear()
        return redirect('/')