# Testing

## With Docker

Go to the `tests/` directory and install node modules, start test application with node (webserver), Firefox (browser) and CodeceptJS (testing).

```
cd tests
docker-compose run --rm node npm install
docker-compose up -d
```

- Webserver URL: http://127.0.0.1:9001/
- Selenium Firefox Browser URL: vnc://127.0.0.1:9059/
- Selenium Chrome Browser URL: vnc://127.0.0.1:9060/

```
docker-compose run --rm codeceptjs bash

$ npm run build
$ codeceptjs run
```

Tests whose `Scenario` string contains the tag `@optional` will be ignored by the automated build process.


### Development

To watch changes, eg. while development or fixing code you can run

```
docker-compose run --rm node bash

$ npm start
```

which effectively runs `grunt watch` in your project.


### References

- CodeceptJS - https://codecept.io
- Webdriver configuration - http://webdriver.io/guide/getstarted/configuration.html
