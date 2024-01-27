import sqlite3
import psycopg2
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
    """Show the Learn More Page"""
    return render_template("learn.html")

@app.route("/pharmacist-learn",  methods=["GET", "POST"])
def pharmacist():
    """Show the Pharmacist Page"""
    return render_template("pharmacist-learn.html")

@app.route("/library-learn",  methods=["GET", "POST"])
def library():
    """Show the Library Page"""
    return render_template("library-learn.html")

@app.route("/collaboration-learn",  methods=["GET", "POST"])
def collab():
    """Show the Collaboration Learn Page"""
    return render_template("collaboration-learn.html")

@app.route("/networks-learn",  methods=["GET", "POST"])
def networks():
    """Show the Networks Learn Page"""
    return render_template("networks-learn.html")

@app.route("/networks-build",  methods=["GET", "POST"])
def networksbuild():
    """Show the Networks Learn Page"""
    return render_template("networks-build.html")

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

@app.route("/logout")
def logout():
    """Log User Out"""
    session.clear()
    return redirect("/")

@app.route("/register",  methods=["GET", "POST"])
def register():
    #Registration Page Logic
    #If User is Registering
    if request.method == "POST":
        #Clear Previous Activity
        session.clear()
        #Check All Input Fields
        if not request.form.get("firstname"):
            flash("Please Provide First Name")
            return render_template("register.html")
        elif not request.form.get("lastname"):
            flash("Please Provide Last Name")
            return render_template("register.html")
        elif not request.form.get("emailaddress"):
            flash("Please Provide Email Address")
            return render_template("register.html")
        elif not request.form.get("username"):
            flash("Please Provide Username")
            return render_template("register.html")
        elif not request.form.get("password"):
            flash("Please Provide Password")
            return render_template("register.html")
        elif not request.form.get("confirmpassword"):
            flash("Please Provide Confirmation Password")
            return render_template("register.html")
        elif not request.form.get("AccountTypeSelect"):
            flash("Please Select Account Type")
            return render_template("register.html")
        #verify username doesnt already exist
        #ensure PW and Confirm Match
        #If Passing Checks, Insert into DB table
        return render_template("login.html")
    #Browsing User
    else:
        return render_template("register.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
