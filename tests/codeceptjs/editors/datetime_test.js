/* global Feature Scenario Event */

const assert = require('assert')

const today = (offset) => {
  const t = new Date()
  t.setDate(t.getDate() + (offset || 0))
  return t.toISOString().split('T')[0]
}

Feature('datetime')

Scenario('should have correct initial value @datetime', async (I) => {
  I.amOnPage('datetime.html')
  I.click('#get-value')
  assert.strictEqual(await I.grabValueFrom('#value'), '{"time":"12:00","date":"' + today() + '","datetime-local":"' + today() + 'T00:00' + '"}')
})

Scenario('time should be limited to min and max attributes @datetime', async (I) => {
  I.executeScript(() => {
    const time = document.querySelector('[data-schemapath="root.time"] input')
    time.stepUp(1000000)
    time.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.strictEqual(await I.grabValueFrom('#value'), '{"time":"13:00","date":"' + today() + '","datetime-local":"' + today() + 'T00:00' + '"}')

  I.executeScript(() => {
    const time = document.querySelector('[data-schemapath="root.time"] input')
    time.stepDown(2000000)
    time.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.strictEqual(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today() + '","datetime-local":"' + today() + 'T00:00' + '"}')
  I.wait(1)
})

Scenario('date should be limited to min and max attributes @datetime', async (I) => {
  I.executeScript(() => {
    const datetime = document.querySelector('[data-schemapath="root.date"] input')
    datetime.stepUp(100)
    datetime.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.strictEqual(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today(2) + '","datetime-local":"' + today() + 'T00:00' + '"}')

  I.executeScript(() => {
    const datetime = document.querySelector('[data-schemapath="root.date"] input')
    datetime.stepDown(100)
    datetime.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.strictEqual(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today(-2) + '","datetime-local":"' + today() + 'T00:00' + '"}')
  I.wait(1)
})

Scenario('datetime-local should be limited to min and max attributes @datetime', async (I) => {
  I.executeScript(() => {
    const datetimelocal = document.querySelector('[data-schemapath="root.datetime-local"] input')
    datetimelocal.stepUp(1000000)
    datetimelocal.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.strictEqual(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today(-2) + '","datetime-local":"' + today(2) + 'T00:00' + '"}')

  I.executeScript(() => {
    const datetimelocal = document.querySelector('[data-schemapath="root.datetime-local"] input')
    datetimelocal.stepDown(1000000)
    datetimelocal.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.strictEqual(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today(-2) + '","datetime-local":"' + today(-2) + 'T00:00' + '"}')
  I.wait(1)
})
