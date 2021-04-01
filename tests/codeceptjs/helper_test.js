/* global Feature Scenario */

Feature('helpers')

Scenario('It should be able to handle delayed tasks retrying if necessary @wait-alert', (I) => {
  I.amOnPage('wait-alert.html')
  I.waitForElement('#trigger-alert')
  I.click('#trigger-alert')
  I.seeInPopup2('test')
  I.acceptPopup('test')
})
