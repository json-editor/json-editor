/* global Feature Scenario */

const assert = require('assert')
let value

Feature('anyof in array')

Scenario('should have correct initial value', async ({ I }) => {
  I.amOnPage('array-anyof.html')
  I.click('.get-value')
  I.waitForValue('.debug', '{"correct":"","items":[]}')
})

Scenario('should show errors @optional', async ({ I }) => {
  I.amOnPage('array-anyof.html')
  I.seeElement('[data-schemapath="root"]')
  I.seeElement('[data-schemapath="root.items"]')

  I.click('.get-value')
  I.waitForValue('.debug', '{"correct":"","items":[]}')

  I.fillField('root[correct]', 'a')
  assert.strictEqual(await I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.'), true, 'should show warning')

  I.fillField('root[correct]', 'a!')
  assert.strictEqual(await I.seeInField('root[correct]', 'a!'), true, 'fillField failed')
  assert.strictEqual(await I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.'), true, 'should show warning')

  I.clearField('root[correct]')
  I.seeInField('root[correct]', '')
  assert.strictEqual(await I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.'), true, 'should show warning')

  I.fillField('root[correct]', 'a')
  I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.')

  I.click('.json-editor-btntype-add')
  I.click('.get-value')
  I.waitForValue('.debug', '{"correct":"a","items":[{"handler":"aaa","id":"","___a":""}]}')

  I.fillField('root[items][0][id]', 'a')
  I.dontSee('Value must match the pattern ^[a-zA-Z0-9_]+$.')

  I.clearField('root[items][0][id]')
  I.seeInField('root[items][0][id]', '')
  // todo still not work
  assert.strictEqual(await I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.'), true, 'should show warning')

  I.fillField('root[items][0][id]', 'a!')
  I.see('Value must match the pattern ^[a-zA-Z0-9_]+$.')
})
