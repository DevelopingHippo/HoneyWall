CREATE USER 'honey'@'app_honey' IDENTIFIED BY 'P@ssw0rd'; #Change this password to be randomly generated
GRANT INSERT ON honeywall.* TO 'honey'@'app_honey';

CREATE USER 'web'@'web_honey' IDENTIFIED BY 'P@ssw0rd'; #Change this password to be randomly generated
GRANT SELECT ON honeywall.* TO 'web'@'web_honey';
GRANT CREATE,ALTER,INSERT,UPDATE,DELETE,SELECT on www.* TO 'web'@'web_honey';

FLUSH PRIVILEGES;