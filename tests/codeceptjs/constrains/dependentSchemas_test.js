/* global Feature Scenario */

Feature('dependentSchemas')

Scenario('@dependentSchemas should display validation errors', ({ I }) => {
  I.amOnPage('dependentSchemas.html')
  I.waitForElement('.je-ready')
  I.dontSee('Object is missing the required property \'billing_address\'')
  I.click('[data-schemapath="root.credit_card"] .json-editor-opt-in')
  I.waitForText('Object is missing the required property \'billing_address\'')
  I.click('[data-schemapath="root.billing_address"] .json-editor-opt-in')
  I.waitForInvisible('.alert-danger')
  I.dontSee('Object is missing the required property \'billing_address\'')
  I.click('[data-schemapath="root.credit_card"] .json-editor-opt-in')
  I.dontSee('Object is missing the required property \'billing_address\'')
})
