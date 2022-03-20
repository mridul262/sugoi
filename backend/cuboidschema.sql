create database if not exists cuboid;

create table if not exists master_wallet (
    wallet_addr varchar(256) primary key
);


create table if not exists merchants (
    id serial primary key,
    name varchar(256),
    email varchar(256),
    wallet_addr varchar(256) unique
);

create sequence merchant_id_sequence start 1 increment 1;

create table if not exists customers (
    id int primary key,
    merchant_id int references merchants (id),
    name varchar(256),
    wallet_addr varchar(256) unique
);

create sequence customer_id_sequence start 1 increment 1;

create table if not exists currency (
    id int primary key,
    name varchar(256)
);

create sequence currency_id_sequence start 1 increment 1;

create table if not exists products (
    id int primary key, 
    merchant_id int references merchants(id),
    product_name varchar(256),
    units int,
    val float,
    currency_id int references currency(id)
);

create sequence product_id_sequence start 1 increment 1;

create table if not exists orders (
    id int primary key,
    amount float,
    status varchar(256) default 'ACTIVE', 
    currency_id int references currency(id),
    customer_id int references customers(id),
    merchant_id int references merchants(id),
    expiry timestamp
);