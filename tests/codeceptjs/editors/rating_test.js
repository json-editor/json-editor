var assert = require('assert');
var value = '';

Feature('rating');

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  value = await I.grabAttributeFrom('[id="root[rating]5"]', 'disabled');
  assert.equal(value, 'true');
  value = await I.grabAttributeFrom('[id="root[rating]4"]', 'disabled');
  assert.equal(value, 'true');
  value = await I.grabAttributeFrom('[id="root[rating]3"]', 'disabled');
  assert.equal(value, 'true');
  value = await I.grabAttributeFrom('[id="root[rating]2"]', 'disabled');
  assert.equal(value, 'true');
  value = await I.grabAttributeFrom('[id="root[rating]1"]', 'disabled');
  assert.equal(value, 'true');
});
