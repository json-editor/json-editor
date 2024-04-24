/* global Feature Scenario */

const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('issues')

Scenario('GitHub issue 1461 should remain fixed @issue-1461', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1461.html')
  I.waitForElement('.je-ready', DEFAULT_WAIT_TIME)
  I.waitForElement('.json-editor-btntype-add', DEFAULT_WAIT_TIME)
  I.dontSeeElement('.json-editor-btntype-delete')
  I.dontSeeElement('.json-editor-btntype-deletelast')
  I.dontSeeElement('.json-editor-btntype-deleteall')
})
