var assert = require('assert');
var value = '';

Feature('core');

Scenario('should Disable and enable entire form', async (I) => {
  I.amOnPage('core.html');
  I.seeElement('[data-schemapath="root.name"] input');
  I.seeElement('[data-schemapath="root.age"] input');
  I.click('disable');
  I.seeElement('[data-schemapath="root.age"] input:disabled');
  I.seeElement('[data-schemapath="root.name"] input:disabled');
  I.click('enable');
  I.seeElement('[data-schemapath="root.age"] input:not(:disabled)');
  I.seeElement('[data-schemapath="root.name"] input:not(:disabled)');
});

Scenario('should Disable and enable part of the form', async (I) => {
  I.amOnPage('core.html');
  I.seeElement('[data-schemapath="root.name"] input');
  I.seeElement('[data-schemapath="root.age"] input');
  I.click('disable part');
  I.seeElement('[data-schemapath="root.name"] input:disabled');
  I.click('enable part');
  I.seeElement('[data-schemapath="root.name"] input:not(:disabled)');
});

Scenario('should destroy', async (I) => {
  I.amOnPage('core.html');
  I.seeElement('[data-schemapath="root"]');
  I.click('destroy');
  I.dontSeeElement('[data-schemapath="root"]');
});

Scenario('should set and get form value', async (I) => {
  I.amOnPage('core.html');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"age":18,"name":"Francesco Avizzano"}');
  I.click('.set-value');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"age":40,"name":"John Smith"}');
});

Scenario('should set and get individual values', async (I) => {
  I.amOnPage('core.html');
  I.click('.get-individual-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '"Francesco Avizzano"');
  I.click('.set-individual-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '"john kaminski"');
});

Scenario('should watch a specific field for changes', async (I) => {
  I.amOnPage('core.html');
  I.dontSeeElement('.name-changed');
  I.click('.set-individual-value');
  I.seeElement('.name-changed');
});

Scenario('should watch form for changes @optional', async (I) => {
  I.amOnPage('core.html');
  I.dontSeeElement('.form-changed');
  I.click('.set-value');
  I.seeElement('.form-changed');
});
