import os
import psycopg2
import traceback

DATABASE = os.environ.get('DB_DATABASE') or 'cuboid'
HOST = os.environ.get('DB_HOST') or 'localhost'
PORT = os.environ.get('DB_PORT') or 5432
USERNAME = os.environ.get('DB_USERNAME') or 'postgres'
PASSWORD = os.environ.get('DB_PASSWORD') or 'password'

print(DATABASE)
print(HOST)
print(PORT)
print(USERNAME)
print(PASSWORD)

def get_connect_to_database():
    conn = psycopg2.connect(dbname=DATABASE, host=HOST, port=PORT, user=USERNAME, password=PASSWORD)
    return conn

def close_database_connection(conn):
    conn.close()

def create_values_string(value):
    accum_string = "("
    for i in range(len(value)):
        if i == len(value) - 1:
            accum_string = accum_string + f"'{value[i]}'"
        elif value[i].startswith('nextval'):
            accum_string = accum_string + str(value[i]) + ','
        else:
            accum_string = accum_string + f"'{value[i]}'" + ","
    accum_string = accum_string + ")"
    return accum_string

print(create_values_string(("nextval('customer_id_sequence')", "merchant_id", "name", "wallet_addr")))

# CRUD for Merchants, Customers, Currency, Products, Transactions, Invoices
def create_table_row(table, value):
    values_string = create_values_string(value)
    sql = f"insert into {table} values {values_string};"
    print(sql)
    conn = get_connect_to_database()
    cur = conn.cursor()
    try:
        cur.execute(sql, )
        cur.close()
        conn.commit()
        close_database_connection(conn)
    except:
        print(f"The query {sql} did not execute")
        traceback.print_exc()
        cur.close()
        close_database_connection(conn)

# wheres has format [(), (), ()]
def get_table_row(table, wheres):
    accum = "where "
    for (column, value) in wheres:
        accum = accum + f"{column}={value}" + " and "
    where_clause = str.join(" ", accum.split()[:-1])
    sql = f"select {table} from {table} {where_clause};"
    print(sql)
    conn = get_connect_to_database()
    cur = conn.cursor()
    try:
        cur.execute(sql)
        rows = cur.fetchall()
        cur.close()
        conn.commit()
        close_database_connection(conn)
        return rows
    except:
        print(f"The query {sql} did not execute")
        traceback.print_exc()
        cur.close()
        close_database_connection(conn)

# wheres format is [(),(),()]
def delete_table_row(table, wheres):
    accum = "where "
    for (column, value) in wheres:
        accum = accum + f"{column}={value}" + " and "
    where_clause = str.join(" ", accum.split()[:-1])
    sql = f"delete from {table} {where_clause}"
    conn = get_connect_to_database()
    cur = conn.cursor()
    try:
        cur.execute(sql)
        cur.close()
        conn.commit()
        close_database_connection(conn)
    except:
        print(f"The query {sql} did not execute")
        traceback.print_exc()
        cur.close()
        close_database_connection(conn)

# Merchant Object is (id, name, email, mailing_addr, shipping_addr, wallet_addr)
def create_merchant(name, email, wallet_addr):
    create_table_row("merchants", ("nextval('merchant_id_sequence')", name, email, wallet_addr))

def get_merchant(wheres):
    return get_table_row("merchants", wheres)

def delete_merchant(wheres):
    delete_table_row("merchants", wheres)

# Customer Object is (id, merchant_id, name, email, phone, mailing_addr, shipping_addr)
def create_customer(merchant_id, name, wallet_addr):
    create_table_row("customers", ("nextval('customer_id_sequence')", merchant_id, name, wallet_addr))

def get_customer(wheres):
    return get_table_row("customers", wheres)

# Currency Object is (id, name)
def create_currency(name):
    create_table_row("currency", ("nextval('currency_id_sequence')", name))

def get_currency(wheres):
    return get_table_row("currency", wheres)

# Product Object is (id, merchant_id, product_name, product_id, units, val, currency_id)
def create_product(merchant_id, product_name, units, val, currency_id):
    create_table_row("products", ("nextval('product_id_sequence')", merchant_id, product_name, units, val, currency_id))

def get_product(wheres):
    return get_table_row("products", wheres)

def delete_product(wheres):
    delete_table_row("products", wheres)

# Invoice Object is (id, amount, status, currency_id, customer_id, merchant_id, expiry)
def create_order(id, amount, status, currency_id, customer_id, merchant_id, expiry):
    create_table_row("orders", (id, amount, status, currency_id, customer_id, merchant_id, expiry))

def get_invoice(wheres):
    return get_table_row("orders", wheres)



# create_merchant(2, "neil", "n@g.com", "home", "home", "PUTSHAHERE")
# print(get_merchant([("id", 2)]))
# delete_merchant([("id", 2)])