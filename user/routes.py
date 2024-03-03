from flask import Flask
from app import app
from user.models import User


@app.route('/user/signup/', methods=['GET', 'POST'])
def signup():
    return User().signup()

@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/user/signin', methods=['POST'])
def signin():
    return User().signin()