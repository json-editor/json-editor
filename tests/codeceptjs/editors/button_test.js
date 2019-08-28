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
  I.seeElement('[data-schemapath="root.button2"] button:disabled');

  //I.seeElement('[data-schemapath="root.textinput"] input');
  await I.fillField('[name="root[textinput]"]', 'Hello World');

  // Dummy value needed to trigger onChange event
  //I.seeElement('[data-schemapath="root.textinput2"] input');
  await I.fillField('[name="root[textinput2]"]', 'Hello World');

  I.seeElement('[data-schemapath="root.button2"] button:not(:disabled)');
  I.click('[data-schemapath="root.button2"] button');
  assert.equal(await I.grabValueFrom('.value'), 'button2CB');
});

Scenario('should not leave any footprints in result', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), JSON.stringify({"textinput":"","textinput2":""}));
});

