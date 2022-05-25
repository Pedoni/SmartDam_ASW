default: install run

.PHONY: run

install:
	npm install

run:
	sass src/css/login.scss src/css/login.css
	sass src/css/home.scss src/css/home.css
	sass src/css/panoramic.scss src/css/panoramic.css
	npm run serve

clean:
	rm -rf .sass-cache
	rm -rf node_modules
	rm src/css/*.css
	rm src/css/*.css.map
