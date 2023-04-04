/* global Feature Scenario */

Feature('GitHub issue 1133')

Scenario('GitHub issue 1133 should remain fixed @issue-1133', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1133.html')
  I.waitForElement('.je-ready')
  I.waitForValue('#value', '{"SaveDataMask":"DP"}')
})
