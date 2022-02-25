/* global Feature Scenario */
Feature('autocomplete')

Scenario('autocomplete should work @autocomplete', async (I) => {
  I.amOnPage('autocomplete.html')
  I.fillField('root[autocomplete]', 'something')
  I.wait(10)
})
