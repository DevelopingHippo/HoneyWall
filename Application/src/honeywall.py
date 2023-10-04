import honeypots
import mysql.connector
from threading import Thread

database = mysql.connector.connect(host="db_honey", database='honeywall', user='honeywall', password='P@ssw0rd')
cur = database.cursor()
data_id = 0
HOST = "0.0.0.0"





def honeywall():
    http_thread = Thread(target=http_socket)
    ssh_thread = Thread(target=ssh_socket)
    https_thread = Thread(target=https_socket)
    telnet_thread = Thread(target=telnet_socket)

    http_thread.start()
    https_thread.start()
    telnet_thread.start()
    ssh_thread.start()


def http_socket():
    print("Testing HTTP Thread")
    http_server = honeypots.QHTTPServer(port=80)
    http_server.run_server(process=True)
    http_server.test_server(port=80)
    http_server.kill_server()


def ssh_socket():
    print("Testing SSH Thread")
    ssh_server = honeypots.QSSHServer(port=2222)
    ssh_server.run_server(process=True)
    ssh_server.test_server(port=2222)
    ssh_server.kill_server()


def https_socket():
    print("Testing HTTPS Thread")
    https_server = honeypots.QHTTPSServer(port=443)
    https_server.run_server(process=True)
    https_server.test_server(port=443)
    https_server.kill_server()


def telnet_socket():
    print("Testing Telnet Thread")
    telnet_server = honeypots.QTelnetServer(port=23)
    telnet_server.run_server(process=True)
    telnet_server.test_server(port=23)
    telnet_server.kill_server()


def query_connection(dst_ip, dst_port, src_ip, src_port, protocol, time_of_attack, date, service, location, packets):
    global data_id
    query = "INSERT INTO connections VALUES (%d, %s, %d, %s, %d, %s, %s, %s, %s, %s, %d)"
    data = (data_id, dst_ip, dst_port, src_ip, src_port, protocol, time_of_attack, date, service, location, packets)
    cur.execute(query, data)
    database.commit()
    data_id += 1

def main():
    global data_id
    print("Starting HoneyWall Application")
    #cur.execute("SELECT max(id) as last_id FROM connections LIMIT 1")
    #result = cur.fetchone()
    #data_id = int(result) + 1
    # THIS IS TO TEST
    honeywall()

if __name__ == "__main__":
    print("Starting")
    main()
