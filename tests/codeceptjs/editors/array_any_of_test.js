var assert = require('assert');

Feature('anyof in array');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('array-anyof.html');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '{"correct":"","items":[]}');
});

Scenario('should show errors @optional', async (I) => {
  I.amOnPage('array-anyof.html');
  I.seeElement('[data-schemapath="root"]');
  I.seeElement('[data-schemapath="root.items"]');

  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '{"correct":"","items":[]}');

  I.fillField('root[correct]', 'a');
  assert.equal(await I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.'), true, 'should show warning');

  I.fillField('root[correct]', 'a!');
  assert.equal(await I.seeInField('root[correct]', 'a!'), true, 'fillField failed');
  assert.equal(await I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.'), true, 'should show warning');

  I.clearField('root[correct]');
  I.seeInField('root[correct]', '');
  assert.equal(await I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.'), true, "should show warning");

  I.fillField('root[correct]', 'a');
  I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.');

  I.click('.json-editor-btntype-add');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '{"correct":"a","items":[{"handler":"aaa","id":"","___a":""}]}');

  I.fillField('root[items][0][id]', 'a');
  I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.');

  I.clearField('root[items][0][id]');
  I.seeInField('root[items][0][id]', '');
  // todo still not work
  assert.equal(await I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.'), true, 'should show warning');

  I.fillField('root[items][0][id]', 'a!');
  I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.');

});
