# clear out current database tables

CREATE DATABASE IF NOT EXISTS www;
use www;

# CREATE web USER THAT ONLY HAS ACCESS TO R/W TO WWW DATABASE AND R FROM honeywall DATABASE


# Connections Table
create table users(
    username VARCHAR(25) NOT NULL,
    password VARCHAR(32) NOT NULL,
    email VARCHAR(50),
    isAdmin BOOLEAN,
    primary key (username)
);

create table user_pref(
    username VARCHAR(25) NOT NULL,
    default_page VARCHAR(25),
    FOREIGN KEY (username) REFERENCES users(username)
);

create table config(
  default_page VARCHAR(25)
);