/* global Feature Scenario */

Feature('GitHub issue 1364')

Scenario('GitHub issue 1364 should remain fixed @issue-1364', ({ I }) => {
  I.amOnPage('issues/issue-gh-1364.html')
  I.waitForElement('.je-ready')
  I.waitForValue('#value', '{"engine":"test1","child1":{"L2Name":"aaa"},"L1Name":"bbb"}')
  I.selectOption('[id="root[engine]"]', 'none')
  I.waitForValue('#value', '{"engine":"none","child1":{}}')
})
