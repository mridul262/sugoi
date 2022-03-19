from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello World!</p>"


# CRUD for Customers, Products, Price, Sessions, Invoices
def customers():
    pass

def 