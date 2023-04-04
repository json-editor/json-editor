/* global Feature Scenario */

Feature('range')

Scenario('should have and display initial value @range', async ({ I }) => {
  I.amOnPage('range.html')
  I.click('.get-value')
  I.waitForValue('.value', '{"speed":1}')
  I.waitForText('1', 5, 'output')
})
