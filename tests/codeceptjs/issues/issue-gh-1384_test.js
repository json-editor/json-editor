/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1384 should remain fixed @issue-1384 @optional', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1384.html')
  I.waitForElement('.je-ready')
  I.waitForText('Zope layout definition')
})
