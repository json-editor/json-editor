/* global Feature Scenario */

Feature('select')

Scenario('should return correct booleans values when selected', async ({ I }) => {
  I.amOnPage('select.html')
  I.click('.get-value')
  I.waitForValue('.value', '{"boolean":true}')
  I.selectOption('[name="root[boolean]"]', 'false')
  I.click('.get-value')
  I.waitForValue('.value', '{"boolean":false}')
  I.selectOption('[name="root[boolean]"]', 'true')
  I.click('.get-value')
  I.waitForValue('.value', '{"boolean":true}')
})

Scenario('should be disabled if "readonly" is specified', async ({ I }) => {
  I.amOnPage('read-only.html')
  I.seeDisabledAttribute('[name="root[select]"]')
})

Scenario('should handle const like enum with 1 item', async ({ I }) => {
  I.amOnPage('select-const.html')
  I.click('.get-value')
  I.waitForValue('.value', '{"constval":"constant"}')
})
