/* global Feature Scenario */

var assert = require('assert')

Feature('Programmatic changes')

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('programmatic-changes.html')
  I.waitForText('READY', 5, '.state')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"boolean":false,"boolean_checkbox":false,"string":"","integer":0,"number":0,"array":[],"array_checkbox":[],"array_select":[]}')
})

Scenario('should have correct values after setting them programmatically', async (I) => {
  I.amOnPage('programmatic-changes.html')
  I.waitForText('READY', 5, '.state')
  I.click('.set-values')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"boolean":true,"boolean_checkbox":true,"string":"hello","integer":5,"number":5.5,"array":[1,2,3],"array_checkbox":["value1","value2"],"array_select":[1,2,3]}')
})
