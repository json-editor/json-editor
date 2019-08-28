var assert = require('assert');

Feature('jodit');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('string-jodit-editor.html');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), '[]');
});

Scenario('should have coerent values', async (I) => {
  I.amOnPage('string-jodit-editor.html');
  I.click('Add item');
  I.see('item 1');
  I.seeElement('.jodit_wysiwyg');

  I.click('.jodit_toolbar_btn-bold a');
  I.click('.jodit_wysiwyg');
  I.pressKey('j');
  I.pressKey('O');
  I.pressKey('d');
  I.pressKey('I');
  I.pressKey('t');
  I.see('jOdIt');

  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify([{"editor":"<strong>jOdIt</strong>"}]));

});
