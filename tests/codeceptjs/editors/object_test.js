var assert = require('assert');

Feature('object');

Scenario('should respect property orders', async (I) => {
  I.amOnPage('object.html');
  assert.equal(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(1) [data-schemapath^="root."]', 'data-schemapath'), 'root.age');
  assert.equal(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(2) [data-schemapath^="root."]', 'data-schemapath'), 'root.name');
  assert.equal(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(3) [data-schemapath^="root."]', 'data-schemapath'), 'root.single');
  assert.equal(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(4) [data-schemapath^="root."]', 'data-schemapath'), 'root.values');
  assert.equal(await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(5) [data-schemapath^="root."]', 'data-schemapath'), 'root.zodiac');
});

Scenario('should validate required properties', async (I) => {
  I.amOnPage('object.html');
  I.see('Value must be at least 18.');
});

Scenario('should validate also not required properties', async (I) => {
  I.amOnPage('object.html');
  I.see('Value must be at least 3 characters long.');
});

Scenario('grid-strict rows and columns', (I) => {
  I.amOnPage('grid-strict.html');
  I.seeNumberOfVisibleElements('.row', 13);
  I.seeElement('.col-md-1');
  I.seeElement('.col-md-2');
  I.seeElement('.col-md-3');
  I.seeElement('.col-md-4');
  I.seeElement('.col-md-5');
  I.seeElement('.col-md-6');
  I.seeElement('.col-md-7');
  I.seeElement('.col-md-8');
  I.seeElement('.col-md-9');
  I.seeElement('.col-md-10');
  I.seeElement('.col-md-11');
  I.seeElement('.col-md-12');
  I.seeElement('.col-md-offset-1');
  I.seeElement('.col-md-offset-2');
  I.seeElement('.col-md-offset-3');
  I.seeElement('.col-md-offset-4');
  I.seeElement('.col-md-offset-5');
  I.seeElement('.col-md-offset-6');
  I.seeElement('.col-md-offset-7');
  I.seeElement('.col-md-offset-8');
  I.seeElement('.col-md-offset-9');
  I.seeElement('.col-md-offset-10');
  I.seeElement('.col-md-offset-11');
});

Scenario('grid rows and columns', (I) => {
  I.amOnPage('grid.html');
  I.seeNumberOfVisibleElements('.row', 6);
  I.seeNumberOfVisibleElements('.col-md-12', 1);
  I.seeNumberOfVisibleElements('.col-md-6', 3);
  I.seeNumberOfVisibleElements('.col-md-4', 3);
  I.seeNumberOfVisibleElements('.col-md-3', 4);
  I.seeNumberOfVisibleElements('.col-md-2', 6);
  I.seeNumberOfVisibleElements('.col-md-1', 6);
});

Scenario('opt in optional properties', async (I) => {
  I.amOnPage('object-required-properties.html');

  // if an editor type "object" is disabled, also the child editors opt-in controls will be disabled.

  assert.equal(await I.grabAttributeFrom('[data-schemapath="root.object.number"] .json-editor-opt-in', 'disabled'), 'true');
  assert.equal(await I.grabAttributeFrom('[data-schemapath="root.object.boolean"] .json-editor-opt-in', 'disabled'), 'true');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"number":0,"boolean":false}');

  // opt-in string property

  I.click('[data-schemapath="root.string"] .json-editor-opt-in');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"string":"","number":0,"boolean":false}');

  // opt-in array property

  I.click('[data-schemapath="root.array"] .json-editor-opt-in');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"string":"","number":0,"boolean":false,"array":[]}');

  // opt-in object property

  I.click('[data-schemapath="root.object"] .json-editor-opt-in');
  I.click('.get-value');
  assert.equal(await I.grabValueFrom('.value'), '{"string":"","number":0,"boolean":false,"array":[],"object":{"string":"","array":[]}}');

  // if an editor type "object" is enabled, also the child editors opt-in controls will be enabled.

  assert.equal(await I.grabAttributeFrom('[data-schemapath="root.object.number"] .json-editor-opt-in', 'disabled'), false);
  assert.equal(await I.grabAttributeFrom('[data-schemapath="root.object.boolean"] .json-editor-opt-in', 'disabled'), false);
});

Scenario('should hide but not delete additional properties, when no_additional_properties is true @optional', async (I) => {
  I.amOnPage('object-no-additional-properties.html');
  I.seeElement('[data-schemapath="root.name"] input');
  I.dontSeeElement('[data-schemapath="root.age"] input');
  I.click('.get-value');
  let json = await I.grabValueFrom('.value');
  let value = JSON.parse(json);
  assert.equal(value.name, "Jeremy Dorn");
  assert.equal(value.age, 34); // This will currently fail
});
