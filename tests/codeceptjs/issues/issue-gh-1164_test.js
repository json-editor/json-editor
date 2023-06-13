/* global Feature Scenario */

Feature('GitHub issue 1164')

Scenario('GitHub issue 1164 should remain fixed @issue-1164', ({ I }) => {
  I.amOnPage('issues/issue-gh-1164.html')
  I.waitForElement('.je-ready')
  I.waitForInvisible('option[value="undefined"]')
  I.waitForValue('#value', '{"arrayEnumSelect":["one"],"stringEnumRadio":"one","numberEnumRadio":1.1,"integerEnumRadio":1}')
})
