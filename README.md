# SmartDam_ASW

## For local development
First, make sure to have compiled all the `*.scss` files inside `dam_frontend`. To do so, run
```bash
cd dam_frontend
make sass
```

Run `make dev`, then:
 - the frontend will be available [here](localhost:8080)
 - the backend will be available [here](http://localhost:3000/api/dashboard)

## For production
First, make sure to have compiled all the `*.scss` files inside `dam_frontend`. To do so, run
```bash
cd dam_frontend
make sass
```

Run `make prod`, then:
 - the frontend will be available [here](localhost:8080)
 - the backend will be available [here](http://localhost:3000/api/dashboard)

### Cleanup
Run `make down` to remove containers and docker networks.
