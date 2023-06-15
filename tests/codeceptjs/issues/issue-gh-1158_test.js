/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1158 should remain fixed @issue-1158 @optional', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1158.html')
  I.seeElement('[name="root[name]"]')
})
