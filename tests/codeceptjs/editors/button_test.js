var assert = require('assert');

Feature('button');

Scenario('should work with button editor callbacks', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.seeElement('[data-schemapath="root.button1"] button');
  I.click('[data-schemapath="root.button1"] button');
  assert.equal(await I.grabValueFrom('.value'), 'button1CB');
});

Scenario('should work with option "validated"', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.seeElement('[data-schemapath="root.button1"] button');
  I.seeDisabledAttribute('[data-schemapath="root.button2"] button');

  await I.fillField('[name="root[textinput]"]', 'Hello World');

  I.pressKey('Tab');
  I.dontSeeDisabledAttribute('[data-schemapath="root.button2"] button');
  I.click('[data-schemapath="root.button2"] button');
  assert.equal(await I.grabValueFrom('.value'), 'button2CB');
});

Scenario('should not leave any footprints in result', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), JSON.stringify({"textinput":""}));
});

