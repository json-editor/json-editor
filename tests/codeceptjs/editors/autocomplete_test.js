/* global Feature Scenario */

var assert = require('assert')

Feature('autocomplete')

Scenario('autocomplete should work @autocomplete', async (I) => {
  I.amOnPage('autocomplete.html')
  I.waitForElement('.je-ready', 5)
  I.fillField('root', 'ir')
  I.saveScreenshot('autocomplete-1.png')
  I.waitForText('iran', 5, '.autocomplete-result-list')
  I.saveScreenshot('autocomplete-2.png')
  I.waitForText('iraq', 5, '.autocomplete-result-list')
  I.saveScreenshot('autocomplete-3.png')
  I.click('iraq', '.autocomplete-result:nth-child(2)')
  I.saveScreenshot('autocomplete-4.png')
  I.wait(1)
  I.saveScreenshot('autocomplete-5.png')
  assert.equal(await I.grabValueFrom('.value'), '"iraq"')
})
