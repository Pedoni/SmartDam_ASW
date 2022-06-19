# SmartDam_ASW

## Requirements
This project requires Docker installed. Each container (backend, frontend and sensors) will manage its own dependencies on the fly.

If you want to run only one module of this project stand-alone outside of a container, here are the requirements:
 - `backend`: nodejs, npm
 - `frontend`: nodejs, npm
 - `waterlevel_sensor`: python 3, pip
 - `weather_sensor`: python 3, pip

## For local development
First, make sure to have compiled all the `*.scss` files inside `dam_frontend`. To do so, run
`make sass` inside the `dam_frontend` folder.

Run `make dev`, then:
 - the frontend will be available [here](localhost:8080)
 - the backend will be available [here](http://localhost:3000)

### Testing
You can run the unit tests implemented for the backend by running `make test` inside the `dam_backend` folder.

### Cleanup
Run `make down` to remove containers and docker networks.

## For production
First, make sure to have compiled all the `*.scss` files inside `dam_frontend`. To do so, run
```bash
cd dam_frontend
make sass
```

Run `make prod`, then:
 - the frontend will be available [here](localhost:8080)
 - the backend will be available [here](http://localhost:3000)

### Cleanup
Run `make down` to remove containers and docker networks.
