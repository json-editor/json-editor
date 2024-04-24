/* global Feature Scenario */

const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('checkbox')

Scenario('should be disabled if "readonly" is specified @readOnly', async ({ I }) => {
  I.amOnPage('read-only.html')
  I.waitForText('READY', DEFAULT_WAIT_TIME, '.state')
  I.seeDisabledAttribute('[name="root[checkbox]"]')
})

Scenario('label should be visible for items at top level, but not in tables', async ({ I }) => {
  I.amOnPage('checkbox-labels.html')
  I.waitForText('READY', DEFAULT_WAIT_TIME, '.state')
  I.seeElement('//label[contains(@for, "root[Awesome Compact]")]')
  I.seeElement('//label[contains(@for, "root[Awesome Not Compact]")]')
  I.dontSeeElement('//label[contains(@for, "root[pets][0][Awesome in Object Table]")]')
  I.dontSeeElement('//label[contains(@for, "root[pets][1][Awesome in Object Table]")]')
  I.dontSeeElement('//label[contains(@for, "root[pets][2][Awesome in Object Table]")]')
  I.dontSeeElement('//label[contains(@for, "root[pets][3][Awesome in Object Table]")]')
  I.dontSeeElement('//label[contains(@for, "root[pets][4][Awesome in Object Table]")]')
})
