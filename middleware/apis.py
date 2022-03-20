from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import json

import middleware.dbinterface as dbinterface

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def parse_to_dict(data):
    return json.loads(data.decode("utf-8"))

def get_success_response():
    return jsonify(success=True)

@app.route("/")
@cross_origin()
def helloWorld():
  return "Hello, cross-origin-world!"

# Merchant apis
# POST requests
@app.route('/merchants/create_merchant', methods=['POST']) # TESTED
def create_merchant():
    merchant_data = parse_to_dict(request.get_data())
    dbinterface.create_merchant(name=merchant_data['name'], email=merchant_data['email'], wallet_addr=merchant_data['wallet_addr'])
    return get_success_response()

def make_order_object(order_tuple):
    return {
        "id":order_tuple[0],
        "amount":order_tuple[1],
        "status":order_tuple[2],
        "currency": dbinterface.get_currency([("id", order_tuple[3])]),
        "customer": dbinterface.get_customer([("id", order_tuple[4])]),
        "merchant": dbinterface.get_merchant([("id", order_tuple[5])]) ,
        "expiry": order_tuple[6],
        "product": dbinterface.get_product([("id", order_tuple[7])]) 
    }

# GET requests
@app.route('/merchants/<id>/orders', methods=['GET']) # TESTED
def get_merchant_orders(id):
    merchants_orders = dbinterface.get_orders([("merchant_id",id)])
    list_of_orders = []
    for order in merchants_orders:
        list_of_orders.append(make_order_object(order))
    return jsonify(list_of_orders)

# Customer apis
# POST requests
@app.route('/customers/create_customer', methods=['POST']) # TESTED
def create_customer():
    customer_data = parse_to_dict(request.get_data())
    dbinterface.create_customer(wallet_addr=customer_data['wallet_addr'])
    return get_success_response()

def get_currency_id(currency_name):
    if not dbinterface.get_currency([("name", f"'{currency_name}'")]):
        dbinterface.create_currency(name=currency_name)
    currency_id = dbinterface.get_currency([("name", f"'{currency_name}'")])[0][0]
    return currency_id

def get_customer_id(wallet_addr):
    if not dbinterface.get_customer([("wallet_addr", f"'{wallet_addr}'")]):
        dbinterface.create_customer(wallet_addr=wallet_addr)
    customer_id = dbinterface.get_customer([("wallet_addr", f"'{wallet_addr}'")])[0][0]
    return customer_id

# THe merchant will always exist in the database
def get_merchant_id(wallet_addr):
    merchant_id = dbinterface.get_merchant([("wallet_addr", f"'{wallet_addr}'")])[0][0]
    return merchant_id

@app.route('/customers/purchase', methods=['POST']) # TESTED
def create_purchase():
    order_data = parse_to_dict(request.get_data())
    customer_id = str(get_customer_id(order_data["customer_addr"]))
    currency_id = str(get_currency_id(order_data["currency_name"]))
    merchant_id = str(get_merchant_id(order_data["merchant_addr"]))
    dbinterface.create_order(id=str(order_data['id']), amount=order_data['amount'], status=order_data['status'], 
                            currency_id=currency_id, customer_id=customer_id, 
                            merchant_id=merchant_id, expiry=order_data['expiry'], product_id=str(order_data['product_id']))
    return get_success_response()

def make_customer_object(customer_tuple):
    return {
        "id": customer_tuple[0],
        "wallet_addr": customer_tuple[1]
    }

# GET requests
@app.route('/customers', methods=['GET']) # TESTED
def get_customers():
    customers = dbinterface.get_customer([])
    list_of_customers = []
    for customer_tuple in customers:
        list_of_customers.append(make_customer_object(customer_tuple))
    return jsonify(list_of_customers)

@app.route('/customers/<id>', methods=['GET']) # TESTED
def get_customer(id):
    customer = dbinterface.get_customer([("id", id)])[0]
    customer_object = make_customer_object(customer)
    return customer_object

@app.route('/customers/<id>/orders', methods=['GET']) # TESTED
def get_customer_orders(id):
    customers_orders = dbinterface.get_orders([("customer_id",id)])
    list_of_orders = []
    for order in customers_orders:
        list_of_orders.append(make_order_object(order))
    return jsonify(list_of_orders)

# Order apis

# POST requests
@app.route('/orders/<id>/closed', methods=['POST']) # TESTED
def close_order(id):
    dbinterface.close_order(id)
    return get_success_response()

@app.route('/orders/<id>/refund', methods=['POST']) # TESTED
def refund_order(id):
    dbinterface.refund_order(id)
    return get_success_response()

# Product apis
# POST requests
@app.route('/products/create_product', methods=['POST']) # TESTED
def create_product():
    product_data = parse_to_dict(request.get_data())
    merchant_id = str(product_data['merchant_id'])
    product_name = product_data['product_name']
    units = str(product_data['units'])
    val = str(product_data['val'])
    currency_name = product_data['currency_name']
    currency_id = get_currency_id(currency_name)
    dbinterface.create_product(merchant_id=merchant_id, product_name=product_name, units=units, val=val, currency_id=currency_id)
    return get_success_response()

def make_product_object(product_tuple):
    return {
        "id": product_tuple[0],
        "merchant_id": product_tuple[1],
        "product_name": product_tuple[2],
        "units": product_tuple[3],
        "val": product_tuple[4],
        "currency_id": product_tuple[5]
    }

# GET requests
@app.route('/products', methods=['GET']) # TESTED
def get_products():
    products = dbinterface.get_product([])
    list_of_products = []
    for product_tuple in products:
        list_of_products.append(make_product_object(product_tuple))
    return jsonify(list_of_products)

@app.route('/products/<id>', methods=['GET']) # TESTED
def get_product(id):
    product = dbinterface.get_product([("id", id)])[0]
    product_object = make_product_object(product)
    return product_object
