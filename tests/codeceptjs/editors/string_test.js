/* global Feature Scenario */

var assert = require('assert')

Feature('string')

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('string-ace-editor.html')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '[]')
})

Scenario('should have coerent values', async (I) => {
  I.amOnPage('string-ace-editor.html')
  I.click('Add item')
  I.see('item 1')
  I.seeElement('.ace_editor')
  I.click('.ace_editor')
  I.pressKeys('__YELLOW__')
  I.click('.ace_editor')
  I.see('__YELLOW__')

  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify([{ editor: '__YELLOW__' }]))
})

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('string-sceditor.html')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), '[]')
})

Scenario('editor value and String editor should have coerent values @optional', async (I) => {
  I.amOnPage('string-sceditor.html')
  I.click('Add item')
  I.see('item 1')

  // enters first iframe, writes text on the body and then exits
  I.switchTo(0)
  I.click('body')
  I.pressKeys('__YELLOW__')
  I.see('__YELLOW__')
  I.switchTo()

  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify([{ editor: '<p>__YELLOW__</p>' }]))
})

Scenario('Should work correctly in arrays @optional', async (I) => {
  I.amOnPage('string-sceditor.html')
  I.click('Add item')
  I.click('Add item')
  I.see('item 1')
  I.see('item 2')

  // enters first iframe, writes text on the body and then exits
  I.switchTo(0)
  I.click('body')
  I.pressKeys('__YELLOW__')
  I.see('__YELLOW__')
  I.switchTo()

  // enters first iframe and read text
  I.switchTo(0)
  I.see('__YELLOW__')
  I.switchTo()

  // enters second iframe, writes text on the body and then exits
  I.switchTo(1)
  I.click('body')
  I.pressKeys('__BLUE__')

  I.see('__BLUE__')
  I.switchTo()

  // enters second iframe and read text
  I.switchTo(1)
  I.see('__BLUE__')
  I.switchTo()

  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify([{ editor: '<p>__YELLOW__<br></p>' }, { editor: '<p>__BLUE__<br></p>' }]))

  I.click('.json-editor-btn-movedown')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify([{ editor: '<p>__BLUE__<br></p>' }, { editor: '<p>__YELLOW__<br></p>' }]))

  // the last 2 tests will fail because Sceditors iframes loose their content when the iframe is reloaded.

  // enters first iframe and read text
  I.switchTo(0)
  I.see('__BLUE__')
  I.switchTo()

  // enters second iframe and read text
  I.switchTo(1)
  I.see('__YELLOW__')
  I.switchTo()
})

Scenario('should be readonly if specified and not disabled', async (I) => {
  I.amOnPage('read-only.html')
  I.seeReadOnlyAttribute('[name="root[string]"]')
})

Scenario('should have a custom attribute with custom value', async (I) => {
  I.amOnPage('string-custom-attributes.html')
  I.seeElement('[name="root[custom_attributes]"]')
  assert.equal(await I.grabAttributeFrom('[name="root[custom_attributes]"]', 'custom-attribute'), 'custom-value')
})

Scenario('should work with cleave.js library', async (I) => {
  I.amOnPage('string-cleave.html')
  I.seeElement('[name="root[cleave_test]"]')
  await I.fillField('[name="root[cleave_test]"]', '12345678901234567890')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify({ cleave_test: '1234.567.890-1234' }))
})
