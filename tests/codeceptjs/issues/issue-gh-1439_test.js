/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1439 should remain fixed @issue-1439', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1439.html')
  I.waitForElement('.je-ready')
  I.waitForElement('[name="root[wrong]"]')
  I.waitForElement('[data-schemapath="root.correct"] button')
  I.waitForText('Button text')
  I.waitForValue('#value', '{"wrong":""}')
})
