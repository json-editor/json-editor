# Testing

## With Docker

Configure Docker environment:

```
cp .env-dist .env
```

Install `node_modules` and start stack:
```
docker-compose run --rm node npm install
docker-compose up -d
```

- Webserver URL: http://127.0.0.1:9100/
- Selenium Firefox Browser URL: vnc://127.0.0.1:9059/
- Selenium Chrome Browser URL: vnc://127.0.0.1:9060/

```
docker-compose exec node bash

$ npm run build
$ cd tests/codeceptjs
$ codeceptjs run
```

Tests whose `Scenario` string contains the tag `@optional` will be ignored by the automated build process.


### Development

To watch changes, eg. while development or fixing code you can run

```
docker-compose run --rm node bash

$ npm start
```

which effectively runs the Webpack development server in your project


### References

- CodeceptJS - https://codecept.io
- Webdriver configuration - http://webdriver.io/guide/getstarted/configuration.html
