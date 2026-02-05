/* global Feature Scenario */

Feature('purify')

Scenario('Should @purify XSS from direct input', async ({ I }) => {
  I.amOnPage('purify.html')
  I.fillField('[name="root[string]"]', 'bla</script><script>alert(1)</script>')
  I.click('.get-value')
  I.waitForValue('.value', '{"string":"bla"}')
})

Scenario('Should @purify XSS from setValue() via textarea', async ({ I }) => {
  I.amOnPage('purify.html')
  I.fillField('#value', 'bla</script><script>alert(1)</script>')
  I.click('.set-value')
  I.click('.get-value')
  I.waitForValue('.value', '{"string":"bla"}')
})
