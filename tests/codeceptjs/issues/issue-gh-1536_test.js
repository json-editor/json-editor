/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1536 should remain fixed @issue-1536', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1536.html')
  I.waitForElement('.je-ready')
  I.checkOption('[name="root[dependency_chain_head]')
  I.waitForText('dependent_field_one')
  I.checkOption('[name="root[dependent_field_one]')
  I.waitForText('dependent_field_two')
})
