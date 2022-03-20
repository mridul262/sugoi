from flask import Flask
from flask import request
from flask import jsonify
import json

import middleware.dbinterface as dbinterface

app = Flask(__name__)

def parse_to_dict(data):
    return json.loads(data.decode("utf-8"))

def get_success_response():
    return jsonify(success=True)

@app.route("/")
def hello_world():
    return "<p>Hello World!</p>"

@app.route('/merchants/create_merchants', methods=['POST'])
def create_merchant():
    merchant_data = parse_to_dict(request.get_data())
    dbinterface.create_merchant(name=merchant_data['name'], email=merchant_data['email'], wallet_addr=merchant_data['wallet_addr'])
    return get_success_response()


