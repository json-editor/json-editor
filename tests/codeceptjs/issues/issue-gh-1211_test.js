/* global Feature Scenario */

Feature('issues')

Scenario('GitHub issue 1211 should remain fixed @issue-1211 @schemaloader', async ({ I }) => {
  I.amOnPage('issues/issue-gh-1211.html')
  I.waitForText('Rule collection')
  I.waitForText('SSID & MAC Groups')
  I.waitForText('Certificate Extensions')
  I.click('Rule')
  I.waitForText('Generic Allow Rule')
  I.click('Group')
  I.waitForText('Group 1')
  I.click('Extension')
  I.waitForText('OID')
  I.waitForValue('#value', '{"rules":[{"type":"any","name":"","description":"","enabled":false}],"groups":[{"type":"ssid-group","ssid-group":[],"name":"","description":""}],"certificate-extensions":[{"name":"","oid":""}],"trustedroots":[],"intuneids":[]}')
})
