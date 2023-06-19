CREATE DATABASE IF NOT EXISTS www;
use www;

# CREATE web USER THAT ONLY HAS ACCESS TO R/W TO WWW DATABASE AND R FROM honeywall DATABASE

# Connections Table
create table users(
    username VARCHAR(25) NOT NULL,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(50),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
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


insert into users VALUES ("username","password","user@email.com","John", "Smith",true);
