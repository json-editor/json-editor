/* global Feature Scenario */

const assert = require('assert')

Feature('GitHub issue 1257')

Scenario('GitHub issue 1257 should remain fixed @issue-1257', async (I) => {
  I.amOnPage('issues/issue-gh-1257.html')
  I.waitForElement('.je-ready')
  I.click('[data-schemapath="root.colors"] .json-editor-btntype-add')
  assert.equal(await I.grabValueFrom('#value'), '{"colors":[{"text":"X","color":"#fefaac"}],"color":"#fefaac"}')
  assert.equal(await I.grabValueFrom('[name="root[colors][0][color]"]'), '#fefaac')
})
