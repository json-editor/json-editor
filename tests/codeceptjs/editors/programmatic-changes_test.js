/* global Feature Scenario */

const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('Programmatic changes')

Scenario('should have correct initial value', async ({ I }) => {
  I.amOnPage('programmatic-changes.html')
  I.waitForText('READY', DEFAULT_WAIT_TIME, '.state')
  I.click('.get-value')
  I.waitForValue('.value', '{"boolean":false,"boolean_checkbox":false,"string":"","integer":0,"number":0,"array":[],"array_checkbox":[],"array_select":[]}')
})

Scenario('should have correct values after setting them programmatically', async ({ I }) => {
  I.amOnPage('programmatic-changes.html')
  I.waitForText('READY', DEFAULT_WAIT_TIME, '.state')
  I.click('.set-values')
  I.click('.get-value')
  I.waitForValue('.value', '{"boolean":true,"boolean_checkbox":true,"string":"hello","integer":5,"number":5.5,"array":[1,2,3],"array_checkbox":["value1","value2"],"array_select":[1,2,3]}')
})
