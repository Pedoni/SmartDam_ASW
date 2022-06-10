import time
import random
import math
import sys
import requests


def main(quiet=False):
    n = random.uniform(0, 5)
    while True:
        time.sleep(5)
        x = math.sin(n / 3) * 50 + 100  # generates values inside [50;150]
        n += 1
        if not quiet:
            print("[sensor]: sending " + str(x))
        _ = requests.post(
            "http://dam_backend:3000/api/data",
            json={"value": "{:.2f}".format(x)},
        )


if __name__ == "__main__":
    time.sleep(random.uniform(5, 15))
    if len(sys.argv) >= 2 and sys.argv[1] == "quiet":
        quiet = True
    else:
        quiet = False
    if not quiet:
        print("[sensor]: started sensor")
    main(quiet)
