# Testing

## With Docker

Go to the `tests/` directory and install node modules, start test application with node (webserver), Firefox (browser) and CodeceptJS (testing).

```
cd tests
docker-compose run --rm node npm install
docker-compose up -d
```

- Webserver URL: http://127.0.0.1:9001/
- Browser URL: vnc://127.0.0.1:9059/

```
docker-compose run --rm codeceptjs bash

$ npm run build
$ codeceptjs run
```


### References

- CodeceptJS - https://codecept.io
- Webdriver configuration - http://webdriver.io/guide/getstarted/configuration.html