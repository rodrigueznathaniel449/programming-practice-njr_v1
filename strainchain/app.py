import sqlite3
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

app = Flask(__name__)

#Might need to set session for FileSystem over signed cookies, need to research, could be only for dev env/testing

#Need to create and link DB here

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/",  methods=["GET", "POST"])
def index():
    """Show the Home Page"""
    return render_template("index.html")

@app.route("/about",  methods=["GET", "POST"])
def about():
    """Show the About Us Page"""
    return render_template("about.html")

@app.route("/learn",  methods=["GET", "POST"])
def learn():
    """Show the Learn Page"""
    return render_template("learn.html")

@app.route("/budtender",  methods=["GET", "POST"])
def budtender():
    """Show the BudTender Page"""
    return render_template("budtender.html")

@app.route("/library",  methods=["GET", "POST"])
def library():
    """Show the Library Page"""
    return render_template("library.html")

@app.route("/rts",  methods=["GET", "POST"])
def rts():
    """Show the Real-Time Strategy Page"""
    return render_template("rts.html")

@app.route("/myaccount",  methods=["GET", "POST"])
@login_required
def myaccount():
    """Show the My Account Page"""
    return render_template("myaccount.html")

@app.route("/login",  methods=["GET", "POST"])
def index():
    """Show the Login Page"""
    return render_template("index.html")

@app.route("/register",  methods=["GET", "POST"])
def index():
    """Show the Registration Page"""
    return render_template("register.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
