var assert = require('assert');

Feature('schemaloader');

Scenario('resolving nested external URNs', async (I) => {
  I.amOnPage('urn.html');
  I.waitForElement('[data-schemapath="root"] h3', 10);
  I.seeElementInDOM('[data-schemapath="root.fname"]')
  I.seeElementInDOM('[data-schemapath="root.lname"]')

  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"fname":"John","lname":"Doe"}');
});
