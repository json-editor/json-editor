/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1463 should remain fixed @issue-1463', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1463.html')
  I.waitForElement('.je-ready')
  I.dontSee('Value must be the constant value')
})
