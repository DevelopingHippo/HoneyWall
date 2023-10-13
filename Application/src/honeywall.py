# TODO
# convert ip address to geolocation
# make sure that the data is sent to db properly

# imports for the program
import os
import mysql.connector
import time
import json

# setting log path variables
data_id = 0
logpath = "/var/log/honeypots/"

# executing command to start the honeypots, root doesnt matter because it will be root in the container
os.system("python3 -m honeypots --setup ssh,http,https,telnet --config honeypotconfig.json")

time.sleep(20)


# connecting to db
db = mysql.connector.connect(
    host="db_honey",
    user="honey",
    password="P@ssw0rd",
    database="honeywall"
)

while not db.is_connected():
    db = mysql.connector.connect(
        host="db_honey",
        user="honeywall",
        password="P@ssw0rd",
        database="honeywall"
    )

cursor = db.cursor()
cursor.execute("SELECT max(id) as last_id FROM connections LIMIT 1")
result = cursor.fetchone()
data_id = int(result[0]) + 1


# connection to the database to actually push the data
def query_connection(dst_ip, dst_port, src_ip, src_port, service, timestamp, location):
    data_id += 1
    query = "INSERT INTO connections VALUES (%s, %d, %s, %d, %s, %s, %s)"
    data = (dst_ip, dst_port, src_ip, src_port, timestamp, service, location)
    cursor.execute(query, data)
    db.commit()

def query_login(data_id, username, password):
    query = "INSERT INTO logins VALUES (%d, %s, %s)"
    data = (data_id, username, password)
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
            username = x["username"]
            password = x["password"]
            query_login(username, password)
        elif action == "connection":
            dest_ip = x["dest_ip"]
            dest_port = x["dest_port"]
            src_ip = x["src_ip"]
            src_port = x["src_port"]
            timeformat = x["timestamp"]
            timeformat = timeformat.split("T")
            timestamp = str(timeformat[0]) + " " + str(timeformat[1])
            location = "US"
            query_connection(dest_ip, dest_port, src_ip, src_port, service_name, timestamp, location)
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