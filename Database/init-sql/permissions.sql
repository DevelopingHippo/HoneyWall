CREATE USER 'honey'@'%' IDENTIFIED BY 'DSqFO9Cr3ZNzBLJIpz3G2AlC9gN9HtR'; # Change this password to be randomly generated
GRANT INSERT, SELECT ON honeywall.* TO 'honey'@'%';

CREATE USER 'web'@'%' IDENTIFIED BY 'xDQKd4wKWJO8YOCT7VALbdCX905DS1p'; #Change this password to be randomly generated
GRANT SELECT ON honeywall.* TO 'web'@'%';

FLUSH PRIVILEGES;