/* global Feature Scenario */

// Note: validation.html has its own way of testing; this test simply tests if the output of that test conforms to the expected output

Feature('Validations')

Scenario('test validations in validation.html', (I) => {
  I.amOnPage('validation.html')
  var numberOfTestItemsExpected = 158
  I.waitForElement('#output div:nth-child(' + numberOfTestItemsExpected + ')', 10)
  I.seeNumberOfElements('#output div', numberOfTestItemsExpected)
  I.see('success')
  I.dontSee('fail')
})
