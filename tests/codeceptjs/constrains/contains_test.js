/* global Feature Scenario */

Feature('contains')

Scenario('should display contains validation errors @contains', ({ I }) => {
  I.amOnPage('contains.html')
  I.waitForElement('.je-ready')
  I.waitForText('No items match contains')
  I.click('.json-editor-btn-add')
  I.waitForInvisible('.alert-danger')
  I.dontSee('No items match contains')
})

Scenario('should display @minContains validation errors @contains', ({ I }) => {
  I.amOnPage('minContains.html')
  I.waitForElement('.je-ready')
  I.waitForText('Contains match count 0 is less than minimum contains count of 2')
  I.click('.json-editor-btn-add')
  I.waitForText('Contains match count 1 is less than minimum contains count of 2')
  I.click('.json-editor-btn-add')
  I.waitForInvisible('.alert-danger')
  I.dontSee('No items match contains')
  I.dontSee('minimum contains count of 2')
})

Scenario('should display @maxContains validation errors @contains', ({ I }) => {
  I.amOnPage('maxContains.html')
  I.waitForElement('.je-ready')
  I.waitForText('No items match contains')
  I.click('.json-editor-btn-add')
  I.waitForInvisible('.alert-danger')
  I.dontSee('No items match contains')
  I.click('.json-editor-btn-add')
  I.dontSee('No items match contains')
  I.click('.json-editor-btn-add')
  I.waitForText('Contains match count 3 exceeds maximum contains count of 2')
})
