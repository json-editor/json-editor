/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1491 should remain fixed @issue-1491', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1491.html')
  I.waitForElement('.je-ready')
  I.dontSee('Value required')
})
