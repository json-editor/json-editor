/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1485 should remain fixed @issue-1485', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1485.html')
  I.waitForElement('.je-ready')
  I.fillField('[name="root[first_name]"]', 'John')
  I.pressKey('Tab')
  I.fillField('[name="root[last_name]"]', 'Doe')
  I.pressKey('Tab')
  I.waitForValue('[name="root[full_name]"]', 'John Doe')
})
