# TODO
# convert ip address to geolocation
# make sure that the data is sent to db properly

# imports for the program
import os
import mysql.connector
import time
import json
from ip2geotools.databases.noncommercial import DbIpCity
import pytz
from datetime import datetime

def getIPLocation(ip):
    try:
        res = DbIpCity.get(ip, api_key="free")
        return res.country
    except Exception as e:
        print(e)
        time.sleep(5)
        return getIPLocation(ip)

def convertTime(utc):
    format = '%Y-%m-%d %H:%M:%S'
    date_obj = datetime.strptime(utc, format)
    converted_time = date_obj.astimezone(time_zone).strftime(format)
    return converted_time


# connection to the database to actually push the data
def query_connection(dst_ip, dst_port, src_ip, src_port, service, timestamp, location):
    db = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_database
    )
    cursor = db.cursor()
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
    cursor = db.cursor()
    global data_id

    query = "INSERT INTO logins VALUES (%s, %s, %s)"
    data = (data_id, username, password)
    cursor.execute(query, data)
    db.commit()
    db.close()


# read/write the file, send contents to the database connection method, clear the file
def logparse(service_name):
    if os.path.isfile(logpath + service_name + ".log") == True:
        filelog = open((logpath + service_name + ".log"), 'r+')
        for line in filelog:
            x = json.loads(line)
            action = x["action"]
            if action == "login":
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
                timestamp = convertTime(timestamp)
                location = getIPLocation(src_ip)
                query_connection(dest_ip, dest_port, src_ip, src_port, service_name, timestamp, location)
            else:
                continue
        filelog.truncate(0)
        filelog.close()


# setting log path variables
data_id = 0
logpath = "/var/log/honeypots/"

db_password = os.getenv('DB_PASSWORD')
time_zone_env = os.getenv('TZ')
time_zone = pytz.timezone(time_zone_env)

db_user = 'honey'
db_host = 'db_honey'
db_database = 'honeywall'


# executing command to start the honeypots, root doesnt matter because it will be root in the container
os.system("python3 -m honeypots --setup ssh,http,https,telnet --config honeypotconfig.json")

time.sleep(10)


# connecting to db
db = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_database
)

while not db.is_connected():
    time.sleep(10)
    db = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_database
    )

print("Successful Connection to Database")

cursor = db.cursor()
cursor.execute("SELECT max(id) as last_id FROM connections LIMIT 1")
result = cursor.fetchone()

if result[0] is not None:
    data_id = result[0]

db.close()


# while loop to constantly run through each protocol push and wait 30 seconds
while True:
    logparse("ssh")
    logparse("http")
    logparse("https")
    logparse("telnet")
    time.sleep(10)