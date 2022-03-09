var assert = require('assert');

Feature('button');

Scenario('should work with button editor callbacks', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.waitForElement('.je-ready', 10)
  I.seeElement('[data-schemapath="root.button1"] button');
  I.click('[data-schemapath="root.button1"] button');
  assert.equal(await I.grabValueFrom('.value'), 'button1CB');
});

Scenario('should work with option "validated"', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.waitForElement('.je-ready', 10)
  I.seeElement('[data-schemapath="root.button1"] button');
  I.retry({ retries: 3, minTimeout: 500 }).seeDisabledAttribute('[data-schemapath="root.button2"] button');
  await I.fillField('[name="root[textinput]"]', 'Hello World');
  I.pressKey('Tab');
  I.dontSeeDisabledAttribute('[data-schemapath="root.button2"] button');
  I.click('[data-schemapath="root.button2"] button');
  assert.equal(await I.grabValueFrom('.value'), 'button2CB');
});

Scenario('should not leave any footprints in result', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.waitForElement('.je-ready', 10)
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), JSON.stringify({"textinput":""}));
});

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  I.waitForElement('.je-ready', 10)
  I.seeDisabledAttribute('[data-schemapath="root.button"] button');
});

Scenario('should set icon @button @button-icon', async (I) => {
  I.amOnPage('button-icons.html')
  I.waitForElement('.je-ready', 10)
  I.waitForElement('i.fas.fa-search', 10)
});
