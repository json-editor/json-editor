/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1471 should remain fixed @issue-1471', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1471.html')
  I.waitForElement('.je-ready')
  I.dontSee('Date must be in the format "YYYY-MM-DD"')
  I.dontSee('Time must be in the format "HH:MM"')
  I.dontSee('Datetime must be in the format "YYYY-MM-DD HH:MM"')
  I.fillField('[name="root[date]"]', '')
  I.fillField('[name="root[time]"]', '')
  I.fillField('[name="root[datetime-local]"]', '')
  I.waitForText('Date must be in the format "YYYY-MM-DD"')
  I.waitForText('Time must be in the format "HH:MM"')
  I.waitForText('Datetime must be in the format "YYYY-MM-DD HH:MM"')
})
