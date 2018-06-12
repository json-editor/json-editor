var assert = require('assert');
var value = '';

Feature('string-ace-editor');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('string-ace-editor.html');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '[]');
});

Scenario('should have coerent values', async (I) => {
  I.amOnPage('string-ace-editor.html');
  I.click('Add item');
  I.see('item 1');
  I.seeElement('.ace_editor');

  I.click('.ace_editor');
  I.pressKey('__YELLOW__');
  I.see('__YELLOW__');

  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, JSON.stringify([{"editor":"__YELLOW__"}]));
});