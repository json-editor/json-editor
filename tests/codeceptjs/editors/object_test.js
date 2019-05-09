var assert = require('assert');
var value = '';

Feature('object');

Scenario('should respect property orders', async (I) => {
  I.amOnPage('object.html');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(1) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.age');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(2) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.name');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(3) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.single');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(4) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.values');
  value = await I.grabAttributeFrom('[data-schemapath^="root"] .row:nth-of-type(5) [data-schemapath^="root."]', 'data-schemapath');
  assert.equal(value, 'root.zodiac');
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

  // the optional properties controls of a disabled object must be disabled too

  value = await I.grabAttributeFrom('[data-schemapath="root.object.number"] .json-editor-opt-in', 'disabled');
  assert.equal(value, 'true');
  value = await I.grabAttributeFrom('[data-schemapath="root.object.boolean"] .json-editor-opt-in', 'disabled');
  assert.equal(value, 'true');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"number":0,"boolean":false}');

  // opt-in string property

  I.click('[data-schemapath="root.string"] .json-editor-opt-in');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"string":"","number":0,"boolean":false}');

  // opt-in array property

  I.click('[data-schemapath="root.array"] .json-editor-opt-in');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"string":"","number":0,"boolean":false,"array":[]}');

  // opt-in object property

  I.click('[data-schemapath="root.object"] .json-editor-opt-in');
  I.click('.get-value');
  value = await I.grabValueFrom('.value');
  assert.equal(value, '{"string":"","number":0,"boolean":false,"array":[],"object":{"string":"","array":[]}}');

  // the optional properties controls of an active object must not be disabled

  value = await I.grabAttributeFrom('[data-schemapath="root.object.number"] .json-editor-opt-in', 'disabled');
  assert.equal(value, false);
  value = await I.grabAttributeFrom('[data-schemapath="root.object.boolean"] .json-editor-opt-in', 'disabled');
  assert.equal(value, false);
});
