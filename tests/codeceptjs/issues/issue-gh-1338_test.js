/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1338 should remain fixed @issue-1338', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1338.html')
  I.waitForText('Value required')
  I.fillField('[id="root[field_a]"]', 'test')
  I.pressKey('Tab')
  I.waitForInvisible('.invalid-feedback')
  I.dontSee('Value required')
  I.refreshPage()
  I.waitForText('Value required')
  I.fillField('[id="root[field_b]"]', 'test')
  I.pressKey('Tab')
  I.waitForInvisible('.invalid-feedback')
  I.dontSee('Value required')
})
