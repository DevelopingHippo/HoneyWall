CREATE DATABASE IF NOT EXISTS honeywall;
use honeywall;

# Connections Table
create table connections(
    id INT NOT NULL AUTO_INCREMENT,
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

insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 443, "40.11.217.61", 32471, "tcp", "2023-06-29 21:28:11", "https", "FJ", 898);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 1433, "115.149.63.24", 12994, "tcp", "2023-06-29 6:16:5", "SQL", "AD", 784);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 443, "152.94.96.103", 46206, "tcp", "2023-06-29 3:0:23", "https", "AT", 112);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 21, "40.11.217.61", 64707, "tcp", "2023-06-29 3:40:48", "ftp", "PM", 352);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 1433, "4.21.39.252", 23748, "tcp", "2023-06-29 23:5:26", "SQL", "LR", 65);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 1433, "50.77.242.84", 21701, "tcp", "2023-06-29 3:53:11", "SQL", "ET", 565);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3306, "40.11.217.61", 17459, "tcp", "2023-06-29 19:27:12", "MySQL", "ET", 561);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3306, "22.230.185.103", 55127, "tcp", "2023-06-29 15:2:53", "MySQL", "IQ", 986);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 21, "22.230.185.103", 60331, "tcp", "2023-06-29 6:8:2", "ftp", "BA", 257);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 1433, "90.10.1.73", 43834, "tcp", "2023-06-29 6:8:49", "SQL", "GN", 985);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 80, "40.11.217.61", 58924, "tcp", "2023-06-29 2:22:17", "http", "FI", 125);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 22, "210.41.238.88", 26591, "tcp", "2023-06-29 2:19:12", "ssh", "FK", 740);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 80, "90.10.1.73", 40246, "tcp", "2023-06-29 6:43:49", "http", "GI", 791);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3306, "190.234.240.81", 53358, "tcp", "2023-06-29 3:45:18", "MySQL", "CR", 575);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 21, "90.10.1.73", 8411, "tcp", "2023-06-29 20:31:14", "ftp", "PM", 521);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 1433, "115.149.63.24", 24319, "tcp", "2023-06-29 17:16:28", "SQL", "MK", 731);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 1433, "40.11.217.61", 57403, "tcp", "2023-06-29 19:16:33", "SQL", "FI", 798);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3389, "117.105.54.221", 4820, "tcp", "2023-06-29 13:4:38", "RDP", "EC", 99);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3306, "210.41.238.88", 5854, "tcp", "2023-06-29 12:24:47", "MySQL", "GR", 320);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3389, "90.10.1.73", 4316, "tcp", "2023-06-29 8:38:28", "RDP", "SY", 250);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3306, "190.234.240.81", 638, "tcp", "2023-06-29 8:26:28", "MySQL", "PM", 354);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3389, "210.41.238.88", 15256, "tcp", "2023-06-29 9:13:4", "RDP", "MG", 866);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 23, "117.105.54.221", 7401, "tcp", "2023-06-29 15:40:36", "telnet", "DE", 111);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 445, "4.21.39.252", 49121, "tcp", "2023-06-29 18:52:6", "smb", "KH", 510);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 22, "22.230.185.103", 28441, "tcp", "2023-06-29 10:13:1", "ssh", "FM", 600);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3389, "117.105.54.221", 59118, "tcp", "2023-06-29 19:21:18", "RDP", "LB", 128);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 445, "22.230.185.103", 19343, "tcp", "2023-06-29 18:3:18", "smb", "IO", 801);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 80, "4.21.39.252", 44130, "tcp", "2023-06-29 13:54:57", "http", "CZ", 922);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 21, "50.77.242.84", 62010, "tcp", "2023-06-29 21:45:23", "ftp", "SA", 267);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 21, "190.234.240.81", 28739, "tcp", "2023-06-29 23:34:23", "ftp", "TL", 463);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 443, "115.149.63.24", 63572, "tcp", "2023-06-29 14:17:15", "https", "CY", 466);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3306, "50.77.242.84", 45899, "tcp", "2023-06-29 19:48:41", "MySQL", "FM", 979);
insert into connections (dst_ip, dst_port, src_ip, src_port, protocol, date_time, service, location, packets) VALUES ("10.0.1.1", 3306, "40.11.217.61", 64916, "tcp", "2023-06-29 5:6:20", "MySQL", "BB", 960);


