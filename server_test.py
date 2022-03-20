import requests
import json

url = 'http://localhost:5000/merchants'

json_as_dict = {
    'name': 'kunan',
    'email': 'somethjing@g.com',
    'wallet_addr': 'SOMESHAEHERE'
}

data = json.dump(json_as_dict)

requests.post(url='http://localhost:5000/merchants', data=data)