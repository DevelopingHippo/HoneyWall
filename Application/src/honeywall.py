#imports for the program
import os
import mysql.connector
import time

#setting log path variables
ssh_logpath = "/var/logs/honeypots/ssh.log"
http_logpath = "/var/logs/honeypots/http.log"
https_logpath = "/var/logs/honeypots/https.log"
telnet_logpath = "/var/logs/honeypots/telnet.log"

#executing command to start the honeypots
os.system("sudo -E python3 -m honeypots --setup ssh,http,https,telnet --config honeypotconfig.json")

#connecting to db
db = mysql.connector.connect(
  host="db_honey",
  user="honeywall",
  password="P@ssw0rd",
  database="honeywall"
)
cursor = db.cursor()


#read the file, send contents to the database connection method, clear the file
def ssh_log_push():
  ssh_log = open(ssh_logpath, 'w')
  for line in ssh_log:
    query_connection(line)

  ssh_log.close()

def http_log_push():
  http_log = open(http_logpath, 'w')

  http_log.close()

def https_log_push():
  https_log = open(https_logpath, 'w')

  https_log.close()

def telnet_log_push():
  telnet_log = open(telnet_logpath, 'w')

  telnet_log.close()


#connection to the database to actually push the data
def query_connection(dst_ip, dst_port, src_ip, src_port, protocol, time_of_attack, date, service, location, packets):
  query = "INSERT INTO connections VALUES (%d, %s, %d, %s, %d, %s, %s, %s, %s, %s, %d)"
  data = (dst_ip, dst_port, src_ip, src_port, protocol, time_of_attack, date, service, location, packets)
  cursor.execute(query, data)
  db.commit()


#while loop to constantly run through each protocol push and wait 30 seconds
while True:
  ssh_log_push()
  #http_log_push()
  #https_log_push()
  #telnet_log_push()
  time.sleep(30)