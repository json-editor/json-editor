var assert = require('assert');
var value = '';

Feature('wysiwyg');

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('wysiwyg-sceditor.html');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '[]');
});

Scenario('editor value and String editor should have coerent values', async (I) => {
  I.amOnPage('wysiwyg-sceditor.html');
  I.click('Add item');
  I.see('item 1');

  // enters first iframe, writes text on the body and then exits
  I.switchTo('[data-schemapath="root.0.editor"] iframe');
  I.click('body');
  I.pressKey('__YELLOW__');
  I.see('__YELLOW__');
  I.switchTo();

  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, JSON.stringify([{"editor":"<p>__YELLOW__<br></p>"}]));
});

Scenario('Should have values ordered in the same order as the array ', async (I) => {
  I.amOnPage('wysiwyg-sceditor.html');
  I.click('Add item');
  I.click('Add item');
  I.see('item 1');
  I.see('item 2');

  // enters first iframe, writes text on the body and then exits
  I.switchTo('[data-schemapath="root.0.editor"] iframe');
  I.click('body');
  I.pressKey('__YELLOW__');
  I.see('__YELLOW__');
  I.switchTo();

  // enters secod iframe, writes text on the body and then exits
  I.switchTo('[data-schemapath="root.1.editor"] iframe');
  I.click('body');
  I.pressKey('__BLUE__');
  I.see('__BLUE__');
  I.switchTo();

  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, JSON.stringify([{"editor":"<p>__YELLOW__<br></p>"},{"editor":"<p>__BLUE__<br></p>"}]));

  I.click('.json-editor-btn-movedown');
  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, JSON.stringify([{"editor":"<p>__BLUE__<br></p>"},{"editor":"<p>__YELLOW__<br></p>"}]));

});