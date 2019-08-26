var assert = require('assert');

Feature('button');

Scenario('should work with button editor callbacks @optional', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.seeElement('[data-schemapath="root.button1"] button');
  I.click('[data-schemapath="root.button1"] button');
  assert.equal(await I.grabValueFrom('.value'), 'button1CB');
});

Scenario('should work with button editor with option validated = true @optional', async (I) => {
  I.amOnPage('button-callbacks.html');
  I.seeElement('[data-schemapath="root.button2"] button');
  assert.equal(await I.grabAttributeFrom('[data-schemapath="root.button2"] button', 'disabled'), 'true');

  I.seeElement('[data-schemapath="root.textinput"] input');
  I.fillField('[name="root[textinput]"]', 'Hello World');
  assert.equal(await I.grabAttributeFrom('[data-schemapath="root.button2"] button', 'disabled'), 'false');
  I.seeElement('[data-schemapath="root.button2"] button');
  I.click('[data-schemapath="root.button2"] button');
  assert.equal(await I.grabValueFrom('.value'), 'button2CB');
});

