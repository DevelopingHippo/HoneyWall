CREATE DATABASE IF NOT EXISTS honeywall;
use honeywall;

# Connections Table
create table connections(
                            id INT NOT NULL,
                            dst_ip VARCHAR(15),
                            dst_port INT,
                            src_ip VARCHAR(15),
                            src_port INT,
                            protocol VARCHAR(3),
                            date_time DATETIME,
                            service VARCHAR(30),
                            location VARCHAR(2),
                            packets INT,
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
                    share VARCHAR(64),
                    FOREIGN KEY (id) REFERENCES connections(id)
);
create table telnet(
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


#Test Data
insert into connections VALUES (0, "10.0.1.1", 443, "172.21.24.111", 20300, "tcp", "2023-06-29 24:15:10", "https", "US", 1000);