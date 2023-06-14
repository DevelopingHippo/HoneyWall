# clear out current database tables

CREATE DATABASE [IF NOT EXISTS] honeywall;
use honeywall;


# example table
create table connections(
    data_id VARCHAR(10),
	src_ip VARCHAR(15),
    dst_ip VARCHAR(15),
    primary key (data_id)
);