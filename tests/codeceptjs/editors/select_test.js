/* global Feature Scenario */

var assert = require('assert')

Feature('select')

Scenario('should return correct booleans values when selected', async (I) => {
  I.amOnPage('select.html')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"boolean":true}')
  I.selectOption('[name="root[boolean]"]', 'false')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"boolean":false}')
  I.selectOption('[name="root[boolean]"]', 'true')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"boolean":true}')
})

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html')
  I.seeDisabledAttribute('[name="root[select]"]')
})
