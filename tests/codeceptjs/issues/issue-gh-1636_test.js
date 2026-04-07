/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1636 should remain fixed @issue-1636', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1636.html')
  I.waitForElement('.je-ready')
  I.waitForElement('.je-ready table.je-table')
})
