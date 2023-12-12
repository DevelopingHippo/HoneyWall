import datetime
from random import randint
from asyncio import sleep as asleep
from asyncio import run as arun
from asyncio import gather
from websockets import serve, WebSocketServerProtocol
from json import dumps
import pytz
from ip2geotools.databases.noncommercial import DbIpCity
from urllib.request import urlopen
import aiomysql

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

async def create_pool():
    return await aiomysql.create_pool(
        host=db_host,
        user=db_user,
        password=db_password,
        db=db,
        autocommit=True,
        minsize=5,
        maxsize=10
    )

async def close_pool(pool):
    pool.close()
    await pool.wait_closed()

async def fetch_data(cursor, timestamp):
    query = "SELECT id, src_ip, src_port, dst_ip AS dest_ip, dst_port AS dest_port, latitude, longitude, location, service, date_time FROM connections WHERE date_time >= %s LIMIT 25"
    await cursor.execute(query, (timestamp,))
    return await cursor.fetchall()

async def websocket_task(websocket: WebSocketServerProtocol, path):
    WEBSOCKETS.add(websocket)

    time_stamp = datetime.datetime.now()
    time_stamp = time_stamp.strftime('%Y-%m-%dT%H:%M:%S.%f')
    timestamp = convert_timezone(time_stamp)

    pool = await create_pool()
    async with pool.acquire() as connection:
        async with connection.cursor() as cursor:
            try:
                while True:
                    ret = []

                    result = await fetch_data(cursor, timestamp)

                    for item in result:
                        parameters = create_parameters(item)
                        ret.append(parameters)

                    if ret:
                        await gather(*(ws.send(dumps(ret)) for ws in WEBSOCKETS if not ws.closed), return_exceptions=False)

                    await asleep(randint(1, 2))

            except Exception as e:
                print(f"Error in WebSocket task: {e}")

            finally:
                WEBSOCKETS.remove(websocket)
                await close_pool(pool)

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
    

def create_parameters(item):
    for item in result:
        service = format(item[8])
        if item[5] == "" or item[6] == "":
            parameters = {
                "function": "marker",
                "method": "name",
                "object": {
                    "from": "0,{}".format(item[7]),
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
        else:
            parameters = {
                "function": "marker",
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
            

def ip_lookup():
    ip = urlopen('https://ident.me').read().decode('utf8')
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
