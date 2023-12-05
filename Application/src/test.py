import requests
from ip2geotools.databases.noncommercial import DbIpCity


def ip_lookup_1(ip):
    res = DbIpCity.get(ip, api_key="free")
    return [res.country, res.longitude, res.latitude]


def ip_lookup_2(ip):
    response = requests.get("https://geolocation-db.com/jsonp/" + ip).json()
    print(response)


def ip_lookup_3(ip):
    response = requests.get(f'https://ipapi.co/{ip}/json/').json()
    return [response.get("country_code"), response.get("latitude"), response.get("longitude"), ]


ip_addr = "47.6.19.10"

print(ip_lookup_1(ip_addr))

print(ip_lookup_3(ip_addr))
