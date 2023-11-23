/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1431 should remain fixed @issue-1431', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1431.html')
  I.waitForElement('.je-ready')
  I.waitForElement('.CodeMirror')
  I.click('.CodeMirror')
  I.pressKeys('simple-mde')
  I.waitForValue('#value', '{"name":"simple-mde"}')
})
