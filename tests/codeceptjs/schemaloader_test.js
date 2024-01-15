/* global Feature Scenario */

const { DEFAULT_WAIT_TIME } = require('./test-config')

Feature('schemaloader')

Scenario('resolving nested external URNs', async ({ I }) => {
  I.amOnPage('urn.html')
  I.waitForElement('[data-schemapath="root"] span', DEFAULT_WAIT_TIME)
  I.seeElementInDOM('[data-schemapath="root.fname"]')
  I.seeElementInDOM('[data-schemapath="root.lname"]')
  I.click('.get-value')
  I.waitForValue('.value', '{"fname":"John","lname":"Doe"}')
})
