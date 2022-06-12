import time
import random
import math
import sys
import requests


def log(msg: str):
    print("[weather_sensor]: " + msg)


def main(quiet=False):
    n = random.uniform(0, 5)
    while True:
        time.sleep(5)
        n += 1
        _ = requests.post(
            "http://dam_backend:3000/api/weather",
            json={
                "water_temperature": math.sin(n / 4) * 2 + 10,
                "air_temperature": math.sin(n / 5) * 5 + 25,
                "atmospheric_pressure": math.sin(n / 2) * 20 + 1000,
                "humidity": math.sin(n / 3) * 30 + 60,
                "rain": math.sin(n / 6) * 2 + 2,
            },
        )


if __name__ == "__main__":
    time.sleep(random.uniform(5, 15))
    if len(sys.argv) >= 2 and sys.argv[1] == "quiet":
        quiet = True
    else:
        quiet = False
    if not quiet:
        log("started sensor")
    main(quiet)
