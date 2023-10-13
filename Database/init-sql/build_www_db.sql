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

insert into users VALUES ("admin","9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08","user@email.com","John", "Smith",true);
insert into users VALUES ("user","9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08","user2@email.com","John", "Smith",false);