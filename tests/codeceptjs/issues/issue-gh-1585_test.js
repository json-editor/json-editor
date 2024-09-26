/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1585 should remain fixed @issue-1585', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1585.html')
  I.waitForElement('.je-ready')
  I.click('.json-editor-btn-moveup')
  I.getSelectedValueAndAssert('[name="root[0][type]"]', '')
})
