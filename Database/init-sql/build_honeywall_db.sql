# clear out current database tables

CREATE DATABASE IF NOT EXISTS honeywall;
use honeywall;

# CREATE HONEYWALL USER THAT ONLY HAS ACCESS TO WRITE TO THIS DATABASE

# Connections Table
create table connections(
    id INT NOT NULL,
    dst_ip VARCHAR(15),
    dst_port INT,
    src_ip VARCHAR(15),
    src_port INT,
    protocol VARCHAR(3),
    time TIME,
    date DATE,
    service VARCHAR(30),
    location VARCHAR(2),
    packets INT,
    primary key (id)
);