# TODO
# convert ip address to geolocation
# make sure that the data is sent to db properly

# imports for the program
import os
import mysql.connector
import time
import json
import requests
import pytz
import datetime


def getIPLocation(ip):
    try:
        response = requests.get(f'https://ipapi.co/{ip}/json/').json()
        return response.get("country_name")
    except Exception as e:
        print(e)
        time.sleep(5)
        return getIPLocation(ip)


def convert_timezone(time_string):
    # Fix Time Stamp Format
    time_array = time_string.split("T")
    utc_time_string = str(time_array[0]) + " " + str(time_array[1])
    time_array = utc_time_string.split(".")
    utc_time_string = str(time_array[0]) + " UTC"

    # Define UTC and EST timezones
    utc_timezone = pytz.timezone('UTC')
    est_timezone = pytz.timezone(time_zone_env)

    # Parse the input UTC string to a datetime object
    utc_time = datetime.datetime.strptime(utc_time_string, '%Y-%m-%d %H:%M:%S %Z')
    utc_time = utc_timezone.localize(utc_time)

    # Convert UTC time to EST time
    est_time = utc_time.astimezone(est_timezone)

    # Format the EST time as a string
    new_time_str = est_time.strftime('%Y-%m-%d %H:%M:%S')

    return new_time_str


# connection to the database to actually push the data
def query_connection(dst_ip, dst_port, src_ip, src_port, service, timestamp, location):
    db_conn = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_database
    )
    db_cursor = db_conn.cursor()
    global data_id
    data_id += 1
    query = "INSERT INTO connections VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    data = (data_id, dst_ip, dst_port, src_ip, src_port, timestamp, service, location)
    db_cursor.execute(query, data)
    db_conn.commit()
    db_conn.close()


def query_login(username, password):
    db_conn = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_database
    )
    db_cursor = db_conn.cursor()
    global data_id

    query = "INSERT INTO logins VALUES (%s, %s, %s)"
    data = (data_id, username, password)
    db_cursor.execute(query, data)
    db_conn.commit()
    db_conn.close()


# read/write the file, send contents to the database connection method, clear the file
def logparse(service_name):
    if os.path.isfile(logpath + service_name + ".log"):
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
                timestamp = convert_timezone(x["timestamp"])
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
