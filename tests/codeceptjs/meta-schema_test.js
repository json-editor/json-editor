/* global Feature Scenario */
const { DEFAULT_WAIT_TIME } = require('./test-config')

Feature('core')

// https://github.com/json-editor/json-editor/issues/823
Scenario('work with json-schema meta-schema @meta-schema', async (I) => {
  I.amOnPage('issues/issue-gh-823-meta-schema.html')
  I.waitForElement('[data-schemapath="root"] h3', DEFAULT_WAIT_TIME)
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
Scenario('passing meta-schema example @meta-schema', async (I) => {
  I.amOnPage('issues/issue-gh-1233-passing.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.waitForElement('[name="root[name]"]', DEFAULT_WAIT_TIME)
})

// https://github.com/json-editor/json-editor/issues/1233
Scenario('failing meta-schema example  @meta-schema @optional', async (I) => {
  I.amOnPage('issues/issue-gh-1233-failing.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.waitForElement('[name="root[name]"]', DEFAULT_WAIT_TIME)
})
