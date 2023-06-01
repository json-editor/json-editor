/* global Feature Scenario */

Feature('dependentRequired')

Scenario('@dependentRequired should display validation errors', ({ I }) => {
  I.amOnPage('dependentRequired.html')
  I.waitForElement('.je-ready')
  I.waitForValue('#textarea-value', '{"name":""}')

  I.click('[data-schemapath="root.credit_card"] .json-editor-opt-in')
  I.waitForValue('#textarea-value', '{"name":"","credit_card":0,"billing_address_1":"","billing_address_2":""}')
  I.waitForText('Must have the required properties: billing_address_3')

  I.click('[data-schemapath="root.billing_address_1"] .json-editor-opt-in')
  I.waitForValue('#textarea-value', '{"name":"","credit_card":0,"billing_address_1":"","billing_address_2":""}')
  I.waitForText('Must have the required properties: billing_address_3')

  I.click('[data-schemapath="root.billing_address_2"] .json-editor-opt-in')
  I.waitForValue('#textarea-value', '{"name":"","credit_card":0,"billing_address_1":"","billing_address_2":""}')
  I.waitForText('Must have the required properties: billing_address_3')

  I.click('[data-schemapath="root.credit_card"] .json-editor-opt-in')
  I.waitForValue('#textarea-value', '{"name":"","billing_address_1":"","billing_address_2":""}')
  I.waitForText('Must have the required properties: billing_address_3')

  I.click('[data-schemapath="root.billing_address_1"] .json-editor-opt-in')
  I.waitForValue('#textarea-value', '{"name":"","billing_address_2":""}')
  I.waitForText('Must have the required properties: billing_address_3')

  I.click('[data-schemapath="root.billing_address_2"] .json-editor-opt-in')
  I.waitForValue('#textarea-value', '{"name":""}')
  I.dontSee('Must have the required properties: billing_address_3')
})
