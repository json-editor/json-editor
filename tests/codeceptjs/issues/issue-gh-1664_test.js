/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1664 should remain fixed @issue-1664', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1664.html')
  I.waitForElement('.je-ready')
  I.see('A very long title', '[data-schemapath="root"] thead tr th:nth-child(1)')
  I.seeElement('[data-schemapath="root"] thead tr th:nth-child(1) > button[title="A helptext"]')
})
