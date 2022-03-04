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
  I.click('Add uuid string array item')
  I.click('Add uuid string array item')
  const value0 = await I.grabValueFrom('[name="root[uuidStringArray][0]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidStringArray][1]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})

Scenario('should have initial value matching uuid in arrays of objects with @uuid', async (I) => {
  I.click('Add uuid object array item')
  I.click('Add uuid object array item')
  const value0 = await I.grabValueFrom('[name="root[uuidObjectArray][0][uuid]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidObjectArray][1][uuid]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})

Scenario('should have initial value matching uuid in arrays (table) of strings with @uuid', async (I) => {
  I.click('Add uuid string table item')
  I.click('Add uuid string table item')
  const value0 = await I.grabValueFrom('[name="root[uuidStringTable][0]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidStringTable][1]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})

Scenario('should have initial value matching uuid in arrays (table) of objects with @uuid', async (I) => {
  I.click('Add uuid object table item')
  I.click('Add uuid object table item')
  const value0 = await I.grabValueFrom('[name="root[uuidObjectTable][0][uuid]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidObjectTable][1][uuid]"]')
  assert.equal((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})