/* global Feature Scenario Event */

Feature('multiple')

Scenario('should hide switcher input @switcher-option', async ({ I }) => {
  I.amOnPage('switcher-option.html')
  I.waitForElement('.je-ready')
  I.dontSeeElement('.je-switcher')

  I.fillField('[name="root[name]"]', 'a')
  I.pressKey('Tab')
  I.waitForText('If provided, value must be at least 4 and at most 10')

  I.focus('[name="root[name]"]')
  I.pressKey('Backspace') // This never gets actioned
  I.pressKey('Tab') // This never gets actioned
  I.textNotVisible('If provided, value must be at least 4 and at most 10')

  I.fillField('[name="root[name]"]', 'abcdefghijklmnopq')
  I.pressKey('Tab')
  I.waitForText('If provided, value must be at least 4 and at most 10')

  I.fillField('[name="root[name]"]', 'test')
  I.pressKey('Tab')
  I.textNotVisible('If provided, value must be at least 4 and at most 10')
})
