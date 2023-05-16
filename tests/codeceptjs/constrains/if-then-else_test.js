/* global Feature Scenario */

Feature('if-then-else')

Scenario('validate agaist if-then-else @if-then-else', async ({ I }) => {
  I.amOnPage('if-then-else.html')
  I.waitForElement('.je-ready')

  I.selectOption('[name="root[country]"]', 'America')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [0-9]{5}(-[0-9]{4})?.')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [A-Z][0-9][A-Z] [0-9][A-Z][0-9].')

  I.selectOption('[name="root[country]"]', 'America')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')
})

Scenario('validate agaist if-then @if-then-else', async ({ I }) => {
  I.amOnPage('if-then.html')
  I.waitForElement('.je-ready')

  I.selectOption('[name="root[country]"]', 'America')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [0-9]{5}(-[0-9]{4})?.')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'America')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')
})

Scenario('validate agaist if-else @if-then-else', async ({ I }) => {
  I.amOnPage('if-else.html')
  I.waitForElement('.je-ready')

  I.selectOption('[name="root[country]"]', 'America')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.waitForElement('.invalid-feedback')
  I.waitForText('Value must match the pattern [A-Z][0-9][A-Z] [0-9][A-Z][0-9].')

  I.selectOption('[name="root[country]"]', 'America')
  I.fillField('[name="root[postal_code]"]', '10000')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')

  I.selectOption('[name="root[country]"]', 'Canada')
  I.fillField('[name="root[postal_code]"]', 'K1M 1M4')
  I.pressKey('Tab')
  I.dontSee('.invalid-feedback')
})
