/* global Feature Scenario */

Feature('GitHub issue 1257')

Scenario('GitHub issue 1257 should remain fixed @issue-1257', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1257.html')
  I.waitForElement('.je-ready')
  I.click('[data-schemapath="root.colors"] .json-editor-btntype-add')
  I.waitForValue('#value', '{"colors":[{"text":"X","color":"#fefaac"}],"color":"#fefaac"}')
  I.waitForValue('[name="root[colors][0][color]"]', '#fefaac')
})
