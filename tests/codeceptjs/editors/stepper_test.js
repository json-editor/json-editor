/* global Feature Scenario */

var assert = require('assert')

Feature('stepper')

Scenario('should validate value @stepper', async (I) => {
  I.amOnPage('stepper.html')
  I.click('.get-value')
  I.see('Property must be set.', '[data-schemapath="root.stepper"] div')
  assert.equal(await I.grabValueFrom('.value'), '{}')
})

Scenario('should be constrained to maximun and minimun values when stepped @stepper', async (I) => {
  I.amOnPage('stepper.html')
  I.click('.stepper-up')
  I.click('.stepper-up')
  I.click('.stepper-up')
  I.click('.get-value')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"stepper":6}')
  I.click('.stepper-down')
  I.click('.stepper-down')
  I.click('.stepper-down')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"stepper":5}')
})

Scenario('should be correct initialized when manually set @stepper', async (I) => {
  I.amOnPage('stepper-manual.html')
  I.fillField('[name="root[stepper]"]', 10)
  I.click('.stepper-up')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"stepper":11}')
  I.click('.stepper-down')
  I.click('.stepper-down')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"stepper":9}')
})
