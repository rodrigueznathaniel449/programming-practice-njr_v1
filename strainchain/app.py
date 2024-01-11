import sqlite3
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

app = Flask(__name__)

#Need to create and link DB here

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
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

@app.route("/pharmacist-learn",  methods=["GET", "POST"])
def pharmacist():
    """Show the BudTender Page"""
    return render_template("pharmacist-learn.html")

@app.route("/library-learn",  methods=["GET", "POST"])
def library():
    """Show the Library Page"""
    return render_template("library-learn.html")

@app.route("/rts-learn",  methods=["GET", "POST"])
def rts():
    """Show the Real-Time Strategy Page"""
    return render_template("rts-learn.html")

@app.route("/myaccount",  methods=["GET", "POST"])
@login_required
def myaccount():
    """Show the My Account Page"""
    return render_template("myaccount.html")

@app.route("/login",  methods=["GET", "POST"])
def login():
    """Show the Login Page"""
    return render_template("login.html")

@app.route("/register",  methods=["GET", "POST"])
def register():
    """Show the Registration Page"""
    return render_template("register.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
