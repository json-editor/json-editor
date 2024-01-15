/* global Feature Scenario */

const { DEFAULT_WAIT_TIME } = require('./test-config')

Feature('meta-schema')

Scenario('work with json-schema meta-schema @meta-schema-core', async ({ I }) => {
  I.amOnPage('meta-schema.html')
  I.waitForElement('.je-ready')

  I.selectOption('.je-switcher', 'Object')
  I.waitForValue('#value', '{"properties":{},"title":"","type":"object"}')
  I.click('.json-editor-btn-edit_properties')
  I.waitForText('type', '.property-selector')
  I.waitForText('title', '.property-selector')
  I.waitForText('description', '.property-selector')
  I.waitForText('enum', '.property-selector')
  I.waitForText('properties', '.property-selector')
  I.waitForText('definitions', '.property-selector')
  I.waitForText('id', '.property-selector')
  I.waitForText('$schema', '.property-selector')
  I.waitForText('enumSource', '.property-selector')
  I.waitForText('$ref', '.property-selector')
  I.waitForText('oneOf', '.property-selector')
  I.waitForText('anyOf', '.property-selector')
  I.waitForText('allOf', '.property-selector')
  I.waitForText('not', '.property-selector')
  I.waitForText('propertyOrder', '.property-selector')
  I.waitForText('links', '.property-selector')
  I.waitForText('links', '.property-selector')
  I.waitForText('watch', '.property-selector')
  I.waitForText('headerTemplate', '.property-selector')
  I.waitForText('options', '.property-selector')
  I.waitForText('patternProperties', '.property-selector')
  I.waitForText('additionalProperties', '.property-selector')
  I.waitForText('required', '.property-selector')
  I.waitForText('format', '.property-selector')

  I.selectOption('.je-switcher', 'Array')
  I.waitForValue('#value', '{"items":{"properties":{},"title":"","type":"object"},"title":"","type":"array"}')

  I.selectOption('.je-switcher', 'String')
  I.waitForValue('#value', '{"title":"","type":"string"}')

  I.selectOption('.je-switcher', 'Number')
  I.waitForValue('#value', '{"title":"","type":"number"}')

  I.selectOption('.je-switcher', 'Integer')
  I.waitForValue('#value', '{"title":"","type":"integer"}')

  I.selectOption('.je-switcher', 'Boolean')
  I.waitForValue('#value', '{"title":"","type":"boolean"}')

  I.selectOption('.je-switcher', 'Null')
  I.waitForValue('#value', '{"title":"","type":"null"}')
})

// https://github.com/json-editor/json-editor/issues/823
Scenario('work with json-schema meta-schema @meta-schema', async ({ I }) => {
  I.amOnPage('issues/issue-gh-823-meta-schema.html')
  I.waitForElement('[data-schemapath="root"] span', DEFAULT_WAIT_TIME)
  I.click('Object Properties')
  I.click('options')
  I.see('$ref')
  I.see('options')
  I.click('Object Properties')
  I.click('Object Properties')
  I.see('options')
  I.dontSee('Value must validate against exactly one of the provided schemas. It currently validates against 0 of the schemas.')
  I.dontSee('No additional properties allowed, but property title is set')
})

// https://github.com/json-editor/json-editor/issues/1233
Scenario('passing meta-schema example @meta-schema @schemaloader', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1233-passing.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.waitForElement('[name="root[name]"]', DEFAULT_WAIT_TIME)
})

// https://github.com/json-editor/json-editor/issues/1233
Scenario('failing meta-schema example @meta-schema @schemaloader', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1233-failing.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.waitForElement('[name="root[name]"]', DEFAULT_WAIT_TIME)
})
