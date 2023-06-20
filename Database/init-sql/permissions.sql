CREATE USER 'honey'@'%' IDENTIFIED BY 'P@ssw0rd'; #Change this password to be randomly generated
GRANT INSERT, SELECT ON honeywall.* TO 'honey'@'%';

CREATE USER 'web'@'%' IDENTIFIED BY 'P@ssw0rd'; #Change this password to be randomly generated
GRANT SELECT ON honeywall.* TO 'web'@'%';
GRANT INSERT, UPDATE, DELETE, SELECT on www.* TO 'web'@'%';

FLUSH PRIVILEGES;