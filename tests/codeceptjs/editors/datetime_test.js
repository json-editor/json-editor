/* global Feature Scenario */

const assert = require('assert')

const today = (offset) => {
  const t = new Date()
  t.setDate(t.getDate() + (offset || 0))
  return t.toISOString().split('T')[0]
}

Feature('datetime')

Scenario('should have correct initial value @datetime', async (I) => {
  I.amOnPage('datetime.html')
  I.wait(1)
  I.click('#get-value')
  assert.equal(await I.grabValueFrom('#value'), '{"time":"12:00","date":"' + today() + '","datetimelocal":"' + today() + 'T00:00' + '"}')
})

Scenario('time should have max and min attributes @datetime', async (I) => {
  assert.equal(await I.grabAttributeFrom('[name="root[time]"]', 'min'), '11:00')
  assert.equal(await I.grabAttributeFrom('[name="root[time]"]', 'max'), '13:00')
})

Scenario('date should have max and min attributes @datetime', async (I) => {
  assert.equal(await I.grabAttributeFrom('[name="root[date]"]', 'min'), '1970-01-01')
  assert.equal(await I.grabAttributeFrom('[name="root[date]"]', 'max'), '2100-01-01')
})

Scenario('datetimelocal should have max and min attributes @datetime', async (I) => {
  assert.equal(await I.grabAttributeFrom('[name="root[datetimelocal]"]', 'min'), '1970-01-01T00:00')
  assert.equal(await I.grabAttributeFrom('[name="root[datetimelocal]"]', 'max'), '2100-01-01T00:00')
})
