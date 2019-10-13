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
  I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.');
  value = await I.grabValueFrom('.debug');

  I.fillField('root[correct]', 'a!');
  I.seeInField('root[correct]', 'a!');
  I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.');
  value = await I.grabValueFrom('.debug');

  I.clearField('root[correct]');
  I.seeInField('root[correct]', '');
  I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.');
  value = await I.grabValueFrom('.debug');

  I.fillField('root[correct]', 'a');
  I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.');
  value = await I.grabValueFrom('.debug');

  I.click('.json-editor-btntype-add');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '{"correct":"a","items":[{"handler":"aaa","id":"","___a":""}]}');

  I.fillField('root[items][0][id]', 'a');
  I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.');
  value = await I.grabValueFrom('.debug');

  I.clearField('root[items][0][id]');
  I.click('.get-value');
  I.seeInField('root[items][0][id]', '');
  // todo: why this passed?
  let r = I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.');
  assert.equal(r, true, 'it should appear');
  value = await I.grabValueFrom('.debug');

  I.fillField('root[items][0][id]', 'a!');
  I.click('.get-value');
  I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.');

});
