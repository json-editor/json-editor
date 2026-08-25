/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1700 should remain fixed @issue-1700', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1700.html')
  I.waitForElement('.je-ready')
  I.waitForText('Properties', '.json-editor-btntype-properties')
})