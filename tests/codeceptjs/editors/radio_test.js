/* global Feature Scenario */

Feature('radio')

Scenario('should be disabled if "readonly" is specified', async (I) => {
  I.amOnPage('read-only.html')

  I.seeDisabledAttribute('[id="root[radio][0]"]')
  I.seeDisabledAttribute('[id="root[radio][1]"]')
})
