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
  I.seeElement('.jodit-wysiwyg_mode');

  I.click('.jodit-toolbar-button_bold button');
  I.pressKeys('__JODIT__');
  I.see('__JODIT__');

  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify([{"editor":"<p><strong>__JODIT__</strong><br></p>"}]));

});
