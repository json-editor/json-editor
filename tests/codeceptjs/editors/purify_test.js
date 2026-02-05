/* global Feature Scenario */

Feature('purify')

Scenario('Should @purify XSS from direct input', async ({ I }) => {
  I.amOnPage('purify.html')
  I.waitForElement('[name="root[string]"]')
  I.fillField('[name="root[string]"]', 'bla</script><script>alert(1)</script>')
  I.click('.get-value')
  I.waitForValue('#value', '{"string":"bla"}')
})

Scenario('Should @purify XSS from setValue() via textarea', async ({ I }) => {
  I.amOnPage('purify.html')
  I.waitForElement('#value')
  I.fillField('#value', 'bla</script><script>alert(1)</script>')
  I.click('.set-value')
  I.wait(1)
  I.click('.get-value')
  I.waitForValue('#value', '{"string":"bla"}')
})
