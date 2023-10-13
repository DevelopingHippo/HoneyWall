CREATE DATABASE IF NOT EXISTS honeywall;
use honeywall;

# Connections Table
create table connections(
    id INT NOT NULL AUTO_INCREMENT,
    dst_ip VARCHAR(15),
    dst_port INT,
    src_ip VARCHAR(15),
    src_port INT,
    date_time DATETIME,
    service VARCHAR(30),
    location VARCHAR(2),
    primary key (id)
);
create table ssh(
    id INT NOT NULL,
    username VARCHAR(64),
    password VARCHAR(64),
    FOREIGN KEY (id) REFERENCES connections(id)
);
create table smb(
    id INT NOT NULL,
    username VARCHAR(64),
    password VARCHAR(64),
    FOREIGN KEY (id) REFERENCES connections(id)
);
create table telnet(
   id INT NOT NULL,
   username VARCHAR(64),
   password VARCHAR(64),
   FOREIGN KEY (id) REFERENCES connections(id)
);
create table http(
    id INT NOT NULL,
    username VARCHAR(64),
    password VARCHAR(64),
    FOREIGN KEY (id) REFERENCES connections(id)
);
create table https(
    id INT NOT NULL,
    username VARCHAR(64),
    password VARCHAR(64),
    FOREIGN KEY (id) REFERENCES connections(id)
);
create table ftp(
    id INT NOT NULL,
    username VARCHAR(64),
    password VARCHAR(64),
    FOREIGN KEY (id) REFERENCES connections(id)
);