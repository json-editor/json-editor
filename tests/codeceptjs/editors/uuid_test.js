/* global Feature Scenario */

const assert = require('assert')

Feature('uuid')

Scenario('should have initial value matching uuid @uuid', async (I) => {
  I.amOnPage('uuid.html')
  I.wait(1)
  const value = await I.grabValueFrom('[name="root[uuid]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)), true)
})

Scenario('should have initial value matching uuid in arrays @uuid', async (I) => {
  I.click('Add item')
  I.click('Add item')
  const value0 = await I.grabValueFrom('[name="root[uuidArray][0][uuid]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidArray][1][uuid]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})
