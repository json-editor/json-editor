/* global Feature Scenario */

var assert = require('assert')

Feature('range')

Scenario('should have and display initial value @range', async (I) => {
  I.amOnPage('range.html')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"speed":1}')
  I.waitForText('1', 5, 'output')
})
