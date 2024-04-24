/* global Feature Scenario */

Feature('multiselect')

Scenario('should be disabled if "readonly" is specified @readOnly', async ({ I }) => {
  I.amOnPage('read-only.html')
  I.seeDisabledAttribute('[name="root[multiselect]"]')
})
