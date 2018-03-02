var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

test.describe('Check json-editor functionality', function() {
    this.timeout(10000);
    test.it('validation works', function() {
        var driver = new webdriver.Builder().
        forBrowser('firefox').
        usingServer('http://firefox:4444/wd/hub').
        build();
        driver.get('http://node:9001/tests/selenium/tests.html');

        var indicator = driver.findElement(webdriver.By.id('valid_indicator'));
        indicator.getAttribute('textContent').then(function(value) {
            assert.equal(value, 'valid');
        });

        var cityInput = driver.findElement(webdriver.By.name('root[0][location][city]'));
        cityInput.clear();
        cityInput.sendKeys('Stuttgart');

        cityInput.getAttribute('value').then(function(value) {
            assert.equal(value, 'Stuttgart');
        });

        var deleteLastButton = driver.findElement(webdriver.By.className('json-editor-btn-delete'));
        deleteLastButton.click();

        driver.quit();
    });
});