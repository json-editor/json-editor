/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 795 should remain fixed @issue-795 @schemaloader', async ({ I }) => {
  I.amOnPage('issues/issue-gh-795.html')
  I.waitForText('Add item')
  I.click('Add item')
  I.waitForText('box')
  I.fillField('#value', JSON.stringify([[{}], {}]))
  I.click('Set Value')
  I.waitForValue('#value', '[[{}],{}]')
})
