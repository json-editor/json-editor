/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1559 should remain fixed @issue-1559', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1559.html')
  I.waitForElement('.je-ready')
  I.dontSeeElement('[data-schemapath="root.dependent_on_false"]')
  I.click('[data-schemapath="root.dependent_on_true"] input')
  I.waitForElement('[data-schemapath="root.dependent_on_false"]', 2)
  I.seeElement('[data-schemapath="root.dependent_on_false"]')
  I.click('[data-schemapath="root.dependent_on_true"] input')
  I.waitForInvisible('[data-schemapath="root.dependent_on_false"]', 2)
  I.dontSeeElement('[data-schemapath="root.dependent_on_false"]')
})
