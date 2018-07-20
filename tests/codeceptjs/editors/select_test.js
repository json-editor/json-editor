var assert = require('assert');
var value = '';

Feature('select');

Scenario('should return correct booleans values when selected', async (I) => {
  I.amOnPage('select.html');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"boolean":true}');
  I.selectOption('[name="root[boolean]"]', 'false');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"boolean":false}');
  I.selectOption('[name="root[boolean]"]', 'true');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"boolean":true}');
});

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html');
  I.seeElement('[name="root[select]"]');
  value = await I.grabAttributeFrom('[name="root[select]"]', 'disabled');
  assert.equal(value, 'true');
});

