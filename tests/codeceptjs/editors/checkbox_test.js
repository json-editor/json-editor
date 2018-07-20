var assert = require('assert');
var value = '';

Feature('checkbox');

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  value = await I.grabAttributeFrom('[name="root[checkbox]"]', 'disabled');
  assert.equal(value, 'true');
});
