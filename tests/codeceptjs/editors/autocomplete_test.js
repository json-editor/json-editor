/* global Feature Scenario */

Feature('autocomplete')

Scenario('autocomplete should work @autocomplete', async ({ I }) => {
  I.amOnPage('autocomplete.html')
  I.waitForElement('.je-ready', 10)
  I.click('[name="root"]')
  I.pressKey('i')
  I.pressKey('r')
  I.waitForText('iran', 20, '.autocomplete-result-list')
  I.waitForText('iraq', 20, '.autocomplete-result-list')
  I.click('iraq', '.autocomplete-result:nth-child(2)')
  I.wait(1)
  I.waitForValue('.value', '"iraq"')
})
