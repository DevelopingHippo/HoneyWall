#imports for the program
import os
import mysql.connector

#setting variables
filepath = "/var/logs/honeypots/"

#executing command to start the honeypots
os.system("sudo -E python3 -m honeypots --setup ssh,http,https,telnet --config honeypotconfig.json")

#connecting to db
mydb = mysql.connector.connect(
  host="localhost",
  user="username",
  password="password"
)

