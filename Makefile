DC=docker compose
DEVFILE=compose-dev.yml
PRODFILE=compose-prod.yml
TESTFILE=compose-test.yml

dev:
	${DC} -f ${DEVFILE} up --build

prod:
	${DC} -f ${PRODFILE} up --build

test:
	${DC} -f ${TESTFILE} up -d --build
	cd dam_backend && npm test --detectOpenHandles && cd ..
	${DC} -f ${TESTFILE} down

down:
	${DC} -f ${DEVFILE} down
	${DC} -f ${PRODFILE} down
	${DC} -f ${TESTFILE} down
