/* global Feature Scenario */

Feature('Tabs')

Scenario('test top-tabs', (I) => {
  I.amOnPage('tabs.html')
  I.waitForElement('[data-schemapath="root"] .json-editor-btn-add')
  I.click('[data-schemapath="root"] .json-editor-btn-add')
  I.waitForText('1 -', 5)
  I.waitForText('validation failed', 5)
  I.fillField('root[1][name]', 'Somebody')
  I.pressKey('Tab')
  I.waitForText('validation passed', 5)
})
