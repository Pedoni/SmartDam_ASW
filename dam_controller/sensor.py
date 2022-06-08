import time
import random
import math
import requests


def main():
    n = random.uniform(0, 5)
    while True:
        time.sleep(5)
        x = math.sin(n/3) * 50 + 150 # generates values inside [100;200]
        n += 1
        print("[sensor]: sending " + str(x))
        _ = requests.post(
            "http://dam_backend:3000/api/data",
            json={"value": "{:.2f}".format(x)},
        )


if __name__ == "__main__":
    time.sleep(random.uniform(5, 15))
    print("[sensor]: started sensor")
    main()
