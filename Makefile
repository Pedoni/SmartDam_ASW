dev:
	docker compose -f compose-dev.yml up --build

prod:
	docker compose -f compose-prod.yml up --build

test:
	docker compose -f compose-test.yml up -d --build
	cd dam_backend && npm test --detectOpenHandles
	cd ..
	docker compose -f compose-test.yml down

down:
	docker compose -f compose-dev.yml down
	docker compose -f compose-prod.yml down
	docker compose -f compose-test.yml down
