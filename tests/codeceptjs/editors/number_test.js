/* global Feature Scenario Event */

const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('number')

Scenario('should have correct initial value @number', async ({ I }) => {
  I.amOnPage('number.html')
  I.click('.get-value')
  I.waitForValue('.value', '{"number":5.75,"number_number":5.75,"number_range":5.75,"stepper_number_default":5,"stepper_integer_default":5}')
})

Scenario('should validate value @number', async ({ I }) => {
  I.amOnPage('number.html')
  await I.fillField('[name="root[number]"]', '12-12')
  I.click('.get-value')
  I.waitForText('Value must be of type number.', DEFAULT_WAIT_TIME, '[data-schemapath="root.number"] .invalid-feedback')
  I.waitForValue('.value', '{"number":"12-12","number_number":5.75,"number_range":5.75,"stepper_number_default":5,"stepper_integer_default":5}')
})

Scenario('should respect step by incrementing and decrementing the value of a  @number', async ({ I }) => {
  I.amOnPage('number.html')
  I.seeElement('[data-schemapath="root.number_number"] input')
  I.executeScript(function () {
    var range = document.querySelector('[data-schemapath="root.number_number"] input')
    range.stepUp()
    var event = new Event('change', {
      bubbles: true,
      cancelable: true
    })
    range.dispatchEvent(event)
  })
  I.click('.get-value')
  I.waitForValue('.value', '{"number":5.75,"number_number":6,"number_range":5.75,"stepper_number_default":5,"stepper_integer_default":5}')
  I.executeScript(function () {
    var range = document.querySelector('[data-schemapath="root.number_number"] input')
    range.stepDown()
    var event = new Event('change', {
      bubbles: true,
      cancelable: true
    })
    range.dispatchEvent(event)
  })
  I.click('.get-value')
  I.waitForValue('.value', '{"number":5.75,"number_number":5.75,"number_range":5.75,"stepper_number_default":5,"stepper_integer_default":5}')
})

Scenario('should respect step by incrementing and decrementing the value of a range @number', async ({ I }) => {
  I.amOnPage('number.html')
  I.seeElement('[data-schemapath="root.number_range"] input')
  I.executeScript(function () {
    var range = document.querySelector('[data-schemapath="root.number_range"] input')
    range.stepUp()
    var event = new Event('change', {
      bubbles: true,
      cancelable: true
    })
    range.dispatchEvent(event)
  })
  I.click('.get-value')
  I.waitForValue('.value', '{"number":5.75,"number_number":5.75,"number_range":6,"stepper_number_default":5,"stepper_integer_default":5}')
  I.executeScript(function () {
    var range = document.querySelector('[data-schemapath="root.number_range"] input')
    range.stepDown()
    var event = new Event('change', {
      bubbles: true,
      cancelable: true
    })
    range.dispatchEvent(event)
  })
  I.click('.get-value')
  I.waitForValue('.value', '{"number":5.75,"number_number":5.75,"number_range":5.75,"stepper_number_default":5,"stepper_integer_default":5}')
})

Scenario('should be readonly if specified and not disabled @number @readOnly', async ({ I }) => {
  I.amOnPage('read-only.html')
  I.seeReadOnlyAttribute('[name="root[number]"]')
})

Scenario('should update output when setValue is called @number', async ({ I }) => {
  I.amOnPage('number.html')
  I.click('.set-value')
  I.see('2', '[data-schemapath="root.number_range"] output')
})
