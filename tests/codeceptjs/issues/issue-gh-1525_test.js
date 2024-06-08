/* /* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1525 should remain fixed @issue-1525', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1525.html')
  I.waitForElement('.je-ready')
  I.waitForValue('#value', '{"example":"dd"}')
})