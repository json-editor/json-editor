/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1158 should remain fixed @issue-1158-2 @schemaloader', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1158-2.html')
  I.waitForElement('[title="Add ARRENDATARIO"]')
  I.click('[title="Add ARRENDATARIO"]')
  I.waitForText('ARRENDATARIO 1')
  I.waitForText('Representantes')
})
