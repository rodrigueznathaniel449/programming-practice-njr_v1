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

@app.route("/")
@login_required
def index():
    """Show the Home Page"""
    return render_template("index.html")

@app.route("/about")
@login_required
def about():
    """Show the About Us Page"""
    return render_template("about.html")

@app.route("/learn")
@login_required
def learn():
    """Show the Learn Page"""
    return render_template("learn.html")

@app.route("/budtender")
@login_required
def budtender():
    """Show the BudTender Page"""
    return render_template("budtender.html")

@app.route("/library")
@login_required
def library():
    """Show the Library Page"""
    return render_template("library.html")

@app.route("/rts")
@login_required
def rts():
    """Show the Real-Time Strategy Page"""
    return render_template("rts.html")

@app.route("/myaccount")
@login_required
def myaccount():
    """Show the My Account Page"""
    return render_template("myaccount.html")

@app.route("/login")
@login_required
def index():
    """Show the Login Page"""
    return render_template("index.html")

@app.route("/register")
@login_required
def index():
    """Show the Registration Page"""
    return render_template("register.html")
