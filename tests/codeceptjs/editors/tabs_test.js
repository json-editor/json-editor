/* global Feature Scenario */

const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('Tabs')

Scenario('test @top-tabs', ({ I }) => {
  I.amOnPage('tabs.html')
  I.waitForElement('[data-schemapath="root"] .json-editor-btn-add')
  I.click('[data-schemapath="root"] .json-editor-btn-add')
  I.waitForText('1 -', DEFAULT_WAIT_TIME)
  I.waitForText('validation failed', DEFAULT_WAIT_TIME)
  I.fillField('root[1][name]', 'Somebody')
  I.pressKey('Tab')
  I.waitForText('validation passed', DEFAULT_WAIT_TIME)
})
