/* /* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1541 should remain fixed @issue-1541 ', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1541.html')
  I.waitForElement('.je-ready')
})