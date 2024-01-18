/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1471 should remain fixed @issue-1471', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1471.html')
  I.waitForElement('.je-ready')
  I.waitForText('Date must be in the format "YYYY-MM-DD"')
  I.waitForText('Time must be in the format "HH:MM"')
  I.waitForText('Datetime must be in the format "YYYY-MM-DD HH:MM"')
  I.fillField('[name="root[date]"]', '2024-01-18')
  I.fillField('[name="root[time]"]', '12:41')
  I.fillField('[name="root[datetime-local]"]', '2024-01-18T12:41')
})
