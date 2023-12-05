from mysql.connector import connect
from random import randint
import datetime
from http import HTTPStatus
from mimetypes import guess_type
from urllib.parse import urljoin, urlparse
from os import path, getcwd, getenv
from contextlib import suppress
from asyncio import sleep as asleep
from asyncio import run as arun
from asyncio import gather
from websockets import serve
from json import dumps
import pytz
from ip2geotools.databases.noncommercial import DbIpCity
import urllib.request

IP = '0.0.0.0'
WEBSOCKET_PORT = 5678
WEBSOCKETS = set()

db_host = "db_honey"
db_user = "web"
db_password = 'xDQKd4wKWJO8YOCT7VALbdCX905DS1p'
db = "honeywall"
time_zone_env = 'America/Detroit'
latitude = "38.97093068774403"
longitude = "-100.94153698531862"



async def websocket_task(websocket, path):
    WEBSOCKETS.add(websocket)
    time_stamp = datetime.datetime.now()
    time_stamp = time_stamp.strftime('%Y-%m-%dT%H:%M:%S.%f')
    timestamp = convert_timezone(time_stamp)
    conn = connect(host=db_host, user=db_user, password=db_password, database=db,autocommit=True)
    cursor = conn.cursor()
    while True:
        ret = [] # longitude, latitude,
        cursor.execute("select id,src_ip,src_port,dst_ip as dest_ip, dst_port as dest_port, latitude, longitude, date_time from connections where date_time >= '" + timestamp + "'")
        time_stamp = datetime.datetime.now()
        time_stamp = time_stamp.strftime('%Y-%m-%dT%H:%M:%S.%f')
        timestamp = convert_timezone(time_stamp)
        result = cursor.fetchall()
        for item in result:
            parameters = {
                "function":"marker",
                "method": "name",
                "object": {
                    "from": "{},{}".format(item[5], item[6]),
                    "to": "{},{}".format(latitude, longitude)
                },
                "color": {
                    "line": {
                        "from": "#{:06x}".format(randint(255, 16777216)),
                        "to": "#{:06x}".format(randint(255, 16777216))
                    }
                },
                "timeout": 1000,
                "options": [
                    "line",
                    "single-output",
                    "multi-output"
                ]
            }
            ret.append(parameters)
        if len(ret) > 0:
            for ws in WEBSOCKETS:
                if not ws.closed:
                    await gather(ws.send(dumps(ret)), return_exceptions=False)
        await asleep(randint(1, 2))
    WEBSOCKETS.remove(websocket)

def convert_timezone(time_string):
    # Fix Time Stamp Format
    time_array = time_string.split("T")
    utc_time_string = str(time_array[0]) + " " + str(time_array[1])
    time_array = utc_time_string.split(".")
    utc_time_string = str(time_array[0]) + " UTC"

    # Define UTC and EST timezones
    utc_timezone = pytz.timezone('UTC')
    new_timezone = pytz.timezone(time_zone_env)

    # Parse the input UTC string to a datetime object
    utc_time = datetime.datetime.strptime(utc_time_string, '%Y-%m-%d %H:%M:%S %Z')
    utc_time = utc_timezone.localize(utc_time)

    # Convert UTC time to EST time
    new_time = utc_time.astimezone(new_timezone)

    # Format the EST time as a string
    new_time_str = str(new_time.strftime('%Y-%m-%d %H:%M:%S'))

    return new_time_str


def ip_lookup():
    ip = request.urlopen('https://ident.me').read().decode('utf8')
    res = DbIpCity.get(ip, api_key="free")
    global latitude
    global longitude
    latitude = res.latitude
    longitude = res.longitude


async def main():
    print("Starting Raven WS Server")
    ip_lookup()
    await serve(websocket_task, IP, WEBSOCKET_PORT)
    try:
        while True:
            await asleep(0.1)
    except KeyboardInterrupt:
        exit()


arun(main())
