var assert = require('assert')

Feature('option no_default_values')

Scenario('should have correct initial value', async (I) => {
  I.amOnPage('option-no_default_values.html')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify({
    integer: undefined,
    number: undefined,
    string: undefined
  }))
})

Scenario('should have correct values on empty dirty field', async (I) => {
  I.amOnPage('option-no_default_values.html')
  I.click('.get-value')

  await I.fillField('[name="root[integer]"]', '3')
  await I.fillField('[name="root[number]"]', '3')
  await I.fillField('[name="root[string]"]', 'foo')
  I.click('.force-change')
  I.click('.get-value')

  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify({
    number: 3.0,
    string: 'foo',
    integer: 3
  }))

  await I.clearField('[name="root[integer]"]')
  await I.clearField('[name="root[number]"]')
  await I.clearField('[name="root[string]"]')
  I.click('.force-change')
  I.click('.get-value')

  assert.equal(await I.grabValueFrom('.debug'), JSON.stringify({
    number: undefined,
    string: '',
    integer: undefined
  }))
})
