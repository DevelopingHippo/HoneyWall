# TODO
# convert ip address to geolocation
# make sure that the data is sent to db properly


# imports for the program
import os
import mysql.connector
import time
import json

# setting log path variables
logpath = "/var/log/honeypots/"

# executing command to start the honeypots, root doesnt matter because it will be root in the container
os.system("sudo -E python3 -m honeypots --setup ssh,http,https,telnet --config honeypotconfig.json")

# connecting to db
db = mysql.connector.connect(
    host="db_honey",
    user="honeywall",
    password="P@ssw0rd",
    database="honeywall"
)
cursor = db.cursor()


# connection to the database to actually push the data
def query_connection(dst_ip, dst_port, src_ip, src_port, timestamp, date, service, location):
    query = "INSERT INTO connections VALUES (%s, %d, %s, %d, %s, %s, %s)"
    data = (dst_ip, dst_port, src_ip, src_port, timestamp, service, location)
    cursor.execute(query, data)
    db.commit()

def query_login(service_name):
        query = "INSERT INTO " + service_name + " VALUES (%s, %s)"
        data = ()
        cursor.execute(query, data)
        db.commit()



# read/write the file, send contents to the database connection method, clear the file
def logparse(service_name):
    filelog = open((logpath + service_name + ".log"), 'r+')
    for line in filelog:
        x = json.loads(line)
        action = x["action"]
        if action == "login":
            status = x["status"]
            dest_ip = x["dest_ip"]
            dest_port = x["dest_port"]
            src_ip = x["src_ip"]
            src_port = x["src_port"]
            timeformat = x["timestamp"]
            timeformat = timeformat.split("T")
            timeformat2 = timeformat[1].split(".")
            timestamp = str(timeformat[0]) + " " + str(timeformat2[0])
            print(action, status, dest_ip, dest_port, src_ip, src_port, service_name, timestamp)
        elif action == "connection":
            dest_ip = x["dest_ip"]
            dest_port = x["dest_port"]
            src_ip = x["src_ip"]
            src_port = x["src_port"]
            timeformat = x["timestamp"]
            timeformat = timeformat.split("T")
            timestamp = str(timeformat[0]) + " " + str(timeformat[1])
            print(action, dest_ip, dest_port, src_ip, src_port, service_name, timestamp)
        else:
            continue

    filelog.truncate(0)
    filelog.close()

# while loop to constantly run through each protocol push and wait 30 seconds
while True:
    logparse("ssh")
    logparse("http")
    logparse("https")
    logparse("telnet")
    time.sleep(60)