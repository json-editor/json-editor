/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1422 should remain fixed @issue-1422', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1422.html')
  I.waitForElement('.je-ready')
  I.waitForValue('#value', '{"req":5,"opt":5,"req_with_default":5}')
})
