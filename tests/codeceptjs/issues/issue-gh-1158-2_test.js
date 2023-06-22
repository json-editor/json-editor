/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1165 should remain fixed @issue-1165 @schemaloader', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1165.html')
  I.waitForText('Add item')
  I.click('Add item')
  I.waitForText('external-schema')
})
