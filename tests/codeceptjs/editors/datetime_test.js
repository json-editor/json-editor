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
  I.wait(1)
  I.click('#get-value')
  assert.equal(await I.grabValueFrom('#value'), '{"time":"12:00","date":"' + today() + '","datetimelocal":"' + today() + 'T00:00' + '"}')
})

Scenario('time should have max and min attributes @datetime', async (I) => {
  assert.equal(await I.grabAttributeFrom('[name="root[time]"]', 'min'), '11:00')
  assert.equal(await I.grabAttributeFrom('[name="root[time]"]', 'max'), '13:00')
})

Scenario('date should have max and min attributes @datetime', async (I) => {
  assert.equal(await I.grabAttributeFrom('[name="root[date]"]', 'min'), '2020-09-16')
  assert.equal(await I.grabAttributeFrom('[name="root[date]"]', 'max'), '2020-09-20')
})

Scenario('datetimelocal should have max and min attributes @datetime', async (I) => {
  assert.equal(await I.grabAttributeFrom('[name="root[datetimelocal]"]', 'min'), '2020-09-16T00:00')
  assert.equal(await I.grabAttributeFrom('[name="root[datetimelocal]"]', 'max'), '2020-09-20T00:00')
})

Scenario('time should be limited to min and max attributes @optional', async (I) => {
  I.executeScript(() => {
    const time = document.querySelector('[name="root[time]"]')
    time.stepUp(1000000)
    time.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.equal(await I.grabValueFrom('#value'), '{"time":"13:00","date":"' + today() + '","datetimelocal":"' + today() + 'T00:00' + '"}')

  I.executeScript(() => {
    const time = document.querySelector('[name="root[time]"]')
    time.stepDown(2000000)
    time.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.equal(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today() + '","datetimelocal":"' + today() + 'T00:00' + '"}')
})

Scenario('date should be limited to min and max attributes @optional', async (I) => {
  I.executeScript(() => {
    const datetime = document.querySelector('[name="root[date]"]')
    datetime.stepUp(100)
    datetime.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.equal(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today(2) + '","datetimelocal":"' + today() + 'T00:00' + '"}')

  I.executeScript(() => {
    const datetime = document.querySelector('[name="root[date]"]')
    datetime.stepDown(100)
    datetime.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.equal(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today(-2) + '","datetimelocal":"' + today() + 'T00:00' + '"}')
})

Scenario('datetimelocal should be limited to min and max attributes @optional', async (I) => {
  I.executeScript(() => {
    const datetimelocal = document.querySelector('[name="root[datetimelocal]"]')
    datetimelocal.stepUp(1000000)
    datetimelocal.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.equal(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today(-2) + '","datetimelocal":"' + today(2) + 'T00:00' + '"}')

  I.executeScript(() => {
    const datetimelocal = document.querySelector('[name="root[datetimelocal]"]')
    datetimelocal.stepDown(1000000)
    datetimelocal.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  })
  I.click('#get-value')
  assert.equal(await I.grabValueFrom('#value'), '{"time":"11:00","date":"' + today(-2) + '","datetimelocal":"' + today(-2) + 'T00:00' + '"}')
})
