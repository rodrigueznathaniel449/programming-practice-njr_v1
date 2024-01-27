import sqlite3
import psycopg2
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

app = Flask(__name__)

#Session Write to FileSystem in Dev Env/Demo
#Change before PROD Launch of course
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = "/app/flask_session"
Session(app)

# Define the path to the password file
password_file_path = '/run/secrets/db-password'  # Update this path as needed

# Read the password from the file
try:
    with open(password_file_path, 'r') as password_file:
        password = password_file.read().strip()  # Remove any leading/trailing whitespace or newlines
except FileNotFoundError as e:
    print(f"Error: {e}")
    # Handle the error, e.g., log it, exit gracefully, or provide a default password

#Define DB Connection Params
db_params = {
    'dbname': 'strainchain',
    'user': 'postgres',
    'password': password,
    'host': 'db',
    'port': '5432',
}

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
    if request.method == "POST":
        #Ensure UN and PW are submitted
        if not request.form.get("username"):
            flash("Username Required")
            return render_template("login.html")
        elif not request.form.get("password"):
            flash("Password Required")
            return render_template("login.html")
        #Query DB for UN if Exists
        conn = psycopg2.connect(**db_params)
        curr = conn.cursor()
        username = request.form.get("username")
        usercheck = curr.execute("SELECT * FROM users WHERE username = (%s)", (username,))
        if len(usercheck) != 1 or not check_password_hash(usercheck[0]["password"], request.form.get("password")):
            flash("Incorrect Username or Password")
            curr.close()
            conn.close()
            return render_template("login.html")
        else:
            #CREATE SESSION ID
            session["user_id"] = usercheck[0]["id"]
            curr.close()
            conn.close()
            return redirect("/")
    else:
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
        #ensure PW and Confirm Match
        if request.form.get("password") != request.form.get("confirmpassword"):
            flash("Password and Confirmation Must Match")
            return render_template("register.html")
        #verify username doesnt already exist
        conn = psycopg2.connect(**db_params)
        curr = conn.cursor()
        username = request.form.get("username")
        usercheck = curr.execute("SELECT * FROM users WHERE username = (%s)", (username,))
        #If Exists, close DB Connection, and return registration page
        if len(usercheck) != 0:
            flash("Username Already Taken")
            curr.close()
            conn.close()
            return render_template("register.html")
        #If Passing Checks, Insert into DB table
        elif len(usercheck) == 0:
            fn = request.form.get("firstname")
            ln = request.form.get("lastname")
            em = request.form.get("email")
            un = request.form.get("username")
            pw = generate_password_hash(request.form.get("password"))
            at = request.form.get("AccountTypeSelect")
            curr.execute("INSERT INTO users (first_name, last_name, email, username, password, user_type) VALUES (%s, %s, %s, %s, %s, %s)", (fn, ln, em, un, pw, at,))
            #Close DB Connection
            #Push User to Login Flow
            conn.commit()
            curr.close()
            conn.close()
            return render_template("login.html")
    #Browsing User
    else:
        return render_template("register.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
