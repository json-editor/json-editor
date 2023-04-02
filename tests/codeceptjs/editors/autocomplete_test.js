/* global Feature Scenario */

var assert = require('assert')

Feature('autocomplete')

Scenario('autocomplete should work @autocomplete', async ({ I }) => {
  I.amOnPage('autocomplete.html')
  I.waitForElement('.je-ready', 10)
  I.fillField('root', 'ir')
  I.waitForText('iran', 20, '.autocomplete-result-list')
  I.waitForText('iraq', 20, '.autocomplete-result-list')
  I.click('iraq', '.autocomplete-result:nth-child(2)')
  I.wait(1)
  I.waitForValue('.value', '"iraq"')
})
