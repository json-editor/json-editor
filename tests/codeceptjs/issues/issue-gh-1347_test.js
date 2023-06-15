/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1347 should remain fixed @issue-1347', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1347.html')
  I.waitForValue('#value', '{"caplzsone":[{"dateField1":"","amountField1":"","amountField2":"","amountField3":"","amountField4":""}],"caplzszero":[{"dateField1":"","amountField1":"9999","amountField2":"2222","amountField3":"3333","amountField4":"4444"},{"dateField1":"","amountField1":"6666","amountField2":"7777","amountField3":"8888","amountField4":"9999"}]}')
})
