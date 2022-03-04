/* global Feature Scenario */
Feature('autocomplete')

Scenario('autocomplete should work @autocomplete', async (I) => {
  I.amOnPage('autocomplete.html')
  I.fillField('root', 'ir')
  I.waitForText('iran', 5, '.autocomplete-result-list')
  I.waitForText('iraq', 5, '.autocomplete-result-list')
  I.click('iraq', '.autocomplete-result-list')
  I.seeInField('root', 'iraq')
})
