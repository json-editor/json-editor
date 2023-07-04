/* global Feature Scenario */
const assert = require('assert')

Feature('GitHub issue 1367')

Scenario('GitHub issue 1367 should remain fixed @issue-1367', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1367.html')
  I.waitForElement('.je-ready')
  I.click('canvas')
  assert.match(await I.grabValueFrom('#value'), /base64/)
})
