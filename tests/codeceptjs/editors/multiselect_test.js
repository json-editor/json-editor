var assert = require('assert');
var value = '';

Feature('multiselect');

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  I.seeElement('[name="root[multiselect]"]');
  value = await I.grabAttributeFrom('[name="root[multiselect]"]', 'disabled');
  assert.equal(value, 'true');
});
