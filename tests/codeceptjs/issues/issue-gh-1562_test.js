/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1562 should remain fixed @issue-1562', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1562.html')
  I.waitForElement('.je-ready')
  I.click('#editor-container > div > div.card.card-body.mb-3.bg-light > div > div > div > div > div.card.card-body.mb-3.bg-light > div > div > div:nth-child(2) > div > span.btn-group.je-object__controls > button.btn.btn-secondary.btn-sm.json-editor-btn-edit_properties.json-editor-btntype-properties')
  I.fillField('[id="root.model.entities-property-selector"]', 'test')
  I.click('#editor-container > div > div.card.card-body.mb-3.bg-light > div > div > div > div > div.card.card-body.mb-3.bg-light > div > div > div:nth-child(2) > div > span.btn-group.je-object__controls > div:nth-child(2) > button')
  I.waitForText('Expand')
})