/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1586 should remain fixed @issue-1586', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1586.html')
  I.waitForElement('.je-ready')
  I.click({ xpath: '//button[contains(@class, "json-editor-btn-add") and .//span[contains(text(), "Add item")]]' })
  I.checkOption('[id="root[0][type]-opt-in"]')
  I.checkOption('[id="root[0][subtype][type]-opt-in"]')
  I.click('.json-editor-btn-delete')
  I.click({ xpath: '//button[contains(@class, "json-editor-btn-add") and .//span[contains(text(), "Add item")]]' })
  I.seeDisabledAttribute('[id="root[0][type]"]')
  I.seeDisabledAttribute('[id="root[0][subtype][type]"]')
})
