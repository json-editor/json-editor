.PHONY=up clean bash test browser

DOCKER_HOST?=localhost

up:
	docker-compose up -d

clean:
	docker-compose down --remove-orphans

bash:
	docker-compose exec node bash

test:
	docker-compose run --rm -w /repo/tests/codeceptjs node /repo/node_modules/.bin/codeceptjs run

selenium-firefox:
	xdg-open vnc://$(DOCKER_HOST):9059

selenium-chrome:
	xdg-open vnc://$(DOCKER_HOST):9060

browser:
	xdg-open http://$(DOCKER_HOST):9100

open: browser
