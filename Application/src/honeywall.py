import socket

import mysql.connector
from threading import Thread
import time

database = mysql.connector.connect(host="db_honey", database='honeywall', user='honeywall', password='P@ssw0rd')
cur = database.cursor()
data_id = 0
HOST = "0.0.0.0"


def main():
    global data_id
    print("Starting HoneyWall Application")
    cur.execute("SELECT max(id) as last_id FROM connections LIMIT 1")
    result = cur.fetchone()
    data_id = int(result) + 1
    # THIS IS TO TEST
    query_connection("192.168.53.32", 70, "10.0.1.232", 2422, "tcp", "12:43:24", "2023-07-05", "http", "US", 1232)
    honeywall()


def honeywall():
    http_thread = Thread(target=http_socket)
    https_thread = Thread(target=https_socket)
    telnet_thread = Thread(target=telnet_socket())


def http_socket():
    print("Testing HTTP Thread")
    # with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    #     s.bind((HOST, 80))
    #     s.listen()
    #     client, addr = s.accept()
    #     with client:
    #         print("SRC IP: " + addr + "\n")
    #         print("DST IP: ")

def https_socket():
    print("Testing HTTPS Thread")


def telnet_socket():
    print("Testing Telnet Thread")


def query_connection(dst_ip, dst_port, src_ip, src_port, protocol, time, date, service, location, packets):
    global data_id
    query = "INSERT INTO connections VALUES (%d, %s, %d, %s, %d, %s, %s, %s, %s, %s, %d)"
    data = (data_id, dst_ip, dst_port, src_ip, src_port, protocol, time, date, service, location, packets)
    cur.execute(query, data)
    database.commit()
    data_id += 1


if __name__ == "__main__":
    main()
