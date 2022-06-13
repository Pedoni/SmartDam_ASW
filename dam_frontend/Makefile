default: install run

.PHONY: run

install:
	npm install

sass:
	sass src/css/login.scss src/css/login.css
	sass src/css/home.scss src/css/home.css
	sass src/css/graph.scss src/css/graph.css
	sass src/css/app.scss src/css/app.css
	sass src/css/controller.scss src/css/controller.css

run:
	npm run serve

lint:
	npm run lint

clean:
	rm -rf .sass-cache
	rm -rf node_modules
	rm src/css/*.css
	rm src/css/*.css.map
