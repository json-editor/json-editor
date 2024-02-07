/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1171 should remain fixed @issue-1171', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1171.html')
  I.waitForElement('.je-ready')
  I.dontSeeCheckedAttribute('[id="root[1]"]')
  I.checkOption('[id="root[1]"]')
  I.dontSeeCheckedAttribute('[id="root[0]"]')
})
