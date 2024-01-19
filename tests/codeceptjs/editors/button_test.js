/* global Feature Scenario */

const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('button')

Scenario('should work with button editor callbacks', async ({ I }) => {
  I.amOnPage('button-callbacks.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.seeElement('[data-schemapath="root.button1"] button')
  I.click('[data-schemapath="root.button1"] button')
  I.waitForValue('.value', 'button1CB')
})

Scenario('should work with option "validated" @validated', async ({ I }) => {
  I.amOnPage('button-callbacks.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.seeElement('[data-schemapath="root.button1"] button')
  I.retry({ retries: 3, minTimeout: 500 }).seeDisabledAttribute('[data-schemapath="root.button2"] button')
  await I.fillField('[name="root[textinput]"]', 'Hello World')
  I.pressKey('Tab')
  I.dontSeeDisabledAttribute('[data-schemapath="root.button2"] button')
  I.click('[data-schemapath="root.button2"] button')
  I.waitForValue('.value', 'button2CB')
})

Scenario('should not leave any footprints in result', async ({ I }) => {
  I.amOnPage('button-callbacks.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.click('.get-value')
  I.waitForValue('.value', JSON.stringify({ textinput: '' }))
})

Scenario('should be disabled if "readonly" is specified @readOnly', async ({ I }) => {
  I.amOnPage('read-only.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.seeDisabledAttribute('[data-schemapath="root.button"] button')
})

Scenario('should set icon @button @button-icon', async ({ I }) => {
  I.amOnPage('button-icons.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.waitForElement('i.fas.fa-search', DEFAULT_WAIT_TIME)
})

Scenario('should be disable if we disable parent @button-disable', async ({ I }) => {
  I.amOnPage('disable-button-in-object-editors.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.seeDisabledAttribute('[data-schemapath="root.some_button"] button')
})
