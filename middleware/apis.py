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

# Merchant apis
# POST requests
@app.route('/merchants/create_merchant', methods=['POST'])
def create_merchant():
    merchant_data = parse_to_dict(request.get_data())
    dbinterface.create_merchant(name=merchant_data['name'], email=merchant_data['email'], wallet_addr=merchant_data['wallet_addr'])
    return get_success_response()

# GET requests
# TODO: format the return jsons better
@app.route('/merchants/<id>/orders', methods=['GET'])
def get_merchant_orders(id):
    merchants_orders = dbinterface.get_orders([("merchant_id"),(id)])
    return merchants_orders

# Customer apis
# POST requests
@app.route('/customers/create_customer', methods=['POST'])
def create_customer():
    customer_data = parse_to_dict(request.get_data())
    dbinterface.create_customer(merchant_id=customer_data['merchant_id'], name=customer_data['name'], wallet_addr=customer_data['wallet_addr'])
    return get_success_response()

# TODO: Complete this shit 
@app.route('/customers/purchase', methods=['POST'])
def create_purchase():
    data = parse_to_dict(request.get_data())
    order_data = data['order']
    customer_data = data['customer']

# GET requests
@app.route('/customers', methods=['GET'])
def get_customers():
    customers = dbinterface.get_customer([])
    return customers

@app.route('/customers/<id>', methods=['GET'])
def get_customer(id):
    customers = dbinterface.get_customer([("id", id)])
    return customers

@app.route('/customers/<id>/orders', methods=['GET'])
def get_customer_orders(id):
    customer_orders = dbinterface.get_orders([("customer_id"),(id)])
    return customer_orders


# Order apis

# POST requests
@app.route('/orders/<id>/closed', methods=['POST'])
def close_order(id):
    dbinterface.close_order(id)
    return get_success_response()

@app.route('/orders/<id>/refund', methods=['POST'])
def refund_order(id):
    dbinterface.refund_order(id)
    return get_success_response()

# Product apis
# POST requests
# TODO: Get the currency id from the backend and insert here.
@app.route('/products/create_product', methods=['POST'])
def create_product():
    product_data = parse_to_dict(request.get_data())
    dbinterface.create_customer(merchant_id=product_data['merchant_id'], product_name=product_data['name'], units=product_data['units'], val=product_data['val'], currency_id=product_data['currency_id'])
    return get_success_response()


# GET requests
@app.route('/products', methods=['GET'])
def get_products():
    products = dbinterface.get_product([])
    return products

@app.route('/products/<id>', methods=['GET'])
def get_product(id):
    product = dbinterface.get_product([("id", id)])
    return product
