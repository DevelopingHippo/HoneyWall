# TODO
# convert ip address to geolocation
# make sure that the data is sent to db properly

# imports for the program
import os
import mysql.connector
import time
import json


# connection to the database to actually push the data
def query_connection(dst_ip, dst_port, src_ip, src_port, service, timestamp, location):
    db = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_database
    )

    cursor = db.cursor(buffered=True)

    global data_id
    data_id += 1
    query = "INSERT INTO connections VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    data = (data_id, dst_ip, dst_port, src_ip, src_port, timestamp, service, location)
    cursor.execute(query, data)
    db.commit()
    db.close()

def query_login(username, password):
    db = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_database
    )


    global data_id
    query = "INSERT INTO logins VALUES (%s, %s, %s)"
    data = (data_id, username, password)
    cursor.execute(query, data)
    db.commit()
    db.close()


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


# setting log path variables
data_id = 0
logpath = "/var/log/honeypots/"

db_password = os.getenv('DB_PASSWORD')

db_user = 'honey'
db_host = 'db_honey'
db_database = 'honeywall'


# executing command to start the honeypots, root doesnt matter because it will be root in the container
os.system("python3 -m honeypots --setup ssh,http,https,telnet --config honeypotconfig.json")

time.sleep(20)


# connecting to db
db = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_database
)

while not db.is_connected():
    db = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_database
    )

cursor = db.cursor(buffered=True)
cursor.execute("SELECT max(id) as last_id FROM connections LIMIT 1")

result = cursor.fetchall()
if result != None:
    data_id = result[0]
db.close()


# while loop to constantly run through each protocol push and wait 30 seconds
while True:
    logparse("ssh")
    logparse("http")
    logparse("https")
    logparse("telnet")
    time.sleep(10)