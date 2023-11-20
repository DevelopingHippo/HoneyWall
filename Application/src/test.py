import requests


def getIPLocationBackup(ip):
    try:
        response = requests.get(f'https://ipapi.co/{ip}/json/').json()
        if response.get("country_code") == "":
            return getIPLocationBackup(ip)
        else:
            return response.get("country_code")
    except Exception as e:
        print(e)
        return ""


def getIPLocation(ip):
    try:
        response = requests.get(f'https://api.iplocation.net/?cmd=ip-country&ip=' + ip).json()
        if response.get("country_code2") == "":
            return getIPLocationBackup(ip)
        else:
            return response.get("country_code2")
    except Exception as e:
        print(e)
        getIPLocationBackup(ip)


print(getIPLocation("47.6.10.9"))
