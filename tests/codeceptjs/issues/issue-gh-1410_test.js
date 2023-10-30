/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1410 should remain fixed @issue-1410', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1410.html')
  I.waitForElement('.je-ready')
  I.click('[data-schemapath="root.standard"] .json-editor-btn-edit_properties')
  I.waitForInvisible('[data-schemapath="root.standard"] .json-editor-btn-add')
  I.click('[data-schemapath="root.standard"] .json-editor-btn-edit_properties')
  I.click('[data-schemapath="root.extras"] .json-editor-btn-edit_properties')
  I.waitForVisible('[data-schemapath="root.extras"] .json-editor-btn-add')
})
