var assert = require('assert');
const { DEFAULT_WAIT_TIME } = require('./test-config')

Feature('schemaloader');

Scenario('resolving nested external URNs', async (I) => {
  I.amOnPage('urn.html');
  I.waitForElement('[data-schemapath="root"] h3', DEFAULT_WAIT_TIME);
  I.seeElementInDOM('[data-schemapath="root.fname"]')
  I.seeElementInDOM('[data-schemapath="root.lname"]')

  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"fname":"John","lname":"Doe"}');
});
