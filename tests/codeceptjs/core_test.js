/* global Feature Scenario */

var assert = require('assert')

Feature('core')

Scenario('should Disable and enable entire form', async ({ I }) => {
  I.amOnPage('core.html')
  I.seeElement('[data-schemapath="root.name"] input')
  I.seeElement('[data-schemapath="root.age"] input')
  I.click('disable')
  I.seeElement('[data-schemapath="root.age"] input:disabled')
  I.seeElement('[data-schemapath="root.name"] input:disabled')
  I.click('enable')
  I.seeElement('[data-schemapath="root.age"] input:not(:disabled)')
  I.seeElement('[data-schemapath="root.name"] input:not(:disabled)')
})

Scenario('should Disable and enable part of the form', async ({ I }) => {
  I.amOnPage('core.html')
  I.seeElement('[data-schemapath="root.name"] input')
  I.seeElement('[data-schemapath="root.age"] input')
  I.click('disable part')
  I.seeElement('[data-schemapath="root.name"] input:disabled')
  I.click('enable part')
  I.seeElement('[data-schemapath="root.name"] input:not(:disabled)')
})

Scenario('should destroy', async ({ I }) => {
  I.amOnPage('core.html')
  I.seeElement('[data-schemapath="root"]')
  I.click('destroy')
  I.dontSeeElement('[data-schemapath="root"]')
})

Scenario('should set and get form value', async ({ I }) => {
  I.amOnPage('core.html')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"age":18,"name":"Francesco Avizzano"}')
  I.click('.set-value')
  I.click('.get-value')
  assert.equal(await I.grabValueFrom('.value'), '{"age":40,"name":"John Smith"}')
})

Scenario('should set and get individual values', async ({ I }) => {
  I.amOnPage('core.html')
  I.click('.get-individual-value')
  assert.equal(await I.grabValueFrom('.value'), '"Francesco Avizzano"')
  I.click('.set-individual-value')
  assert.equal(await I.grabValueFrom('.value'), '"john kaminski"')
})

Scenario('should watch a specific field for changes', async ({ I }) => {
  I.amOnPage('core.html')
  I.dontSeeElement('.name-changed')
  I.click('.set-individual-value')
  I.seeElement('.name-changed')
})

Scenario('should watch form for changes @optional', async ({ I }) => {
  I.amOnPage('core.html')
  I.dontSeeElement('.form-changed')
  I.click('.set-value')
  I.seeElement('.form-changed')
})

Scenario('should change the form if form_name_root option is set @core', async ({ I }) => {
  I.amOnPage('form-name.html')
  I.see('Property must be set.', '.invalid-feedback')
  I.seeElement('[data-schemapath="form_1"]')
  I.seeElement('[data-schemapath="form_2"]')
  I.seeElement('[name="form_1"]')
  I.seeElement('[name="form_2"]')
  I.seeElement('[id="form_1[0]"]')
  I.seeElement('[id="form_1[1]"]')
  I.seeElement('[id="form_1[2]"]')
  I.seeElement('[id="form_2[0]"]')
  I.seeElement('[id="form_2[1]"]')
  I.seeElement('[id="form_2[2]"]')
  I.seeElement('[for="form_1[0]"]')
  I.seeElement('[for="form_1[1]"]')
  I.seeElement('[for="form_1[2]"]')
  I.seeElement('[for="form_2[0]"]')
  I.seeElement('[for="form_2[1]"]')
  I.seeElement('[for="form_2[2]"]')
  I.click('[for="form_1[0]"]')
  I.click('[for="form_2[1]"]')
  I.dontSee('Property must be set.', '.invalid-feedback')
  I.click('#get-value-form-1')
  assert.equal(await I.grabValueFrom('#value-form-1'), '"yes"')
  I.click('#get-value-form-2')
  assert.equal(await I.grabValueFrom('#value-form-2'), '"no"')
})
