/* global Feature Scenario */

// Note: validation.html has its own way of testing; this test simply tests if the output of that test conforms to the expected output

const { DEFAULT_WAIT_TIME } = require('../test-config')

Feature('Validations')

Scenario('test validations in validation.html', ({ I }) => {
  I.amOnPage('validation.html')
  const numberOfTestItemsExpected = 158
  I.waitForElement('#output div:nth-child(' + numberOfTestItemsExpected + ')', DEFAULT_WAIT_TIME)
  I.seeNumberOfElements('#output div', numberOfTestItemsExpected)
  I.see('success')
  I.dontSee('fail')
})
