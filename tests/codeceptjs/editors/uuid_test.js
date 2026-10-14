/* global Feature Scenario */

const assert = require('assert')

Feature('uuid')

Scenario('should have initial value matching uuid @uuid', async ({ I }) => {
  I.amOnPage('uuid.html')
  I.wait(1)
  const value = await I.grabValueFrom('[name="root[uuid]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)), true)
})

Scenario('should have initial value matching uuid in arrays @uuid', async ({ I }) => {
  I.click('Add uuid string array item')
  I.click('Add uuid string array item')
  const value0 = await I.grabValueFrom('[name="root[uuidStringArray][0]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidStringArray][1]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})

Scenario('should have initial value matching uuid in arrays of objects with @uuid', async ({ I }) => {
  I.click('Add uuid object array item')
  I.click('Add uuid object array item')
  const value0 = await I.grabValueFrom('[name="root[uuidObjectArray][0][uuid]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidObjectArray][1][uuid]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})

Scenario('should have initial value matching uuid in arrays (table) of strings with @uuid', async ({ I }) => {
  I.click('Add uuid string table item')
  I.click('Add uuid string table item')
  const value0 = await I.grabValueFrom('[name="root[uuidStringTable][0]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidStringTable][1]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})

Scenario('should have initial value matching uuid in arrays (table) of objects with @uuid', async ({ I }) => {
  I.click('Add uuid object table item')
  I.click('Add uuid object table item')
  const value0 = await I.grabValueFrom('[name="root[uuidObjectTable][0][uuid]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value0)), true)
  const value1 = await I.grabValueFrom('[name="root[uuidObjectTable][1][uuid]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value1)), true)
})

Scenario('array editor: copying a uuid string item should assign a different uuid to the copy @uuid', async ({ I }) => {
  I.amOnPage('uuid.html')
  I.click('Add uuid string array item')
  const original = await I.grabValueFrom('[name="root[uuidStringArray][0]"]')
  I.click('//button[contains(@class, "json-editor-btntype-copy") and @data-i="0"]')
  const copy = await I.grabValueFrom('[name="root[uuidStringArray][1]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(copy)), true)
  assert.notStrictEqual(original, copy)
})

Scenario('array editor: copying an object should assign new uuids to its direct uuid fields @uuid', async ({ I }) => {
  I.amOnPage('uuid.html')
  I.click('Add uuid object array item')
  const original = await I.grabValueFrom('[name="root[uuidObjectArray][0][uuid]"]')
  I.click('//button[contains(@class, "json-editor-btntype-copy") and @data-i="0"]')
  const copy = await I.grabValueFrom('[name="root[uuidObjectArray][1][uuid]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(copy)), true)
  assert.notStrictEqual(original, copy)
})

Scenario('array editor: copying an object should assign new uuids to uuid fields nested inside child objects @uuid', async ({ I }) => {
  I.amOnPage('uuid.html')
  I.click('Add uuid nested object array item')
  const original = await I.grabValueFrom('[name="root[uuidNestedObjectArray][0][nested][id]"]')
  I.click('//button[contains(@class, "json-editor-btntype-copy") and @data-i="0"]')
  const copy = await I.grabValueFrom('[name="root[uuidNestedObjectArray][1][nested][id]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(copy)), true)
  assert.notStrictEqual(original, copy)
})

Scenario('table editor: copying a uuid string item should assign a different uuid to the copy @uuid', async ({ I }) => {
  I.amOnPage('uuid.html')
  I.click('Add uuid string table item')
  const original = await I.grabValueFrom('[name="root[uuidStringTable][0]"]')
  I.click('//button[contains(@class, "json-editor-btntype-copy") and @data-i="0"]')
  const copy = await I.grabValueFrom('[name="root[uuidStringTable][1]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(copy)), true)
  assert.notStrictEqual(original, copy)
})

Scenario('table editor: copying an object should assign new uuids to its direct uuid fields @uuid', async ({ I }) => {
  I.amOnPage('uuid.html')
  I.click('Add uuid object table item')
  const original = await I.grabValueFrom('[name="root[uuidObjectTable][0][uuid]"]')
  I.click('//button[contains(@class, "json-editor-btntype-copy") and @data-i="0"]')
  const copy = await I.grabValueFrom('[name="root[uuidObjectTable][1][uuid]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(copy)), true)
  assert.notStrictEqual(original, copy)
})

Scenario('array editor: copying a oneOf item should assign new uuids to its uuid fields @uuid', async ({ I }) => {
  I.amOnPage('uuid.html')
  I.click('Add uuid oneOf item')
  const original = await I.grabValueFrom('[name="root[uuidOneOfArray][0][id]"]')
  I.click('//button[contains(@class, "json-editor-btntype-copy") and @data-i="0"]')
  const copy = await I.grabValueFrom('[name="root[uuidOneOfArray][1][id]"]')
  assert.strictEqual((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(copy)), true)
  assert.notStrictEqual(original, copy)
})
