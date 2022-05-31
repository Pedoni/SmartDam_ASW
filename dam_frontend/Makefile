default: install run

.PHONY: run

install:
	npm install

sass:
	sass src/css/login.scss src/css/login.css
	sass src/css/home.scss src/css/home.css
	sass src/css/panoramic.scss src/css/panoramic.css

run: sass
	npm run serve

lint:
	npm run lint

clean:
	rm -rf .sass-cache
	rm -rf node_modules
	rm src/css/*.css
	rm src/css/*.css.map
