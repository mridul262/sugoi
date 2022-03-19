create database if not exists cuboid;


create table if not exists merchants (
    id int primary key,
    name varchar(256),
    email varchar(256),
    mailing_addr varchar(256),
    shipping_addr varchar(256)
);


create table if not exists customers (
    id int primary key,
    merchant_id int references merchants (id),
    name varchar(256),
    email varchar(256),
    phone varchar(256),
    mailing_addr varchar(256),
    shipping_addr varchar(256)
);


create table if not exists currency (
    id int primary key,
    name varchar(256)
);

create table if not exists products (
    id int primary key, 
    merchant_id int references merchants(id),
    product_name varchar(256),
    product_id int,
    units int,
    val float,
    currency_id int references currency(id)
);

create table if not exists transactions (
    id int primary key,
    transaction_hash varchar(256),
    customer_id int references customers(id),
    merchant_id int references merchants(id),
    product_id int references products(id)
);

create table if not exists invoices (
    id int primary key,
    reference_number varchar(256),
    customer_id int references customers(id),
    merchant_id int references merchants(id),
    product_id int references products(id),
    transation_id int references transactions(id)
);
