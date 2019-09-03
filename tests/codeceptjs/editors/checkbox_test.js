var assert = require('assert');

Feature('checkbox');

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  I.waitForText('READY', 5, '.state')
  //assert.equal(await I.grabAttributeFrom('[name="root[checkbox]"]', 'disabled'), true);
  I.seeElement('[name="root[checkbox]"]:disabled');
});
