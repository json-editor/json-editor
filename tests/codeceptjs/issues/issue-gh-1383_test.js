/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1383 should remain fixed @issue-1383 @optional', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1383.html')
  I.waitForElement('.je-ready')
  I.waitForText('activity-timeout')
})
