CREATE DATABASE IF NOT EXISTS honeywall;
use honeywall;

# Connections Table
create table connections(
    id INT NOT NULL,
    dst_ip VARCHAR(15),
    dst_port INT,
    src_ip VARCHAR(15),
    src_port INT,
    date_time DATETIME,
    service VARCHAR(30),
    location VARCHAR(2),
    primary key (id)
);
create table logins(
    id INT NOT NULL,
    username VARCHAR(64),
    password VARCHAR(64),
    FOREIGN KEY (id) REFERENCES connections(id)
);