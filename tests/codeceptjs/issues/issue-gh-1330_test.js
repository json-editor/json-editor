/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1330 should remain fixed @issue-1330 @multiselect', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1330.html')
  I.waitForElement('[data-schemapath="root.test"] input[type="checkbox"]')
})
