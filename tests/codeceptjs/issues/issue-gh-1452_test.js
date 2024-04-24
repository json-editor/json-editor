/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1452 should remain fixed @issue-1452', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1452.html')
  I.click('#set-value')
  I.selectOption('[id="root[category]"]', 'Vegetables')
  I.waitForElement('[id="root[subcategory2]"]')
})
