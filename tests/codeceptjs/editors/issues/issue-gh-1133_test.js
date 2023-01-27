/* global Feature Scenario */

const assert = require('assert')

Feature('GitHub issue 1133')

Scenario('GitHub issue 1133 should remain fixed @issue-1133', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1133.html')
  I.waitForElement('.je-ready')
  assert.equal(await I.grabValueFrom('#value'), '{"SaveDataMask":"DP"}')
})
