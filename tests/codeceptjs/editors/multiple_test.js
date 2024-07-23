/* global Feature Scenario Event */

const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('multiple')

Scenario('should hide switcher input @switcher-option', async ({ I }) => {
  I.amOnPage('switcher-option.html')
  I.waitForElement('.je-ready')
  I.dontSeeElement('.je-switcher')

  I.fillField('[name="root[name]"]', 'a')
  I.pressKey('Tab')
  I.waitForText('If provided, value must be at least 4 and at most 10')

  I.fillField('[name="root[name]"]', '')
  I.pressKey('Tab')
  I.dontSee('If provided, value must be at least 4 and at most 10')

  I.fillField('[name="root[name]"]', 'abcdefghijklmnopq')
  I.pressKey('Tab')
  I.waitForText('If provided, value must be at least 4 and at most 10')

  I.fillField('[name="root[name]"]', 'test')
  I.pressKey('Tab')
  I.dontSee('If provided, value must be at least 4 and at most 10')
})