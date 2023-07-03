/* global Feature Scenario */

Feature('if-then-else')

Scenario('validate agaist allOf of if schemas @if-then-else', async ({ I }) => {
  I.amOnPage('if-then-else-allOf.html')
  I.waitForElement('.je-ready')

  I.selectOption('[name="root[country]"]', 'United States of America')
  I.waitForText('Value must match the pattern [0-9]{5}(-[0-9]{4})?.')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForText('Value must match the pattern [A-Z][0-9][A-Z] [0-9][A-Z][0-9].')

  I.selectOption('[name="root[country]"]', 'Netherlands')
  I.waitForText('Value must match the pattern [0-9]{4} [A-Z]{2}.')

  I.fillField('#value', JSON.stringify({
    street_address: '1600 Pennsylvania Avenue NW',
    country: 'United States of America',
    postal_code: '20500'
  }))
  I.click('#set-value')
  I.dontSee('.invalid-feedback')

  I.fillField('#value', JSON.stringify({
    street_address: '1600 Pennsylvania Avenue NW',
    postal_code: '20500'
  }))
  I.click('#set-value')
  I.dontSee('.invalid-feedback')

  I.fillField('#value', JSON.stringify({
    street_address: '24 Sussex Drive',
    country: 'Canada',
    postal_code: 'K1M 1M4'
  }))
  I.click('#set-value')
  I.dontSee('.invalid-feedback')

  I.fillField('#value', JSON.stringify({
    street_address: 'Adriaan Goekooplaan',
    country: 'Netherlands',
    postal_code: '2517 JX'
  }))
  I.click('#set-value')
  I.dontSee('.invalid-feedback')

  I.fillField('#value', JSON.stringify({
    street_address: '24 Sussex Drive',
    country: 'Canada',
    postal_code: '10000'
  }))
  I.click('#set-value')
  I.waitForText('Value must match the pattern [A-Z][0-9][A-Z] [0-9][A-Z][0-9].')
  I.waitForElement('.invalid-feedback')

  I.fillField('#value', JSON.stringify({
    street_address: '1600 Pennsylvania Avenue NW',
    postal_code: 'K1M 1M4'
  }))
  I.click('#set-value')
  I.waitForElement('.invalid-feedback')
})

Scenario('validate agaist if-then-else @if-then-else', async ({ I }) => {
  I.amOnPage('if-then-else.html')
  I.waitForElement('.je-ready')

  I.selectOption('[name="root[country]"]', 'America')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [0-9]{5}(-[0-9]{4})?.')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [A-Z][0-9][A-Z] [0-9][A-Z][0-9].')

  I.selectOption('[name="root[country]"]', 'America')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')
})

Scenario('validate agaist if-then @if-then-else', async ({ I }) => {
  I.amOnPage('if-then.html')
  I.waitForElement('.je-ready')

  I.selectOption('[name="root[country]"]', 'America')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [0-9]{5}(-[0-9]{4})?.')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'America')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')
})

Scenario('validate agaist if-else @if-then-else', async ({ I }) => {
  I.amOnPage('if-else.html')
  I.waitForElement('.je-ready')

  I.selectOption('[name="root[country]"]', 'America')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [A-Z][0-9][A-Z] [0-9][A-Z][0-9].')

  I.selectOption('[name="root[country]"]', 'America')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')
})

Scenario('validate agaist if-then-else when disabled fields are present in fields @if-then-else', async ({ I }) => {
  I.amOnPage('if-then-else-disable-fields.html')
  I.waitForElement('.je-ready')

  I.selectOption('[name="root[country]"]', 'America')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [0-9]{5}(-[0-9]{4})?.')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [A-Z][0-9][A-Z] [0-9][A-Z][0-9].')

  I.selectOption('[name="root[country]"]', 'America')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.waitForElement('[name="root[postal_code]"]')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')
})
